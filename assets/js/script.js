
// variables needed for the basics

const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const theQuestions = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreResult = document.getElementById('score');
const scoreValue = document.getElementById('score-value');

let shuffledQuestions;
let currentQuestionIndex;
let timer;
let currentScore = 0;

// visible start button and next button
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', clearNextQuestion);

// starting the game

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    currentScore = 0;
    questionContainer.classList.remove('hide');
    renderScore();
    nextQuestion();
}

function updateScore() {
    currentScore++;
    renderScore();
}

function renderScore() {
    scoreValue.innerText = currentScore;
}

function timedOut() {


}

function nextQuestion() {
    resetState();
    if (shuffledQuestions.length > currentQuestionIndex) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        gameTimer();
    } else {

    }
}

function clearNextQuestion() {
    clearInterval(timer);
    currentQuestionIndex++;
    nextQuestion();
}

function showQuestion(question) {
    theQuestions.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
            button.addEventListener('click', () => {
                updateScore();
            });
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearUp(document.body);
    clearTimerDisplay();
    nextButton.classList.add('hide');
}

function selectAnswer(e) {
    const selectedButton = e.target;
    settingStatus(document.body);
    Array.from(answerButtons.children).forEach(button => {
        settingStatus(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Want to play again?';
        startButton.classList.remove('hide');
    }
}

function settingStatus(element, correct) {
    clearUp(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearUp(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function clearTimerDisplay() {
    document.getElementById('timer').innerHTML = '00:00';
}


function gameTimer() {
    let sec = 15;
    timer = setInterval(function () {
        document.getElementById('timer').innerHTML = '00:' + (sec < 10 ? '0' + sec : sec);
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            alert('You ran out of time!');
            timedOut();
            clearNextQuestion();
        }
    }, 18000);
}