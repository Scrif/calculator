const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

let a = ''
let b = ''
let currentOperation = null

const numkeys = document.querySelectorAll('[numkey]');
const operatorkeys = document.querySelectorAll('[operatorkey]');
const equalsBtn = document.getElementById('equals');
const allClearBtn = document.getElementById('AC');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const decimalBtn = document.getElementById('decimal');
const userInputScreen = document.getElementById('user-input');
const resultScreen = document.getElementById('result');

//event listeners
equalsBtn.addEventListener(click, operate)
allClearBtn.addEventListener(click, allClear)
clearBtn.addEventListener(click, clear)
backspaceBtn.addEventListener(click, backspace)
decimalBtn.addEventListener(click, decimal)

// functions

// This function runs the requested calculation
function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a,b)
        case '-':
            return subtract(a,b)
        case '*':
            return multiply(a,b)
        case '/':
            if (b === 0) return null    
            else return divide(a,b)
        default:
            return null
    }
};

// This appends the requested number to the current user input
numkeys.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)