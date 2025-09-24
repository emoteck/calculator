// let buttons = document.querySelectorAll('button');
// let display = document.querySelector('#h1');
// let string = '';
// let arr = [];
// let operator = '';   // keep track of single operator
// let result = 0;
// let normalNum = 0;
// let justEvaluated = false;

// buttons.forEach(btn => {
//     btn.addEventListener('click', () => {
//         let value = btn.innerText;

//         // Clear
//         if (value === 'AC') {
//             arr = [];
//             string = '';
//             display.innerText = '0';
//             result = 0;
//             normalNum = 0;
//             operator = '';
//             return;
//         }

//         // Operator pressed
//         if (['+', '-', 'X', '/'].includes(value)) {
//             if (arr.length > 0) {
//                 let currentNum = Number(arr.join(''));
//                 if (operator) {
//                     // Perform the previous operation first
//                     if (operator === '+') normalNum = add(normalNum, currentNum);
//                     if (operator === '-') normalNum = subtract(normalNum, currentNum);
//                     if (operator === 'X') normalNum = multiply(normalNum, currentNum);
//                     if (operator === '/') normalNum = divide(normalNum, currentNum);
//                 } else {
//                     // First time: just store the number
//                     normalNum = currentNum;
//                 }
//                 display.innerText = normalNum;
//                 arr = [];
//             }
//             operator = value;  // update operator for the next step
//             justEvaluated = false;
//             return;
//         }


//         // Equals pressed
//         if (value === '=') {
//             let secondNum = Number(arr.join(''));
//             let answer = 0;
//             if (!operator) {
//                 // No operator: just show the current number
//                 answer = arr.length > 0 ? secondNum : normalNum;
//             }
//             else {
//                 if (operator === '+') answer = add(normalNum, secondNum);
//                 if (operator === '-') answer = subtract(normalNum, secondNum);
//                 if (operator === 'X') answer = multiply(normalNum, secondNum);
//                 if (operator === '/') answer = divide(normalNum, secondNum);
//             }
//             display.innerText = answer;
//             arr = [answer.toString()];
//             string = answer;
//             normalNum = answer;
//             operator = '';
//             justEvaluated = true;
//             return;
//         }
//         if (!isNaN(value) || value === ".") {
//             if (justEvaluated) {
//                 // start fresh after =
//                 arr = [];
//                 string = '';
//                 normalNum = 0;
//                 justEvaluated = false;
//             }

//             if (value === ".") {
//                 if (arr.includes(".")) return;       // block multiple dots
//                 if (arr.length === 0) arr.push("0"); // prepend 0 if dot is first
//             }
//             arr.push(value);
//             string = arr.join('');
//             display.innerText = string;
//             return;
//         }

//         // Numbers
//         arr.push(value);
//         string = arr.join('');
//         display.innerText = string;
//     });
// });

// function add(a, b) { return a + b; }
// function subtract(a, b) { return a - b; }
// function multiply(a, b) { return a * b; }
// function divide(a, b) { return a / b; }


let display = document.querySelector('#h1');
let arr = [];
let operator = '';
let normalNum = 0;
let justEvaluated = false;

const OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'X': (a, b) => a * b,
    '/': (a, b) => a / b
};

function resetAll() {
    arr = [];
    operator = '';
    normalNum = 0;
    justEvaluated = false;
    display.innerText = '0';
}

function commitArrToNumber() {
    return arr.length > 0 ? Number(arr.join('')) : null;
}

function handleClear() {
    resetAll();
}

function handleOperator(value) {
    const currentNum = commitArrToNumber();
    if (currentNum !== null) {
        if (operator) {
            normalNum = OPERATORS[operator](normalNum, currentNum);
        } else {
            normalNum = currentNum;
        }
        display.innerText = normalNum;
        arr = [];
    }
    operator = value;
    justEvaluated = false;
}

function handleEquals() {
    const currentNum = commitArrToNumber();
    let answer = 0;

    if (!operator) {
        answer = currentNum !== null ? currentNum : normalNum;
    } else {
        answer = OPERATORS[operator](normalNum, currentNum ?? 0);
    }

    display.innerText = answer;
    arr = [answer.toString()];
    normalNum = answer;
    operator = '';
    justEvaluated = true;
}

function handleNumber(value) {
    if (justEvaluated) {
        arr = [];
        normalNum = 0;
        justEvaluated = false;
    }

    if (value === '.') {
        if (arr.includes('.')) return;
        if (arr.length === 0) arr.push('0');
    }

    arr.push(value);
    display.innerText = arr.join('');
}

// === Event Binding ===
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.innerText;

        if (value === 'AC') return handleClear();
        if (OPERATORS[value]) return handleOperator(value);
        if (value === '=') return handleEquals();
        if (!isNaN(value) || value === '.') return handleNumber(value);
    });
});
