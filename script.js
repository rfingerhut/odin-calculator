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

const calcButtons = document.querySelectorAll('.calculatorButton');
calcButtons.forEach(el => el.addEventListener('click', () => {
    updateDisplay(el.textContent);
    storeValues(el.textContent);
    if (!problem.firstNum){
        problem.firstNum = Number(input);
    } else if (!problem.secondNum){
        problem.secondNum = Number(input);
    }
    console.log(problem);
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
    clearDisplay();
    answer = operate(problem.firstNum, problem.secondNum, problem.prevOperator);
    problem.firstNum = answer;
    problem.secondNum = null;
    updateDisplay(answer);
}


const operatorButton = document.querySelectorAll('.operatorButton');
operatorButton.forEach( el => el.addEventListener('click', () => {
    problem.operator = el.textContent;
    input = '';
    updateDisplay(el.textContent);
    (!problem.prevOperator) ? problem.prevOperator = problem.operator : "";
    if (problem.firstNum && problem.secondNum){
        equals(); 
    }
    problem.operator = null;
}));

function doCalculation(currOperator){
    answer = operate(problem.firstNum, problem.secondNum, problem.operator)
        problem.firstNum = answer;
        problem.operator = currOperator;
        problem.secondNum = null; 
    return answer;
}