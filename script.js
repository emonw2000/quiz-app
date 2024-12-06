let questionsData = [];

// Fungsi untuk memilih kategori
function selectCategory(category) {
    document.getElementById("categorySelection").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    loadXML(category);
    loadIframe(category);  // Memuat iframe berdasarkan kategori
}

// Fungsi untuk memuat XML berdasarkan kategori
function loadXML(category) {
    const xhr = new XMLHttpRequest();
    const file = category === 'penjas' ? 'questions_penjas.xml' : 'questions_pembel_was_masy.xml';
    xhr.open("GET", file, true); // Memilih file XML berdasarkan kategori
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xmlDoc = xhr.responseXML;
            const questions = xmlDoc.getElementsByTagName("question");
            questionsData = [];
            for (let i = 0; i < questions.length; i++) {
                const questionText = questions[i].getElementsByTagName("text")[0].textContent;
                const options = questions[i].getElementsByTagName("option");
                const correctAnswer = questions[i].getElementsByTagName("correctAnswer")[0].textContent;

                let optionsHTML = "";
                for (let j = 0; j < options.length; j++) {
                    const value = options[j].getAttribute("value");
                    const text = options[j].textContent;
                    optionsHTML += `<label><input type="radio" name="question${i + 1}" value="${value}"> ${text}</label>`;
                }

                questionsData.push({
                    questionText,
                    optionsHTML,
                    correctAnswer
                });
            }
            displayQuestions();
        }
    };
    xhr.send();
}

// Fungsi untuk menampilkan pertanyaan di form
function displayQuestions() {
    const form = document.getElementById("quizForm");
    form.innerHTML = "";
    questionsData.forEach((q, index) => {
        form.innerHTML += `
            <div class="question">
                <p>${index + 1}. ${q.questionText}</p>
                <div class="options">
                    ${q.optionsHTML}
                </div>
            </div>
        `;
    });
}

// Fungsi untuk submit kuis dan menampilkan hasil
function submitQuiz() {
    let score = 0;
    let reviewHTML = "";
    const form = document.getElementById("quizForm");

    questionsData.forEach((q, index) => {
        const selectedAnswer = form.querySelector(`input[name="question${index + 1}"]:checked`);
        if (selectedAnswer) {
            if (selectedAnswer.value === q.correctAnswer) {
                score++;
                reviewHTML += `<p class="correct">Pertanyaan ${index + 1}: Benar! Jawaban Anda: ${selectedAnswer.nextSibling.textContent}</p>`;
            } else {
                reviewHTML += `<p class="incorrect">Pertanyaan ${index + 1}: Salah. Jawaban yang benar adalah: ${q.correctAnswer}</p>`;
            }
        } else {
            reviewHTML += `<p class="incorrect">Pertanyaan ${index + 1}: Anda belum memilih jawaban!</p>`;
        }
    });

    // Menampilkan hasil
    const result = document.getElementById("result");
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.textContent = `Skor Anda: ${score} dari ${questionsData.length} soal.`;
    result.style.display = "block";

    // Menampilkan review hasil
    document.getElementById("review").style.display = "block";
    document.getElementById("review1").innerHTML = reviewHTML;
}

// Fungsi untuk memuat iframe sesuai kategori
function loadIframe(category) {
    const iframeContainer = document.getElementById("iframeContainer");
    iframeContainer.innerHTML = ""; // Reset isi container iframe

    let iframeHTML = "";

    if (category === 'penjas') {
        iframeHTML = `
            <iframe src="https://elearning.ut.ac.id/h5p/embed.php?url=https%3A%2F%2Felearning.ut.ac.id%2Fpluginfile.php%2F53214107%2Fmod_h5pactivity%2Fpackage%2F0%2Ftes-sumatif-590-12333.h5p&amp;component=mod_h5pactivity" 
                    name="h5player" width="1208" height="356"
                    allowfullscreen="allowfullscreen" class="h5p-player w-100 border-0" 
                    style="height: 0px;" id="67523dbe00bdc67523dbe00bde1-h5player">
            </iframe>
        `;
    } else if (category === 'pembel_was_masy') {
        iframeHTML = `
           <iframe src="https://elearning.ut.ac.id/h5p/embed.php?url=https%3A%2F%2Felearning.ut.ac.id%2Fpluginfile.php%2F53252952%2Fmod_h5pactivity%2Fpackage%2F0%2Flatihan-sumatif-14064.h5p&amp;component=mod_h5pactivity" name="h5player" width="1208" height="338"
   allowfullscreen="allowfullscreen" class="h5p-player w-100 border-0"
   style="height: 0px;" id="675243860b5fc675243860b5fd1-h5player">
</iframe>
        `;
    }

    iframeContainer.innerHTML = iframeHTML; // Menampilkan iframe sesuai kategori
}
