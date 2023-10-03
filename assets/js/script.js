// code being used from other creators have been outlined next to the function

// variables 
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const theQuestions = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreValue = document.getElementById('score-value');
let timer = document.getElementById('timer');

const timePerQuestion = 15;

let shuffledQuestions;
let currentQuestionIndex;
let timeLeft = timePerQuestion;
let timerInterval;
let currentScore = 0;

// visible start button and next button
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', prepNextQuestion); // Update the event listener

// asking the player to press start game - no questions/answer options will be available until pressing "Start Game"
function startGame() {  //Code used from WebDev Simplified's Javascript tutorial and modified
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    currentScore = 0;
    questionContainer.classList.remove('hide');
    renderScore(); // display the initial score which is 0
    nextQuestion();
}

function updateScore() {
    currentScore++; // updating the score continuesly throughout the game
    renderScore(); // displaying the score value
}

// updating the score by displaying correct clicked answers continuesly throughout the game
function renderScore() {
    scoreValue.innerText = currentScore;
}

// alert and redirecting if/when timer runs out
function handleTimeout() {
    clearTimer();
    alert('You ran out of time!');
    prepNextQuestion();
}

// preparing the next question by  shuffling the questions, keeping track of the currentQuestionIndex and starting the timer for the current question
function nextQuestion() { //Code used from WebDev Simplified's Javascript tutorial and modified
    resetState();
    if (shuffledQuestions.length > currentQuestionIndex) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        setTimer();
    }
}

// clearing up the timer, incrementing the currentQuestionIndex and calls the nextQuestion function in order to provide new questions
function prepNextQuestion() {  //Code used from WebDev Simplified's Javascript tutorial and modified
    clearTimer();
    currentQuestionIndex++;
    nextQuestion();
}

// loading the questions and options into the buttons on the page and calling the score update question

function showQuestion(question) {  //Code used from WebDev Simplified's Javascript tutorial and modified
    theQuestions.innerText = question.question;
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

// clearing up the questions and answers as well as activating the clearing timer display function

function resetState() { //Code used from WebDev Simplified's Javascript tutorial and modified
    clearUp(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// hidden buttons - if the chosen answer is correct the "Next Question" button will be visible and clickable to move on
function selectAnswer(e) { //Code used from WebDev Simplified's Javascript tutorial and modified
    clearTimer();
    // settingStatus(document.body);
    Array.from(answerButtons.children).forEach(button => {
        settingStatus(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Want to play again?'; // ask you to play again at the last question
        startButton.classList.remove('hide');
    }
}

// showing the right and wrong answers after clicking - if correct answer the background will turn green, if incorrect it will turn red

function settingStatus(element, correct) { //Code modified with styling from GreatStack's Javascript quiz tutorial
    clearUp(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

// clearing up the button background colors when moving on to the next question

function clearUp(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function gameTimer() {
    if (timeLeft >= 0) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timer.innerText = formattedTime;
        timeLeft--;
    } else {
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
            settingStatus(button, button.dataset.correct);
        });
        nextButton.classList.remove('hide');
    }
}


function setTimer() {
    timerInterval = setInterval(gameTimer, 1000);
}

function clearTimer() {
    clearInterval(timerInterval);
    timeLeft = timePerQuestion;
}
