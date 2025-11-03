function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

const problem = {
    firstNum:null,
    secondNum:null,
    operator:null,
    prevOperator: null,
}

function operate(a,b,opp){
    switch(opp){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case'/':
            return divide(a,b);
    }
}

const display = document.querySelector('#outputContainer');
const output = document.createElement('p');
let input ='';
let answer = '';

const calcButtons = document.querySelectorAll('.calculatorButton');
calcButtons.forEach(el => el.addEventListener('click', () => {
    let temp = el.textContent;
    updateDisplay(el.textContent);
    storeValues(temp);
}));

function updateDisplay(str){
    output.textContent = output.textContent + ' ' + str;
    display.appendChild(output);  
}

function storeValues(str){
    input+=str;
}

function clear(){
    clearDisplay();
    problem.firstNum = null;
    problem.secondNum = null;
    problem.operator = null;
}

function clearDisplay(){
    output.textContent = '';
    input = '';
    storedAnswer = '';
}


const clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click', () => clear());

const equalButton = document.querySelector('#equalButton');
equalButton.addEventListener('click', () => {
    equals();
});

function equals(){
    problem.secondNum = Number(input);
    clearDisplay();
    answer = operate(problem.firstNum, problem.secondNum, problem.prevOperator);
    problem.firstNum = answer;
    problem.secondNum = null;
    console.log(problem.secondNum);
    updateDisplay(answer);
}


const operatorButton = document.querySelectorAll('.operatorButton');
operatorButton.forEach( el => el.addEventListener('click', () => handleOperatorButtonClick(el)));

function handleOperatorButtonClick(el){
    problem.operator = el.textContent;
    updateDisplay(el.textContent);

    if (!problem.prevOperator) problem.prevOperator = problem.operator;

    if (!problem.firstNum) {
            problem.firstNum = Number(input)
    } else {
        problem.secondNum = Number(input);
        equals();
        updateDisplay(el.textContent);
    }
    problem.prevOperator = problem.operator;
    problem.operator = null;
    input = '';
}