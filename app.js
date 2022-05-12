const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

let a = ''
let b = ''
let operator = null
let shouldResetScreen = false

const numkeys = document.querySelectorAll('[numkey]');
const operatorkeys = document.querySelectorAll('[operatorkey]');
const equalsBtn = document.getElementById('equals');
const allClearBtn = document.getElementById('ac');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const decimalBtn = document.getElementById('decimal');
const userInputScreen = document.getElementById('user-input');
const resultScreen = document.getElementById('result');

//event listeners
equalsBtn.addEventListener('click', check)
allClearBtn.addEventListener('click', allClear)
clearBtn.addEventListener('click', clear)
backspaceBtn.addEventListener('click', backspace)
decimalBtn.addEventListener('click', decimal)

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

// Actually evaluates the operations. Calls Operate() function and updates the values on the screen.
function check() {
    if (operator === null || shouldResetScreen) return
    if (operator === '/' && userInputScreen.textContent === '0') {
        alert("Divide by 0 error!")
        return
    }
    b = userInputScreen.textContent
    userInputScreen.textContent = roundNumber(
        operate(operator, a, b)
    )
    resultScreen.textContent = `${a} ${operator} ${b} =`
    operator = null
    console.log(resultScreen.textContent);
}

function allClear() {
    userInputScreen.textContent = '0'
    resultScreen.textContent = ''
    a = ''
    b = ''
    operator = null
}

function clear() {
    userInputScreen.textContent = '0'
    resultScreen.textContent = ''
    a = ''
    b = ''
    operator = null
}

function backspace() {
    userInputScreen.textContent = userInputScreen.textContent 
    .toString() 
    .slice(0,-1);
}

function resetScreen() {
    userInputScreen.textContent = ''
    shouldResetScreen = false
}

function decimal() {
    if(shouldResetScreen) resetScreen()
    if (userInputScreen.textContent === '')
        userInputScreen.textContent = '0'
    if (userInputScreen.textContent.includes('.')) return
    userInputScreen.textContent += '.'
}

function updateNumber(numkeyValue) {
    if (userInputScreen.textContent === '0' || shouldResetScreen)
        resetScreen()
    userInputScreen.textContent += numkeyValue
}

function updateOperation(newOperator) {
    if (operator !== null) check()
    a = userInputScreen.textContent
    operator = newOperator
    resultScreen.textContent = `${a} ${operator}`
    shouldResetScreen = true
}

function roundNumber(number) {
    return Math.round(number * 1000) / 1000
}

// This appends the requested number to the current user input
numkeys.forEach((button) =>
    button.addEventListener('click', () => updateNumber(button.textContent))
)

// Updates the operator variable to the user-requested operator.
operatorkeys.forEach((button) =>
    button.addEventListener('click', () => updateOperation(button.textContent))
)