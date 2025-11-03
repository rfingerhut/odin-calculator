const problem = {
    firstNum:null,
    secondNum:null,
    prevOperator: null,
    error: false,
}


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

function operate(a,b,opp){
    switch(opp){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case'/':
            if (b === 0) {
                problem.error = true; 
                return null;
            }
            return divide(a,b);
    }
}

const display = document.querySelector('#outputContainer');
const output = document.createElement('p');
let input ='';

const calcButtons = document.querySelectorAll('.calculatorButton');
calcButtons.forEach(el => el.addEventListener('click', () => handleCalcButtonClick(el)));

function handleCalcButtonClick(el) {
    if (problem.error == false) {
        let temp = el.textContent;
        updateDisplay(el.textContent);
        storeValues(temp);
    }
}

function updateDisplay(str){
    output.textContent = output.textContent + ' ' + str;
    display.appendChild(output);  
}

function storeValues(str){
    input+=str;
}

const clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click', () => clear());

function clear(){
    clearDisplay();
    problem.firstNum = null;
    problem.secondNum = null;
    problem.error = false;
}

function clearDisplay(){
    output.textContent = '';
    input = '';
}

const equalButton = document.querySelector('#equalButton');
equalButton.addEventListener('click', () => {
    if (problem.error === false) equals();
});

function equals(){
    problem.secondNum = Number(input) || 0;
    clearDisplay();
    result = operate(problem.firstNum, problem.secondNum, problem.prevOperator);

    if (typeof result === 'number' && !isNaN(result)){
        problem.firstNum = result;
        problem.secondNum = null;
        updateDisplay(result);
    } else {
        updateDisplay('ERROR! Can\'t divide by zero. Press the clear button to continue.');
        problem.firstNum = null;
        problem.secondNum = null;
        problem.prevOperator = null;
        input = '';
    }
}

const operatorButton = document.querySelectorAll('.operatorButton');
operatorButton.forEach( el => el.addEventListener('click', () => {if (problem.error == false) handleOperatorButtonClick(el)}));

function handleOperatorButtonClick(el){
    const newOperator = el.textContent;

    if (problem.firstNum === null) {
        problem.firstNum = Number(input) || 0;
        problem.prevOperator = newOperator;
        (problem.firstNum === 0) ? updateDisplay(problem.firstNum + ' ' + newOperator): updateDisplay(newOperator);
        input = '';
        return;
    }
    if (input !== ''){
        problem.secondNum = Number(input) || 0;
        equals();
    }

    problem.prevOperator = newOperator;
    input = '';
    updateDisplay(newOperator);
}