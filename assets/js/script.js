// code being used from other creators have been outlined next to the function

// Variables
const startButton = document.getElementById('start-button'); // Get the start button element
const nextButton = document.getElementById('next-button'); // Get the next button element
const questionContainer = document.getElementById('question-container'); // Get the question container element
const resultsContainer = document.getElementById('results-container'); // Get the results container element
const theQuestions = document.getElementById('question'); // Get the question element
const answerButtons = document.getElementById('answer-buttons'); // Get the answer buttons element
const scoreValue = document.getElementById('score-value'); // Get the score value element
let timer = document.getElementById('timer'); // Get the timer element

const timePerQuestion = 15; // Set the time allowed per question

let shuffledQuestions; // Store shuffled questions
let currentQuestionIndex; // Store the index of the current question
let timeLeft = timePerQuestion; // Store the time left for the current question
let timerInterval; // Store the timer interval

// Hide the question container and results container before clicking the start button
resultsContainer.classList.add('hide');
questionContainer.classList.add('hide');

// Make the start button and next button visible
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', prepNextQuestion); // Update the event listener

// Ask the player to press start game - no questions/answer options will be available until pressing "Start Game". Code used from WebDev Simplified's Javascript tutorial and modified
function startGame() {
    // Hide the start button
    startButton.classList.add('hide');
    // Shuffle the questions and initialize variables
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    // Clear the current score
    currentScore = 0;
    renderScore(); // Update the score display
    timer.classList.remove('hide'); // Show the timer
    score.classList.remove('hide'); // Show the score
    questionContainer.classList.remove('hide');
    resultsContainer.classList.remove('hide');
    nextQuestion();
}

// Update the player's score
function updateScore() {
    currentScore++; // Increment the score
    renderScore(); // Update the score display
}

// Update the score by displaying correct clicked answers
function renderScore() {
    scoreValue.innerText = currentScore;
}

// Alert and redirect if/when timer runs out
function handleTimeout() {
    clearTimer();
    alert('You ran out of time!');
    prepNextQuestion();
}

// Prepare the next question by shuffling the questions and starting the timer. Code used from WebDev Simplified's Javascript tutorial and modified
function nextQuestion() {
    resetState(); // Clear the current state
    if (shuffledQuestions.length > currentQuestionIndex) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        setTimer(); // Start the timer
    }
}

// Clear up the timer, increment the currentQuestionIndex, and provide new questions.  Code used from WebDev Simplified's Javascript tutorial and modified
function prepNextQuestion() {
    clearTimer();
    currentQuestionIndex++;
    nextQuestion();
}

// Load the questions and answer options into the buttons on the page. Code used from WebDev Simplified's Javascript tutorial and modified

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

// Clear up the questions and answers, and activate the clearing timer display function. Code used from WebDev Simplified's Javascript tutorial and modified
function resetState() {
    clearUp(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Hide buttons - if the chosen answer is correct, the "Next Question" button will be visible and clickable to move on. Code used from WebDev Simplified's Javascript tutorial and modified
function selectAnswer(e) {
    clearTimer();
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct) {
            button.disabled = true;
        }
        settingStatus(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        displayEndScore(); // Call displayEndScore() when no more questions are left
        startButton.classList.remove('hide');
    }
}

// Show the right and wrong answers after clicking, Code modified with styling from GreatStack's Javascript quiz tutorial
function settingStatus(element, correct) {
    clearUp(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

// Clear up the button background colors when moving on to the next question
function clearUp(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// Timer function - if the timer runs out, end the game and allow the player to click "Next Question" to move on
function gameTimer() {
    if (timeLeft >= 0) {
        // Format the timer display
        const formattedTime = '00:' + timeLeft.toString().padStart(2, '0');
        document.getElementById('timer').innerText = formattedTime;
        timeLeft--;
    } else {
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
            settingStatus(button, button.dataset.correct);
        });
        document.getElementById('timer').innerText = '00:00';
        clearTimer();
        selectAnswer();
    }
}

// Set the timer interval and time left
function setTimer() {
    timerInterval = setInterval(gameTimer, 1000);
}

// Clear the timer for each question
function clearTimer() {
    clearInterval(timerInterval);
    timeLeft = timePerQuestion;
}

// Display the final score and the option to play again
function displayEndScore() {
    clearUp(document.body);
    questionContainer.classList.add('hide');
    timer.classList.add('hide');
    score.classList.remove('hide');
    scoreValue.innerText = currentScore + ' / ' + questions.length;
    startButton.innerText = 'Want to play again?';
    startButton.classList.remove('hide');
}
