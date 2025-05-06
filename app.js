// Declarațiile pentru întrebările și răspunsurile
const questions = [
  "What problem does your product solve?",
  "Who is your target audience?",
  "What is your unique value proposition?",
  "How do you plan to monetize?",
  "What are your goals for the next 12 months?"
];

let answers = [];
let currentQuestion = 0;

// Selectăm elementele din HTML
const questionText = document.getElementById("questionText");
const userAnswer = document.getElementById("userAnswer");
const nextBtn = document.getElementById("nextBtn");
const questionContainer = document.getElementById("questionContainer");
const resultSection = document.getElementById("resultSection");
const resetSection = document.getElementById("resetSection");
const pitchOutput = document.getElementById("pitchOutput");
const exportPdfBtn = document.getElementById("exportPdfBtn");

// Afișăm prima întrebare la încărcarea paginii
showQuestion();

// Funcția care arată întrebarea curentă
function showQuestion() {
  questionText.textContent = questions[currentQuestion];
  userAnswer.value = "";  // Curățăm răspunsul anterior
  userAnswer.focus();
}

// Funcția pentru generarea pitch-ului
function generatePitch() {
  questionContainer.style.display = "none";
  resultSection.style.display = "block";
  resetSection.style.display = "block"; // Afișăm butonul de resetare

  // Construim pitch-ul
  let pitch = questions.map((q, i) => `**${q}**\n${answers[i]}\n`).join("\n");
  pitchOutput.textContent = pitch;

  // Salvăm pitch-ul local (opțional pentru a-l salva în localStorage)
  localStorage.setItem("my_pitch", pitch);
}

// Funcția pentru gestionarea butonului Next
nextBtn.addEventListener("click", () => {
  const answer = userAnswer.value.trim();
  
  if (answer === "") {
    alert("Please provide an answer to the question!");
    return;
  }

  // Salvăm răspunsul curent
  answers.push(answer);
  
  // Dacă sunt mai multe întrebări, trecem la următoarea
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    // Dacă am terminat întrebările, generăm pitch-ul
    generatePitch();
  }
});

// Funcția de resetare
resetBtn.addEventListener("click", () => {
  // Resetăm variabilele
  answers = [];
  currentQuestion = 0;

  // Ascundem secțiunea de rezultate și arătăm întrebările
  resultSection.style.display = "none";
  questionContainer.style.display = "block";
  resetSection.style.display = "none"; // Ascundem butonul de reset

  // Arătăm din nou prima întrebare
  showQuestion();
});

// Funcția pentru exportarea pitch-ului ca PDF
exportPdfBtn.addEventListener("click", () => {
  // Folosim biblioteca jsPDF pentru a crea un PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Adăugăm titlul și pitch-ul în PDF
  doc.setFontSize(16);
  doc.text("Your Pitch", 10, 10);
  doc.setFontSize(12);
  doc.text(pitchOutput.textContent, 10, 20);

  // Exportăm fișierul PDF
  doc.save("pitch.pdf");
});