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
// let storedVals = [];
let input ='';
let storedAnswer = '';

const calcButtons = document.querySelectorAll('.calculatorButton');
calcButtons.forEach(el => el.addEventListener('click', () => {
    updateDisplay(el.textContent);
    storeValues(el.textContent);
}));

function updateDisplay(str){
    output.textContent = output.textContent + ' ' + str;
    display.appendChild(output);  
}

function storeValues(str){
    // storedVals.push(str);
    input+=str;
}

function splitInput(){
    let problem;

    if (input.includes('+')){
        problem = input.split('+');     
        operator='+';
    } else if (input.includes('-')){
        problem = input.split('-');
        operator='-';
    } else if (input.includes('*')){
        problem = input.split('*');
        operator='*';
    } else if (input.includes('/')){
        problem = input.split('/');
        operator='/';
    }
    num2=Number(problem.pop());
    num1=Number(problem.pop());
    storedAnswer = operate(num1, num2, operator);
    updateDisplay(storedAnswer); 
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
    output.textContent='';
    splitInput();
    input = '';
});





// const equalButton = document.querySelector('#equalButton');
// equalButton.addEventListener('click', () => {
//     num2 = Number(storedVals.pop());
//     operator = storedVals.pop();
//     num1 = Number(storedVals.pop());

//     let answer = operate(num1, num2, operator);

//     updateDisplay(answer)
// })