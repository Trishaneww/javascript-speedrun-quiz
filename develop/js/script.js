const questionBank = [
    {
        question: "What is the correct way to write 'Hello World in an alert box",
        options: [
            {option: "alertbox('Hello World')", status: 0},
            {option: "alertBox('Hello World')", status: 0},
            {option: "alert('Hello World')", status: 1},
            {option: "prompt('Hello World')", status: 0}
        ]
    },
    {
        question: "What is the syntax for creating a function in JavaScript",
        options: [
            {option: "function = myFunction()", status: 0},
            {option: "function myFunction()", status: 0},
            {option: "function: myFunction()", status: 0},
            {option: "function--myFunction()", status: 1}
        ]
    },
    {
        question: "What is the syntax for an if statement in JavaScript",
        options: [
            {option: "if (i===9)", status: 0},
            {option: "if = (i===9)", status: 0},
            {option: "if: (i===9)", status: 0},
            {option: "if i===9", status: 1}
        ]
    },
    {
        question: "What is the proper way to call a function in JavaScript?",
        options: [
            {option: "myFunction()", status: 1},
            {option: "call myFunction", status: 0},
            {option: "prompt(myFunction)", status: 0},
            {option: "alert(myFunction)", status: 0}
        ]
    },

]

//Declares all variables used within this file, through selecting their name tags, IDs, or classes
let mainStartScreen = document.querySelector('.container-start');
let viewHighScoresBtn = document.querySelector('.view-high-scores');
let quizOpen = document.querySelector('.container-quiz');
let highScoreScreen = document.querySelector('.container-high-score');
let changeQuestionNum = document.querySelector('#question-num');
let questionPrompt = document.querySelector('#question');
let answerButtons = document.querySelectorAll('.answer');
let answerAlert = document.querySelector('#alert');
let timerEl = document.getElementById('timer');
let removeTimePlaceHold = document.getElementById('remove-time');
let startQuiz = document.createElement('h2');
let quizRules = document.createElement('p');
let startQuizBtn = document.createElement('button');
startQuizBtn.classList.add('.btn-start'); // adds a class to the quiz start button
let cutDisplay = document.querySelector('.anchor');

let renderCount = 0 // If the storage is already rendered once 
let timeStart = 45; // Starts timer at 60 seconds

let sortedDictionary;  // Randomizes the questions in the questionDictionary object.
let sortedDictionaryIndex = 0; // Lets me index the next question

// Keeps track of the score for the user and displays it while he is doing the quiz
let scoreCount = 0; 
let updateScore = document.querySelector('.score-count')
updateScore.textContent = scoreCount; 


let highScoresList = [ ]; // sets a null object to store highScores

// The purpose of this function is to show and populate the main screen as well as hide any other screens behind it.
let mainScreen = function () {
    // hides the high score screen and shows the start menu
    mainStartScreen.style.display = 'flex';
    highScoreScreen.style.display = 'none';
    
    // populates the main screen with text
    startQuiz.textContent = "Speedrun JavaScript Quiz";
    quizRules.textContent = "You have 45 seconds to answer all questions. Answering wrong will deduct an additional 5 seconds. GoodLuck!";
    startQuizBtn.textContent = "Start Quiz!";
    startQuizBtn.classList.add('btn-start')

    mainStartScreen.appendChild(startQuiz);
    mainStartScreen.appendChild(quizRules);
    mainStartScreen.appendChild(startQuizBtn);

    for (let i = 0; i < 3; i++) {
        mainStartScreen.children[i].setAttribute("style", "margin: 20px;")
    }
}
 // The countdown function sets the timer for the quiz and handles any events that must take place when certain conditions are met
function countdown() {
    // Creates an h4 element to display the time count down
    let timeSeconds = document.createElement("h4");
    timeSeconds.classList.add('seconds'); 
       timerEl.appendChild(timeSeconds); // Appends it to the timer id
    // 
    let countdown = setInterval(function() {
        // Once the timer starts this removes the placeholder
        if (timeStart === 60) {
            timerEl.removeChild(removeTimePlaceHold);
        }
        timeStart--;
        timeSeconds.textContent = timeStart;
        // If the timer falls below 0 the time interval stops and enters the submit high score page
        if (timeStart < 0 ){
            timeSeconds.textContent = 0;
            clearInterval(countdown);
            enterHighScore();
        }
        // If user finishes quiz before that time the the high score page is popped up
        else if (sortedDictionaryIndex === questionBank.length) {
            timeSeconds.textContent = timeStart;
            clearInterval(countdown);
        }
        // If user leaves to high score page in the middle of the quiz, the timer is stopped
        viewHighScoresBtn.onclick = function() {
            timeSeconds.textContent = timeStart;
            clearInterval(countdown);
        }
        
    }, 1000);
}

// This function randomizes the questions dictionary and then calls the loadQuestions function 
function initializeDictionary() {
    sortedDictionary = questionBank.sort(function(){return 0.5 - Math.random()});
    loadQuestion();
}

// This function loads questions and values to the corresponding locations so that it appears as a question with four answer options 
function loadQuestion () {
    // puts the question value in the right box
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    // Adds a number to the end of every "Question" display
    changeQuestionNum.textContent = (sortedDictionaryIndex + 1);
    // For loop populates each of the 4 question boxes
    for (let i = 0; i < 4; i++) {
        answerButtons[i].innerText = sortedDictionary[sortedDictionaryIndex].options[i]["option"];
        answerButtons[i].value = sortedDictionary[sortedDictionaryIndex].options[i]["status"];
    }
    answerButtons.forEach(item => {item.addEventListener('click',selectAnswer)})
}

