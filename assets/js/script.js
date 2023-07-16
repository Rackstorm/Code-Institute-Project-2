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
let currentScore = 0; // Variable to track the current score

// visible start button and next button
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', prepNextQuestion); // Update the event listener

// asking the player to press start game - no questions/answer options will be available until pressing "Start Game"
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    currentScore = 0;
    questionContainer.classList.remove('hide');
    renderScore(); // display the initial score which is 0
    nextQuestion();
    gameTimer(); // starting the timer when the game starts
}



function updateScore() {
    currentScore++; // updating the score continuesly throughout the game
    renderScore(); // displaying the score value
}

// showing the amount of correct clicked answers continuesly throughout the game
function renderScore() {
    scoreValue.innerText = currentScore; // updating the score value
}

// alert and redirecting if/when timer runs out
function handleTimeout() {
    clearInterval(timer);
    alert('You ran out of time!');
    prepNextQuestion();
}

// preparing the next question by  shuffling the questions, keeping track of the currentQuestionIndex and starting the timer for the current question
function nextQuestion() {
    resetState();
    if (shuffledQuestions.length > currentQuestionIndex) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        gameTimer();
    }
}

// clearing up the timer, incrementing the currentQuestionIndex and calls the nextQuestion function in order to provide new questions

function prepNextQuestion() {
    clearInterval(timer); // Clear the interval before moving to the next question
    currentQuestionIndex++;
    nextQuestion();
}

// loading the questions and options into the buttons on the page and calling the score update question

function showQuestion(question) {
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

function resetState() {
    clearUp(document.body);
    clearTimerDisplay();
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// hidden buttons - if the chosen answer is correct the "Next Question" button will be visible and clickable to move on
function selectAnswer(e) {
    const selectedButton = e.target;
    settingStatus(document.body);
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

function settingStatus(element, correct) {
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

// resetting the timer display to "00:00" in the timer button after each answer is clicked
function clearTimerDisplay() {
    document.getElementById('timer').innerHTML = '00:00';
}

// the timer showing 15 seconds counting down - if running out of time the timedOut() function will be called
function gameTimer() {
    let sec = 15;
    timer = setInterval(function () {
        document.getElementById('timer').innerHTML = '00:' + (sec < 10 ? '0' + sec : sec);
        sec--;
        if (sec < 0) {
            handleTimeout();
        }
    }, 1000);
}