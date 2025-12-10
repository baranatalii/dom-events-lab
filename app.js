const buttons = document.querySelectorAll(".button");
let firstNum = "";
let operator = "";
let secondNum = "";
let displayValue = "0";
const display = document.querySelector(".display");

function clearCalculator() {
  firstNum = "";
  operator = "";
  secondNum = "";
  displayValue = "0";
}

function updateDisplay() {
  display.innerText = displayValue;
}

function calculate(num1, operation, num2) {
  const a = parseFloat(num1);
  const b = parseFloat(num2);
  let result = 0;

  if (operation === "+") {
    result = a + b;
  } else if (operation === "-") {
    result = a - b;
  } else if (operation === "*") {
    result = a * b;
  } else if (operation === "/") {
    if (b === 0) return "ERROR";
    result = a / b;
  }

  return result.toString();
}

function handleNumberInput(buttonValue) {
  if (operator === "") {
    if (firstNum === "0") {
      firstNum = buttonValue;
    } else {
      firstNum += buttonValue;
    }
    displayValue = firstNum;
  } else {
    secondNum += buttonValue;
    displayValue = secondNum;
  }
}

function handleOperatorInput(buttonValue) {
  if (firstNum === "") {
    firstNum = "0";
  }

  if (operator !== "" && secondNum !== "") {
    const result = calculate(firstNum, operator, secondNum);
    firstNum = result;
    operator = buttonValue;
    secondNum = "";
    displayValue = result;
  } else {
    operator = buttonValue;
  }
}

function handleEquals() {
  if (firstNum === "" || operator === "" || secondNum === "") {
    return;
  }

  const result = calculate(firstNum, operator, secondNum);
  firstNum = result;
  operator = "";
  secondNum = "";
  displayValue = result;
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonValue = event.target.innerText;

    if (event.target.classList.contains("clear") || buttonValue === "C") {
      clearCalculator();
    } else if (event.target.classList.contains("number")) {
      handleNumberInput(buttonValue);
    } else if (event.target.classList.contains("operator")) {
      handleOperatorInput(buttonValue);
    } else if (buttonValue === "=") {
      handleEquals();
    }

    updateDisplay();
  });
});
