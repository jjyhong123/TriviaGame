// Set up questions
var questionBank = [

    {
        question: "When was I born?",
        A: {choice: "1999", value: true},
        B: {choice: "2000", value: false},
        C: {choice: "2001", value: false},
        D: {choice: "2002", value: false}    
    },  

    {
        question: "Where was I born?",
        A: {choice: "SJ", value: false},
        B: {choice: "SF", value: true},
        C: {choice: "SD", value: false},
        D: {choice: "SR", value: false}    
    },

    {
        question: "How was I born?",
        A: {choice: "C-section", value: false},
        B: {choice: "Normal", value: false},
        C: {choice: "From an egg", value: true},
        D: {choice: "From ashes", value: false}    
    },  

    {
        question: "Why was I born?",
        A: {choice: "To die for humanity's sins", value: false},
        B: {choice: "To take over the world", value: false},
        C: {choice: "To avenge my past-life family's deaths", value: false},
        D: {choice: "To be useless", value: true}    
    } 

];

// Declare variables
var time;
var intervalId;
var numCorrect;
var numIncorrect;
var numUnanswered;
var i;

// On start button click, run function 
$("#start").on("click", run);

function run() {

    // Initialize variables
    time = 30;
    numCorrect = 0;
    numIncorrect = 0;
    numUnanswered = 0;
    i = 0;

    $("#number-correct").text("");
    $("#number-incorrect").text("");
    $("#number-unanswered").text("");
    $("#gif-holder").text("");    


    // Decrement time by one every second
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);

    updateHTML();
};

// Collect user input
$(".choice").on("click", function () {
    var value = $(this).attr("value");
    // If correct, run correct()
    if (value === "true") {
        correct();
    }
    // Otherwise, run incorrect()
    else {
        incorrect();
    } 
});

function decrement () {
    time--;
    $("#time-remaining").text("Time remaining: " + time);
    if (time === 0) {
        timesUp();
    }
};

function correct() {
    // Stop the countdown
    clearInterval(intervalId);
    // display correct message
    $("#gif-holder").text("Correct");
    // update parameters
    setTimeout(function () {
        $("#gif-holder").text("");  
        numCorrect++;
        i++;
        time = 30;

        // Check if we're out of questions
        if (i < questionBank.length) {
            updateHTML();
            intervalId = setInterval(decrement, 1000);
        }
        else {
            endGame();
        }

    }, 2000);

};

function incorrect() {
    // Stop the countdown
    clearInterval(intervalId);
    // display incorrect message
    $("#gif-holder").text("Incorrect");
    // update parameters
    setTimeout(function () {
        $("#gif-holder").text("");  
        numIncorrect++;
        i++;
        time = 30;

        // Check if we're out of questions
        if (i < questionBank.length) {
            updateHTML();
            intervalId = setInterval(decrement, 1000);
        }
        else {
            endGame();
        }
    }, 2000);
};

function timesUp() {
    // Stop the countdown
    clearInterval(intervalId);
    // display times up message
    $("#gif-holder").text("Time's up");
    // update parameters
    setTimeout(function () {
        $("#gif-holder").text("");  
        numUnanswered++;
        i++;
        time = 30;

        // Check if we're out of questions
        if (i < questionBank.length) {
            updateHTML();
            intervalId = setInterval(decrement, 1000);
        }
        else {
            endGame();
        }
    }, 2000);
};

function updateHTML() {
    $("#question").text(questionBank[i].question);
    $("#A").text(questionBank[i].A.choice).attr("value",questionBank[i].A.value);
    $("#B").text(questionBank[i].B.choice).attr("value",questionBank[i].B.value);
    $("#C").text(questionBank[i].C.choice).attr("value",questionBank[i].C.value);
    $("#D").text(questionBank[i].D.choice).attr("value",questionBank[i].D.value);
    $("#time-remaining").text("Time remaining: " + time);
    $("#start").text("");
};

function endGame() {
    // Display numCorrect, numIncorrect, and numUnanswered
    $("#number-correct").text("Correct: " + numCorrect);
    $("#number-incorrect").text("Incorrect: " + numIncorrect);
    $("#number-unanswered").text("Unanswered: " + numUnanswered);
    $("#gif-holder").text("");    

    $("#question").text("");
    $("#A").text("");
    $("#B").text("");
    $("#C").text("");
    $("#D").text("");
    $("#time-remaining").text("");
    $("#start").text("Restart?");
    
};