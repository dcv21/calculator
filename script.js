const main = () => {
    let div = document.querySelector('.container');
    let tmp = '<input class="display"></input><div class="input"></div>';
    div.innerHTML = tmp;

    div = document.querySelector('.input');

    const buttons = [
        'C', 'CE', '',
        '1', '2', '3', '+', '',
        '4', '5', '6', '-', '',
        '7', '8', '9', '*', '',
        '.', '0', '=', '/', ''
    ]

    let buttonDiv = document.createElement('div');
    buttonDiv.className = 'row';

    buttons.forEach(button => {
        if (button) {
            tmp = document.createElement('button');
            tmp.innerHTML = button;
            tmp.addEventListener('click', () => {
                updateDisplay(button);
            });
            buttonDiv.appendChild(tmp);
        } else {
            div.appendChild(buttonDiv);
            buttonDiv = document.createElement('div');
            buttonDiv.className = 'row';
        }
    });
}

const updateDisplay = (char) => {
    const display = document.querySelector('.display');

    if (char === 'C') {
        display.value = '';
    } else if (char === 'CE') {
        display.value = display.value.slice(0, -1);
    } else if (char === '=') {
        display.value = operate(display.value);
    } else {
        display.value += char;
    }
}

const isNum = (char) => {
    return char >= '0' && char <= '9';
}

const func = (string) => {
    const result = [];
    let tmp = '';

    for (let char of string) {
        if (isNum(char) || char === '.') {
            tmp += char;
        } else if (['+', '-', '*', '/'].includes(char)) {
            if (tmp) {
                result.push(tmp);
                tmp = '';
            }
            result.push(char);
        } else {
            return false;
        }
    }

    if (tmp) {
        result.push(tmp);
    }

    return result;
}

const calculate = (arr) => {
    for (let i = 0; i < arr.length; i += 2) {
        arr[i] = Number(arr[i]);
    }

    switch (arr[1]) {
        case '+':
            arr[0] = arr[0] + arr[2];
            break;
        case '-':
            arr[0] = arr[0] - arr[2];
            break;
        case '*':
            arr[0] = arr[0] * arr[2];
            break;
        case '/':
            arr[0] = arr[0] / arr[2];
            break;
        default:
            return false;
    }

    if (isNaN(arr[0])) {
        return false;
    }

    return arr;
}

const operate = (string) => {
    const f = func(string);

    if (!f) {
        alert('Invalid expression');
        return string;
    }

    try {
        let tmp = f.splice(0, 1);

        while (f.length) {
            tmp = [tmp[0], ...f.splice(0, 2)];
            tmp = calculate(tmp);

            if (!tmp) {
                throw new Error('Invalid expression');
            }
        }

        return tmp[0];
    } catch (e) {
        alert('Invalid expression');
        console.log(e);
        return string;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    main();
});