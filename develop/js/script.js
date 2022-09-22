var questionBank = [
    {
        num: 1,
        question: "What is the correct way to write 'Hello World in an alert box",
        answer: "alert('Hello World')",
        options: [
            "alertbox('Hello World')",
            "alertBox('Hello World')",
            "alert('Hello World')",
            "prompt('Hello World')"
        ]
    },
    {
        num: 2,
        question: "What is the syntax for creating a function in JavaScript",
        answer: "function myFunction()",
        options: [
            "function = myFunction()",
            "function myFunction()",
            "function: myFunction()",
            "function--myFunction()"
        ]
    },
    {
        num: 3,
        question: "What is the syntax for an if statement in JavaScript",
        answer: "if (i===9)",
        options: [
            "if (i===9)",
            "if = (i===9)",
            "if: (i===9)",
            "if i===9"
        ]
    }
]

const startButton = document.getElementById('start')


startButton.addEventListener('click', startQuiz)

let timer = 60;
let score = 0;
let highScore = 0;

