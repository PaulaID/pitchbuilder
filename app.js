// Dacă există un pitch salvat, îl afișăm automat
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("my_pitch");
  if (saved) {
    questionContainer.style.display = "none";
    document.querySelector("textarea").style.display = "none";
    nextBtn.style.display = "none";
    resultSection.style.display = "block";
    pitchOutput.textContent = saved;
  }
});
const questions = [
    "What problem are you solving?",
    "What is your solution?",
    "Who is your target market?",
    "What is your unique advantage?",
    "How do you plan to make money?",
    "What traction do you have so far?",
    "Who is on your team?",
    "How much funding do you need?",
  ];
  
  let current = 0;
  let answers = [];
  
  const questionContainer = document.getElementById("question-container");
  const answerInput = document.getElementById("answer");
  const nextBtn = document.getElementById("next-btn");
  const resultSection = document.getElementById("result");
  const pitchOutput = document.getElementById("pitch-output");
  
  function showQuestion() {
    if (current < questions.length) {
      questionContainer.textContent = questions[current];
      answerInput.value = "";
    } else {
      function generatePitch() {
        document.querySelector("textarea").style.display = "none";
        nextBtn.style.display = "none";
        questionContainer.style.display = "none";
        resultSection.style.display = "block";
      
        let pitch = questions.map((q, i) => `**${q}**\n${answers[i]}\n`).join("\n");
        pitchOutput.textContent = pitch;
      
        // Salvăm pitch-ul local
        localStorage.setItem("my_pitch", pitch);
      }      
    }
  }
  
  function generatePitch() {
    document.querySelector("textarea").style.display = "none";
    nextBtn.style.display = "none";
    questionContainer.style.display = "none";
    resultSection.style.display = "block";
  
    let pitch = questions.map((q, i) => `**${q}**\n${answers[i]}\n`).join("\n");
    pitchOutput.textContent = pitch;
  }
  
  nextBtn.addEventListener("click", () => {
    const answer = answerInput.value.trim();
    if (answer) {
      answers.push(answer);
      current++;
      showQuestion();
    }
  });
  
  showQuestion();  