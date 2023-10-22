document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "";
    let currentOperator = "";
    let result = 0;

    function updateDisplay() {
        display.textContent = currentInput || "0";
    }

    function handleButtonClick(value) {
        if (/\d/.test(value) || value === ".") {
            currentInput += value;
        } else if (value === "C") {
            clearCalculator();
        } else if (value === "←") {
            currentInput = currentInput.slice(0, -1);
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput !== "") {
                if (currentOperator) {
                    result = calculate();
                    currentInput = result.toString();
                } else {
                    result = parseFloat(currentInput);
                }
                currentOperator = value;
                currentInput = "";
            }
        } else if (value === "=") {
            if (currentOperator && currentInput !== "") {
                result = calculate();
                currentOperator = "";
                currentInput = result.toString();
            }
        }
        updateDisplay();
    }

    function calculate() {
        const num1 = parseFloat(result);
        const num2 = parseFloat(currentInput);
        switch (currentOperator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if (num2 === 0) {
                    alert("Cannot divide by zero.");
                    clearCalculator();
                    return 0;
                }
                return num1 / num2;
            default:
                return num2;
        }
    }

    function clearCalculator() {
        currentInput = "";
        currentOperator = "";
        result = 0;
        updateDisplay();
    }

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            handleButtonClick(button.textContent);
        });
    });
});
