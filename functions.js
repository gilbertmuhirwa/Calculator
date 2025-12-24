
// Calculator State


let firstNumber = null;
let secondNumber = null;
let operator = null;
let shouldResetDisplay = false;


// DOM Elements

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const decimalButton = document.getElementById("decimal");
const backspaceButton = document.getElementById("backspace");


// Math Functions


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
  if (b === 0) return "Nope. ÷ 0?";
  return a / b;
}

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);

  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}


// Display Helpers


function resetDisplayIfNeeded() {
  if (shouldResetDisplay) {
    display.textContent = "";
    shouldResetDisplay = false;
  }
}

function roundResult(value) {
  return Math.round(value * 1000) / 1000;
}


// Button Logic


numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    resetDisplayIfNeeded();
    if (display.textContent === "0") {
      display.textContent = button.textContent;
    } else {
      display.textContent += button.textContent;
    }
  });
});

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (operator !== null && !shouldResetDisplay) {
      evaluate();
    }
    firstNumber = display.textContent;
    operator = button.dataset.key;
    shouldResetDisplay = true;
  });
});

equalsButton.addEventListener("click", evaluate);

function evaluate() {
  if (operator === null || shouldResetDisplay) return;

  secondNumber = display.textContent;
  let result = operate(operator, firstNumber, secondNumber);

  if (typeof result === "number") {
    result = roundResult(result);
  }

  display.textContent = result;
  firstNumber = result;
  operator = null;
  shouldResetDisplay = true;
}


// Extra Features


decimalButton.addEventListener("click", () => {
  if (display.textContent.includes(".")) return;
  display.textContent += ".";
});

backspaceButton.addEventListener("click", () => {
  display.textContent =
    display.textContent.length > 1
      ? display.textContent.slice(0, -1)
      : "0";
});

clearButton.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = null;
  secondNumber = null;
  operator = null;
  shouldResetDisplay = false;
});


// Keyboard Support


window.addEventListener("keydown", e => {
  if (!isNaN(e.key)) {
    document.querySelector(`.number[data-key="${e.key}"]`)?.click();
  }

  if (["+", "-", "*", "/"].includes(e.key)) {
    document.querySelector(`.operator[data-key="${e.key}"]`)?.click();
  }

  if (e.key === "Enter") equalsButton.click();
  if (e.key === "Backspace") backspaceButton.click();
  if (e.key === "Escape") clearButton.click();
  if (e.key === ".") decimalButton.click();
});
