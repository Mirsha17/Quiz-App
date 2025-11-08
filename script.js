const quizData = [
  { question: "Which programming language is used for web development?", choices: ["Python", "C++", "JavaScript", "Java"], correct: "JavaScript" },
  { question: "What does CSS stand for?", choices: ["Color Style Sheet", "Cascading Style Sheets", "Coding Style System", "Creative Style Setup"], correct: "Cascading Style Sheets" },
  { question: "What is the purpose of HTML?", choices: ["To design web pages", "To structure web content", "To connect databases", "To store images"], correct: "To structure web content" },
  { question: "Which tag is used to insert an image in HTML?", choices: ["<img>", "<pic>", "<src>", "<photo>"], correct: "<img>" },
  { question: "Which CSS property controls text size?", choices: ["font-size", "text-style", "font-weight", "text-size"], correct: "font-size" },
  { question: "What is the correct syntax for referring to an external script?", choices: ["<script name='xxx.js'>", "<script href='xxx.js'>", "<script src='xxx.js'>", "<script link='xxx.js'>"], correct: "<script src='xxx.js'>" },
  { question: "Which company developed JavaScript?", choices: ["Microsoft", "Netscape", "Google", "Mozilla"], correct: "Netscape" },
  { question: "Inside which HTML element do we put the JavaScript?", choices: ["<js>", "<javascript>", "<script>", "<code>"], correct: "<script>" },
  { question: "Which HTML attribute is used to define inline styles?", choices: ["font", "style", "class", "styles"], correct: "style" },
  { question: "Which keyword is used to declare a variable in JavaScript?", choices: ["int", "let", "define", "varies"], correct: "let" }
];

let current = 0;
let score = 0;
let timer;
let timeLeft = 10;
let answersSummary = [];

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const summaryEl = document.getElementById("summary");
const restartBtn = document.getElementById("restart-btn");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const timerEl = document.getElementById("timer");

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = `⏱️ ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱️ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  const data = quizData[current];
  questionEl.textContent = data.question;
  choicesEl.innerHTML = "";
  progressText.textContent = `Question ${current + 1} / ${quizData.length}`;
  progressFill.style.width = `${((current + 1) / quizData.length) * 100}%`;

  data.choices.forEach(choice => {
    const div = document.createElement("div");
    div.classList.add("choice");
    div.textContent = choice;
    div.onclick = () => selectAnswer(div, data.correct);
    choicesEl.appendChild(div);
  });

  startTimer();
}

function selectAnswer(selectedDiv, correctAnswer) {
  const allChoices = document.querySelectorAll(".choice");
  allChoices.forEach(c => (c.style.pointerEvents = "none"));
  clearInterval(timer);

  if (selectedDiv.textContent === correctAnswer) {
    selectedDiv.classList.add("correct");
    score++;
    answersSummary.push({ q: quizData[current].question, result: "✅ Correct" });
  } else {
    selectedDiv.classList.add("incorrect");
    answersSummary.push({ q: quizData[current].question, result: "❌ Incorrect" });
  }
}

nextBtn.addEventListener("click", () => nextQuestion());

function nextQuestion() {
  clearInterval(timer);
  if (current < quizData.length - 1) {
    current++;
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  summaryEl.innerHTML = answersSummary.map(item => `<p>${item.q} — ${item.result}</p>`).join("");
}

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  answersSummary = [];
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

loadQuestion();
