
// variables

const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const theQuestions = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');

const gameTimer = document.getElementById('timer');

let currentScore = 0;
let shuffledQuestions;
let currentQuestionIndex;



// starting the game

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    nextQuestion();
}

// write comment about managing set up of questions and visibility

function nextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    theQuestions.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearUp(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// write comment about answers and button visibility after choosing an answer

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

// confirming whether answer is correct/incorrect and clearing up for the next question

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

// a visible timer - the player has 15 sec for each question

function gameTimer() {
    var sec = 15;
    var timer = setInterval(function () {
        document.getElementById('gameTimer').innerHTML = '00:' + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            alert('You ran out of time!');
            timedOut();
        }
    }, 1000)};
