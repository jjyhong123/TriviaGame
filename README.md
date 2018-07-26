# TriviaGame

This is a four-question, Super Mario themed trivia game. For each question, after selecting an answer, the user will be notified whether he is correct and a gif will display for four seconds. He then has the option to play again.

First, a question bank array was initialized with trivia questions. An on-click event listener was set up such that upon clicking the start button, the application would load the first question and begin the timer. The timer would count down from 30 by means of a setInterval() function that would decrement the time variable by one every second. On-click event listeners were also created for the answer choices such that when an answer choice is clicked, a message indicating whether the answer choice was correct would display, depending on the selected answer's value attribute, as well as the gif. After the fourth and last question, the total number of correct, incorrect, and unanswered answers is displayed and the user is given the option of restarting the game. 
