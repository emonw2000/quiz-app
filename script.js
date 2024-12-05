
document.getElementById('quiz-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    let score = 0;
    let totalQuestions = 2;
  
    // Menilai soal 1
    const answer1 = document.querySelector('input[name="q1"]:checked');
    if (answer1 && answer1.value === 'A') {
      score++;
    }
  
    // Menilai soal 2
    const answer2 = document.querySelector('input[name="q2"]:checked');
    if (answer2 && answer2.value === 'A') {
      score++;
    }
  
    // Menampilkan hasil
    const result = document.getElementById('result');
    result.textContent = `Skor Anda: ${score} dari ${totalQuestions}`;
  });
  