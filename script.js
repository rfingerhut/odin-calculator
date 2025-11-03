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
    console.log(str);
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
    result = operate(problem.firstNum, problem.secondNum, problem.prevOperator);

    if (typeof result === 'number' && !isNaN(result)){
        problem.firstNum = result;
        problem.secondNum = null;
        updateDisplay(result);
    } else {
        updateDisplay(result);
        problem.firstNum = null;
        problem.secondNum = null;
        problem.prevOperator = null;
        input = '';
    }
}


const operatorButton = document.querySelectorAll('.operatorButton');
operatorButton.forEach( el => el.addEventListener('click', () => handleOperatorButtonClick(el)));

function handleOperatorButtonClick(el){
    const newOperator = el.textContent;

    if (!problem.firstNum) {
        problem.firstNum = Number(input) || 0;
        problem.prevOperator = newOperator;
        updateDisplay(newOperator);
        input = '';
        return;
    }
    if (input !== ''){
        problem.secondNum = Number(input);
        equals();
    }
    
    problem.prevOperator = newOperator;
    input = '';
    updateDisplay(newOperator);
}