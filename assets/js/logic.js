// Variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

let score = 0; // Initialize score to 0

// DOM elements
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start");
const questionContainer = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesEl = document.getElementById("choices");
const endScreenEl = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const scoreEl = document.getElementById("score"); // Element to display the current score

// Function to start the quiz
function startQuiz() {
    let startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide"); // Hide the start screen
    questionContainer.removeAttribute("class"); // Show the questions container
    timerId = setInterval(clockTick, 1000); // Start the timer
    timeEl.textContent = time;
    getQuestion(); // Load the first question
}

// Function to display the current question and choices
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.title; // Display the question title
    choicesEl.innerHTML = ""; // Clear out any old choices
    // Loop through the choices and create buttons for each one
    currentQuestion.choices.forEach(function(choice, i) {
        let choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        choiceNode.onclick = answerClick; // Attach event listener for click
        choicesEl.appendChild(choiceNode);
    });
}

// Function to handle the answer click
function answerClick() {
    // Check if the clicked answer is correct
    if (this.value === questions[currentQuestionIndex].answer) {
        score += 5; // Add 5 points for a correct answer
        scoreEl.textContent = score; // Update the displayed score
    } else {
        time -= 10; // Deduct 10 seconds for an incorrect answer
        if (time < 0) time = 0; // Ensure time doesn't go negative
        timeEl.textContent = time;
    }
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex === questions.length) {
        endQuiz(); // End the quiz if all questions are answered
    } else {
        getQuestion(); // Otherwise, display the next question
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerId); // Stop the timer
    endScreenEl.removeAttribute("class"); // Show the end screen
    questionContainer.setAttribute("class", "hide"); // Hide the questions container
    finalScoreEl.textContent = score; // Display the final score
}

// Function to handle the clock tick
function clockTick() {
    time--; // Decrement the time
    timeEl.textContent = time;
    if (time <= 0) {
        endQuiz(); // End the quiz if time runs out
    }
}

// Event listeners
startBtn.onclick = startQuiz; // Start the quiz when the start button is clicked
submitBtn.onclick = saveHighscore; // Save the highscore when the submit button is clicked
