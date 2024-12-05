// Menyimpan jawaban benar
const correctAnswers = {
  q1: 'A', // Thomas Edison adalah jawaban yang benar untuk soal 1
  q2: 'A', // Paris adalah jawaban yang benar untuk soal 2
};

// Menangani klik tombol "Next"
document.querySelectorAll('.next-btn').forEach(button => {
  button.addEventListener('click', function() {
    const questionId = this.dataset.question;
    const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);

    // Berikan feedback dan validasi jawaban
    if (selectedAnswer) {
      const feedback = document.getElementById(`feedback-${questionId}`);
      if (selectedAnswer.value === correctAnswers[questionId]) {
        feedback.textContent = "Benar!";
        feedback.className = 'feedback correct';
      } else {
        feedback.textContent = `Salah! Jawaban yang benar adalah ${correctAnswers[questionId]}.`;
        feedback.className = 'feedback incorrect';
      }

      // Sembunyikan pertanyaan dan tampilkan pertanyaan berikutnya
      document.getElementById(questionId).style.display = 'none';
      const nextQuestionId = `q${parseInt(questionId.charAt(1)) + 1}`;
      document.getElementById(nextQuestionId).style.display = 'block';

      // Tampilkan tombol Kirim jika semua soal sudah dijawab
      if (nextQuestionId === 'q3') {
        document.getElementById('submit').style.display = 'block';
      }
    } else {
      alert('Pilih jawaban terlebih dahulu!');
    }
  });
});

// Menangani pengiriman form
document.getElementById('quiz-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let score = 0;
  const totalQuestions = 2;

  // Menilai semua soal
  for (const questionId in correctAnswers) {
    const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
    if (selectedAnswer && selectedAnswer.value === correctAnswers[questionId]) {
      score++;
    }
  }

  // Menampilkan hasil1
  const result = document.getElementById('result');
  result.textContent = `Skor Anda: ${score} dari ${totalQuestions}`;
});
