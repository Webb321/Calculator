function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}

let num1 = '';
let num2 = '';
let operator = '';
const display = document.querySelector('.display');
const decimalButton = document.querySelector('.decimal');

function operate(a, b, operator) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    }
}

function clear() {
    num1 = '';
    num2 = '';
    operator = '';
    display.textContent = '';
    decimalButton.disabled = false; // Re-enable the decimal button when cleared
}

function backspace() {
    if (!operator) {
        num1 = num1.slice(0, -1);
        display.textContent = num1;
    } else if (num2) {
        num2 = num2.slice(0, -1);
        display.textContent = num2;
    }
}

function updateDecimalButton() {
    const currentNum = operator ? num2 : num1;
    decimalButton.disabled = currentNum.includes('.');
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        handleButtonClick(button.textContent);
    });
});

function handleButtonClick(content) {
    if (!isNaN(content)) { // Number buttons
        if (!operator) {
            num1 += content;
            display.textContent = num1;
        } else {
            num2 += content;
            display.textContent = num2;
        }
    } else if (['+', '-', '*', '/'].includes(content)) { // Operator buttons
        if (num1 && num2 && operator) {
            display.textContent = operate(+num1, +num2, operator);
            num1 = display.textContent;
            num2 = '';
            operator = content;
        } else if (num1) {
            operator = content;
            display.textContent = operator;
            decimalButton.disabled = false; // Allow decimal input for the next number
        }
    } else if (content === '=') { // Equals button
        if (num1 && num2 && operator) {
            display.textContent = operate(+num1, +num2, operator);
            num1 = '';
            num2 = '';
            operator = '';
            decimalButton.disabled = false; // Re-enable decimal input after calculation
        }
    } else if (content === 'C') { // Clear button
        clear();
    } else if (content === '←') { // Backspace button
        backspace();
        updateDecimalButton();
    } else if (content === '.') { // Decimal button
        if (!operator) {
            if (!num1.includes('.')) {
                num1 += '.';
                display.textContent = num1;
            }
        } else {
            if (!num2.includes('.')) {
                num2 += '.';
                display.textContent = num2;
            }
        }
        updateDecimalButton(); // Disable the decimal button after one is added
    }
}

// Add keyboard support
window.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) {
        handleButtonClick(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        handleButtonClick(event.key);
    } else if (event.key === 'Enter') {
        handleButtonClick('=');
    } else if (event.key === 'Backspace') {
        handleButtonClick('←');
    } else if (event.key === '.') {
        handleButtonClick('.');
    } else if (event.key.toLowerCase() === 'c') {
        handleButtonClick('C');
    }
});
