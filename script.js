let expression = document.querySelector("#expression");
let currentOperand = document.querySelector("#currentOperand");

const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
}

const buttonClick = (symbol) => {
    if (isOperator(symbol)) {
        if (symbol === "-") {
            if (expression.innerHTML.match(/[-+*/]\s+[-+/*]\s$/) !== null) {
                return;
            } else {
                expression.innerHTML = expression.innerHTML + " " + symbol + " ";
                currentOperand.innerHTML = symbol;
            }
            if (expression.innerHTML.includes("=")) {
                let answer = expression.innerHTML.split("=").pop().trim();
                answer = answer.match(/-?\d*\.?\d*/g).shift();
                expression.innerHTML = answer + symbol;
                currentOperand.innerHTML = symbol;
            }

        } else {
            if (expression.innerHTML.match(/[-+/*]\s$/) !== null) {
                if (expression.innerHTML.match(/[-+/*]\s+[-+/*]\s$/) !== null) {
                    expression.innerHTML = expression.innerHTML.slice(0, -5) + symbol + " ";
                    currentOperand.innerHTML = symbol;
                } else {
                    expression.innerHTML = expression.innerHTML.slice(0, -2) + symbol + " ";
                    currentOperand.innerHTML = symbol;
                }
            } else {
                expression.innerHTML = expression.innerHTML + ' ' + symbol + ' ';
                currentOperand.innerHTML = symbol;
            }
            if (expression.innerHTML.includes("=")) {
                let answer = expression.innerHTML.split("=").pop().trim();
                answer = answer.match(/-?\d*\.?\d*/g).shift();
                expression.innerHTML = answer + symbol;
                currentOperand.innerHTML = symbol;
            }
        }
    } else if (symbol === "clear") {
        expression.innerHTML = "";
        currentOperand.innerHTML = 0;
    } else if (symbol === "=") {
        calculate();
    } else if (symbol === "0") {
        // get the last number
         const lastNumber = expression.innerHTML.split(/[-+/*]/g).pop().trim();
         if (lastNumber !== "0") {
            expression.innerHTML = expression.innerHTML + symbol;
            currentOperand.innerHTML = currentOperand.innerHTML + symbol;
         }         
    } else if (symbol === "."){
        // check if the last operator is [-+/*] or if it is an empty string
        if (expression.innerHTML.match(/[-+/*]\s$/) !== null || (expression.innerHTML === "")) {
            expression.innerHTML = expression.innerHTML + "0" + symbol;
            currentOperand.innerHTML = currentOperand.innerHTML + "0" + symbol;
        } else {
            // get the last number
            const lastNumber = expression.innerHTML.split(/[-+/*]/g).pop().trim();
            // if the last number already has a decimal, don't add another
            if (lastNumber.includes(".")) return;
            expression.innerHTML = expression.innerHTML + symbol;
            currentOperand.innerHTML = currentOperand.innerHTML + symbol;
        }
    } else {
        // get the last number
        const lastNumber = expression.innerHTML.split(/[-+/*]/g).pop().trim();
        if (lastNumber.charAt(0) === "0" && lastNumber.includes(".") === false) {
            expression.innerHTML = expression.innerHTML.trim().slice(0, -1) + symbol;
            currentOperand.innerHTML = symbol;
        } else {
            expression.innerHTML = expression.innerHTML + symbol;
            currentOperand.innerHTML = lastNumber + symbol;
        }
    }
}

const calculate = () => {
    let result = eval(expression.innerHTML);
    result = roundNumber(result);
    expression.innerHTML = expression.innerHTML + ' ' + "=" + ' ' + result;
    currentOperand.innerHTML = result;
}

const roundNumber = (num) => {
    return Math.round(num * 100000) / 100000;
}