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


let num1 = null;
let num2 = null;
let operator = null;

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
let storedAnswer = '';

const calcButtons = document.querySelectorAll('.calculatorButton');
calcButtons.forEach(el => el.addEventListener('click', () => {
    updateDisplay(el.textContent);
    storeValues(el.textContent);
    if (!problem.firstNum){
            problem.firstNum = Number(input);
            console.log('first');
            input='';
        } else if (!problem.secondNum){
            problem.secondNum = Number(input);
            console.log(problem.secondNum);
            input = '';
        }
}));

function updateDisplay(str){
    output.textContent = output.textContent + ' ' + str;
    display.appendChild(output);  
}

function storeValues(str){
    input+=str;
}

function clear(){
    output.textContent = '';
    input = '';
    storedAnswer = '';
}

const clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click', () => clear());

const equalButton = document.querySelector('#equalButton');
equalButton.addEventListener('click', () => {
    answer = operate(problem.firstNum, problem.secondNum, problem.operator);
    updateDisplay(answer);
});

const problem = {
    firstNum:null,
    secondNum:null,
    operator:null,
}


const operatorButton = document.querySelectorAll('.operatorButton');
operatorButton.forEach( el => el.addEventListener('click', () => {
    let currOperator = el.textContent;
    (!problem.operator) ? problem.operator = currOperator : "";
    if (problem.firstNum && problem.secondNum){
        updateDisplay(doCalculation(currOperator)); 
    } else {
        if (!problem.firstNum){
            problem.firstNum = Number(input);
            console.log('first');
            input='';
        } else if (!problem.secondNum){
            problem.secondNum = Number(input);
            console.log(problem.secondNum);
            input = '';
           updateDisplay(doCalculation(currOperator));
        }
    } 
}));

function doCalculation(currOperator){
    answer = operate(problem.firstNum, problem.secondNum, problem.operator)
        console.log(problem.firstNum + " " + problem.operator + " " + problem.secondNum);
        problem.firstNum = answer;
        problem.operator = currOperator;
        problem.secondNum = null; 
    return answer;
}