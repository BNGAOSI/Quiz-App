const questions = [
  {
    question: "Who is the Chinese great-great grandfather of Jose Rizal?",
    answers: [
      { Text: "Eugenio Ursua", correct: false },
      { Text: "Domingo Lamco", correct: true },
      { Text: "Agustin Chinco", correct: false },
      { Text: "Pedro Casañas", correct: false },
    ],
  },
  {
    question: "The surname Mercadowhen translated to English means?",
    answers: [
      { Text: "Church", correct: false },
      { Text: "Market", correct: true },
      { Text: "Pilgrimage ", correct: false },
      { Text: "Catholic Calendar", correct: false },
    ],
  },
  {
    question:
      "The following are the reasons why Rizal was chosen and declared as the Philippine’s National Hero, EXCEPTone:",
    answers: [
      {
        Text: "He was a martyr at Bagumbayan where he willingly died for our country.",
        correct: false,
      },
      {
        Text: "Because of his complete self-indulgence, his personal interest and to think only of himself.",
        correct: true,
      },
      {
        Text: "He was a towering figure in the propaganda campaign from 1882-1896. ",
        correct: false,
      },
      {
        Text: "He was the first Filipino to unite and awaken the Filipino people to peacefully rise for independence.",
        correct: false,
      },
    ],
  },
  {
    question: "Why did Don Lamco decided to drop the name Lam-co toMercado? ",
    answers: [
      {
        Text: "Because he was an immigrant and a business tycoon",
        correct: false,
      },
      {
        Text: "To prevent conflict and hostility with the Spanish authorities. ",
        correct: true,
      },
      { Text: "To honor Rizal’s endeavor from theSpaniards", correct: false },
      { Text: "Because of Rizal’s extreme intelligence", correct: false },
    ],
  },
  {
    question: "Who is the first mentor of Rizal?",
    answers: [
      { Text: "Maestro Celistino", correct: false },
      { Text: "Doña Teodora", correct: true },
      { Text: "Leon Monroy", correct: false },
      { Text: "Manuel Alberto ", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
