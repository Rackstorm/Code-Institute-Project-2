// the quiz questions

const questions = [
    {
        question: "What acid is used in higher concentrations to clean concrete, industrial equipment, metal, and water?",
        answers: [
            { text: "Glycolic acid", correct: true },
            { text: "Sodium hydroxide lye", correct: false },
            { text: "White vinegar", correct: false },
            { text: "Soap", correct: false }
        ]
    },
    {
        question: "What is lamb meat called?",
        answers: [
            { text: "Veil", correct: false },
            { text: "Mutton", correct: true },
            { text: "Beef", correct: false },
            { text: "Steak", correct: false }
        ]
    },
    {
        question: "What is Dentophobia?",
        answers: [
            { text: "Fear of birds", correct: false },
            { text: "Fear of dinosaurs", correct: false },
            { text: "Fear of dentists", correct: true },
            { text: "Fear of driving", correct: false }
        ]
    },
    {
        question: "Cynicism Is a word that originated from which language?",
        answers: [
            { text: "Latin", correct: false },
            { text: "Italian", correct: false },
            { text: "Spanish", correct: false },
            { text: "Greek", correct: true }
        ]
    },
    {
        question: "Every minute you shed over how many dead skin cells?",
        answers: [
            { text: "30,000", correct: true },
            { text: "10,000", correct: false },
            { text: "76,000", correct: false },
            { text: "5,000", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentScore = 0;
let score = 0;

function startGame() {
    currentScore = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    thisQuestion();
}

function thisQuestion() {
    resetState();
    let currentQuestion = questions[currentScore];
    let questionNo = currentScore + 1;
    questionElement.innerHTML = questionNo + ", " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

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
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disable = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again!";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentScore++;
    if (currentScore < questions.length) {
        thisQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentScore < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();