// Selects the button and uses event target to get the value of the button. Depending on the value of the button will give me the the correct prompt or the incorrect prompt.
// if the correct value is selected you gain 10 points.  
function selectAnswer (event) {
    let selectedButton = event.target;
    // Correct answers are given a value of 1
    if (selectedButton.value === "1"){
        correctAnswerAlert();
        scoreCount = scoreCount + 10;
        updateScore.textContent = scoreCount;
    }
    else {
        timeStart = timeStart - 10;
        wrongAnswerAlert();
    }
    // increment the index to move to the next question
    sortedDictionaryIndex ++;
    // if the index value and the length of the dictionary value are the same it means the user has completed the quiz before the timer and the high score screen is loaded
    if(sortedDictionaryIndex === questionBank.length) {
        enterHighScore();
    } 
    else {
        loadQuestion();
    }
}

// Pops up a nice alert for 1 second letting the user know the answer is correct
function correctAnswerAlert () {
    let time = 1;
    answerAlert.innerText = "Correct";
    answerAlert.style.backgroundColor="lightgreen";
    let countdown = setInterval(function() {
        time--;
        if (time === 0){
            answerAlert.innerText = " ";
            answerAlert.style.backgroundColor="transparent";
            clearInterval(countdown);
        }
        
    }, 1000);
}

// Pops up a nice alert for 1 second saying the answer is incorrect. lets the user know 10 seconds will be deducted.
function wrongAnswerAlert () {
    let time = 1;
    answerAlert.innerText = "Incorrect. -10 seconds";
    answerAlert.style.backgroundColor="red";
    let countdown = setInterval(function() {
        time--;
        if (time === 0){
            answerAlert.innerText = " ";
            answerAlert.style.backgroundColor="transparent";
            clearInterval(countdown);
        }
        
    }, 1000);
}

// This function will fill in the text content for the final score the user has accumulated. It will then prompt the user to
// enter an initial (or full name) to store with their score in an object. This is then stored in local storage and displayed
// at the bottom of the screen as a table.
function enterHighScore () {        
    let finalScore = document.querySelector(".your-score");
    let enterScore = document.querySelector(".high-score-input");
    let submitScore = document.querySelector(".high-score-enter");

    finalScore.textContent = "Final Score: "+scoreCount;

    quizOpen.style.display = 'none';
    highScoreScreen.style.display = 'flex';

    highScoreScreen.appendChild(finalScore);
    // When the submit score button is clicked, the function called will push the score value along with the users initial to be stored in an object.
    submitScore.addEventListener("click",function(event) {
        event.preventDefault();
        let scoreText = enterScore.value.trim();

        if (scoreText === " ") {
            enterHighScore();
        }

        highScoresList.push({
            name: scoreText,
            score: scoreCount});

        // Sorts the object by score in descending order so that you can see the top scores
        let sortedHighScoresList = highScoresList.sort((a,b) => { return b.score - a.score;})
        highScoresList = sortedHighScoresList;
        
        // Clears the input text and hides the submit button and conclusion statement
        enterScore.value = " ";
        cutDisplay.style.display= 'none';
        
        // Stores the scores to the local storage
        storeScore();

        // Re renders the high score list to add the new score to the list
        renderHighScores(1, scoreText, scoreCount);

    });

}

// Renders the high scores so that they are listed in a table in the high score display and after the quiz is finished
function renderHighScores(renderCount,scoreText,scoreCount) {
    let highScores = document.querySelector(".high-score-list");
    
    // When the display initializes the first time it uses a for loop to display all stored values.
    // Any time after that, which is kept track by renderCount, the newly entered score is appended to the list and the
    // list is reloaded
    if (renderCount > 0) {
        let newRow = document.createElement('tr');
        let tdName = document.createElement("td");
        let tdScore = document.createElement("td");

        tdName.textContent = scoreText;
        tdScore.textContent = scoreCount;

        highScores.appendChild(newRow);
        newRow.appendChild(tdName);
        newRow.appendChild(tdScore);

        return;
    }
    renderCount++;

    // prints the list the first time
    for (let i = 0; i < highScoresList.length; i++) {
        let newRow = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdScore = document.createElement('td');

        tdName.textContent = highScoresList[i].name;
        tdScore.textContent = highScoresList[i].score;
        
        highScores.appendChild(newRow);
        newRow.appendChild(tdName);
        newRow.appendChild(tdScore);
    }
  
}

// Stores the object of highScoresList
function storeScore() {
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
}

// initializes the object of stored scores so it is already displayed
function init() {
    let storedScores = JSON.parse(localStorage.getItem("highScoresList"));

    if (storedScores !== null){
        highScoresList = storedScores;
    }

    renderHighScores(renderCount);

    return storedScores;
}

// The code below kicks off the program with the mainScreen function, then calls the init function
mainScreen();
init();

// Once the Start button is clicked, all the other functions are called for us through out the program. It also takes care
// of any displays that need to be opened or closed
startQuizBtn.addEventListener("click", function() {
    mainStartScreen.style.display = 'none';
    quizOpen.style.display = 'flex';
    countdown();
    initializeDictionary();
});

// If the high scores button is clicked it takes us to a display of the list of high scores. If this button is clicked during a game 
// the timer also stops.   
viewHighScoresBtn.addEventListener('click', function() {
    mainStartScreen.style.display = 'none';
    quizOpen.style.display = 'none';
    highScoreScreen.style.display = 'flex';
    cutDisplay.style.display = 'none';
});
