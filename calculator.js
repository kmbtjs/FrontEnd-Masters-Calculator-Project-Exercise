let buffer = '0';
let runningTotal = 0;
let previousSymbol = null;
const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleNumber(number) {
    if(buffer === '0') {
        buffer = number;
    } else {
        buffer += number;
    }
}

function handleMath(value) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousSymbol = value;
    buffer = '0';
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            break;
        case '←':
            if(buffer.length === 1) {
                buffer = '0';
            }else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break
        case '=':
            if (previousSymbol === null) {
                console.log(buffer);
                return buffer;
            }
            flushOperation(parseInt(buffer));
            previousSymbol = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break
            case "+":
            case "-":
            case "×":
            case "÷":
                handleMath(symbol);
            break;
    }
}

function flushOperation(intBuffer) {
    if (previousSymbol === "+") {
        runningTotal += intBuffer;
      } else if (previousSymbol === "-") {
        runningTotal -= intBuffer;
      } else if (previousSymbol === "×") {
        runningTotal *= intBuffer;
      } else if (previousSymbol === "÷") {
        runningTotal /= intBuffer;
      }
}

function init() {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
    });
}

init();