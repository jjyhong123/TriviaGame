// Set up questions
var questionBank = [

    // Question 1
    {
        question: "In Mario Kart, which power-up shrinks all other players?",
        A: {choice: "Lightning bolt", value: true},
        B: {choice: "Bullet bill", value: false},
        C: {choice: "Magic mushrooms", value: false},
        D: {choice: "Star", value: false},
        gif: '<img src="assets/images/mario-kart.gif">'    
    },  

    // Question 2
    {
        question: "Which item confers invincibility?",
        A: {choice: "Fire flower", value: false},
        B: {choice: "Star", value: true},
        C: {choice: "Raccoon leaf", value: false},
        D: {choice: "One-up", value: false},
        gif: '<img src="assets/images/mario-star.gif">'    
    },

    // Question 3
    {
        question: "What is the name of the shelled enemies?",
        A: {choice: "Goomba", value: false},
        B: {choice: "Thwomp", value: false},
        C: {choice: "Koopa", value: true},
        D: {choice: "Boo", value: false},
        gif: '<img src="assets/images/mario-koopa.gif">'        
    },  

    // Question 4
    {
        question: "What is the name of Princess Peach's captor, king of the Koopas?",
        A: {choice: "Howard", value: false},
        B: {choice: "Schrader", value: false},
        C: {choice: "Fraiser", value: false},
        D: {choice: "Bowser", value: true},    
        gif: '<img src="assets/images/mario-red-shells.gif">'    
    } 

];

// Declare global variables
var intervalId;

var time;
var numCorrect;
var numIncorrect;
var numUnanswered;
var i;

// When user clicks on start button, start game
$("#start").on("click", start);

function start() {

    // Hide number of correct, incorrect, and unanswered questions from previous round
    $("#number-correct").hide();
    $("#number-incorrect").hide();
    $("#number-unanswered").hide();

    // Initialize variables
    time = 30;
    numCorrect = 0;
    numIncorrect = 0;
    numUnanswered = 0;
    i = 0;

    // Hide start button
    $("#start").hide();

    // Show elements that were hidden at the end of the previous round
    $("#question").show();
    $("#time-remaining").show();

    // Run decrement function at one-second intervals
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);

    // Load question
    loadQuestion();
};

// Decrement time by one
function decrement () {
    time--;
    $("#time-remaining").text("Time remaining: " + time);
    // If timer falls to zero, display "time's up" message
    if (time === 0) {
        timesUp();
    }
};

// When a user clicks on an answer choice
$(".choice").on("click", function () {
    // Store answer choice selected by user
    var value = $(this).attr("value");

    // If answer choice seleced by user is correct, display "correct" message
    if (value === "true") {
        correct();
    }
    // Otherwise, display "incorrect" message
    else {
        incorrect();
    } 
});

// Run for a correct answer
function correct() {

    // Stop the timer
    clearInterval(intervalId);

    // Display "correct" message
    $("#question").text("Correct!");

    // Hide answer choice buttons
    hideButtons();

    // Display gif
    $("#gif-holder").html(questionBank[i].gif);

    // After brief interval, 
    setTimeout(function () {

        // Clear gif
        $("#gif-holder").text("");
        
        // Update parameters
        numCorrect++;
        i++;
        time = 30;

        // As long as there are questions left to ask,
        if (i < questionBank.length) {
            loadQuestion();
            intervalId = setInterval(decrement, 1000); // Restart the timer

        // Otherwise, end the game
        }
        else {
            endGame();
        }

    }, 4000);

};

// Run for an incorrect answer
function incorrect() {
    
    // Stop the timer
    clearInterval(intervalId);
    
    // Display "incorrect" message
    $("#question").text("Nope!");
    
    // Hide answer choice buttons
    hideButtons();

    // Display gif
    $("#gif-holder").html(questionBank[i].gif);
    
    // After brief interval,
    setTimeout(function () {

        // Clear gif
        $("#gif-holder").text("");  

        // Update parameters
        numIncorrect++;
        i++;
        time = 30;

        // As long as there are questions left to ask,
        if (i < questionBank.length) {
            loadQuestion();
            intervalId = setInterval(decrement, 1000); // Restart the timer
        }

        // Otherwise, end the game
        else {
            endGame();
        }
    }, 4000);
};

// Run if user runs out of time
function timesUp() {

    // Stop the timer
    clearInterval(intervalId);

    // Display "time's up" message
    $("#question").text("Time's up!");

    // Hide answer choices
    hideButtons();

    // Display gif
    $("#gif-holder").html(questionBank[i].gif);

    // After brief interval, 
    setTimeout(function () {
        
        // Clear gif
        $("#gif-holder").text(""); 
        
        // Update parameters
        numUnanswered++;
        i++;
        time = 30;

        // As long as there are questions left to ask,
        if (i < questionBank.length) {
            loadQuestion();
            intervalId = setInterval(decrement, 1000); // Restart the timer
        }

        // Otherwise, end the game
        else {
            endGame();
        }
    }, 4000);
};

function loadQuestion() {

    $("#time-remaining").text("Time remaining: " + time);

    $("#question").text(questionBank[i].question);

    $("#A").text(questionBank[i].A.choice).attr("value",questionBank[i].A.value).show();
    $("#B").text(questionBank[i].B.choice).attr("value",questionBank[i].B.value).show();
    $("#C").text(questionBank[i].C.choice).attr("value",questionBank[i].C.value).show();
    $("#D").text(questionBank[i].D.choice).attr("value",questionBank[i].D.value).show();

};

function endGame() {

    // Display numCorrect, numIncorrect, and numUnanswered
    $("#number-correct").text("Correct: " + numCorrect).show();
    $("#number-incorrect").text("Incorrect: " + numIncorrect).show();
    $("#number-unanswered").text("Unanswered: " + numUnanswered).show();

    $("#question").hide();
    $("#time-remaining").hide();
    hideButtons();

    $("#start").text("Restart?").show();
};

function hideButtons() {
    $("#A").hide();
    $("#B").hide();
    $("#C").hide();
    $("#D").hide();
}