// Variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

let score = 0; // Initialize score

// DOM elements
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const questionContainer = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesEl = document.getElementById("choices");
const endScreenEl = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const submitBtn = document.getElementById("submit");
const scoreEl = document.getElementById("score");


// Start the quiz
function startQuiz() {
    let startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionContainer.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timeEl.textContent = time;
    getQuestion();
}

// Display the question
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
        let choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        choiceNode.onclick = answerClick;
        choicesEl.appendChild(choiceNode);
    });
}

// Handle answer click
function answerClick() {
    if (this.value === questions[currentQuestionIndex].answer) {
        score += 5; // Add 5 points for a correct answer
        scoreEl.textContent = score; // Update the displayed score
    } else {
        time -= 10; // Deduct time for an incorrect answer
        if (time < 0) time = 0;
        timeEl.textContent = time;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }
}


// End the quiz
function endQuiz() {
    clearInterval(timerId);
    endScreenEl.removeAttribute("class");
    questionContainer.setAttribute("class", "hide");
    finalScoreEl.textContent = score; // Display the final score
}

// Handle the clock tick
function clockTick() {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

// Event listeners
startBtn.onclick = startQuiz;
submitBtn.onclick = saveHighscore;

