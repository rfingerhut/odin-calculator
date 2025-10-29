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
}));

function updateDisplay(str){
    output.textContent = output.textContent + ' ' + str;
    display.appendChild(output);  
}

function storeValues(str){
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

// when an operator button is pressed, do a calculation and then store the answer.
// if it's an object ... problem would have properties: firstNum, operator, secondNum, and.. answer?
// for each operator button is pressed, then you would have to check if a firstNum or secondNum exist?
// problem.firstNum = 12 problem.operator = + problem.secondNum = 7 
// if the minus button is pressed...
// if there's a second number already, do the calculation. First number is only stored once the operator button is pressed.
// operator button press: checks for first number, if no first number, assign it (need to store input as a concactonated string.) If there is not a firstNum, through an error. If there is a firstNum, check if secondNum exists. If secondNum does not exist, then continue with input collecting (no calculation). If a secondNum does exist, do the calculation using problem.firstNum, problem.operator, and problem.secondNum. Then, assign problem.operator with the current button that was pressed. Assign problem.FirstNum as the result from the calculation().

const problem = {
    firstNum:null,
    secondNum:null,
    operator:null,
}


const operatorButton = document.querySelectorAll('.operatorButton');
operatorButton.forEach( el => el.addEventListener('click', () => {
    let answer = '';
    if (!problem.firstNum || !problem.operator || !problem.secondNum){
        if (!problem.firstNum){
            problem.firstNum = Number(input);
            input='';
            console.log('first number assigned: ' + problem.firstNum);
        } else if (!problem.secondNum){
            problem.secondNum = Number(input);
            input = '';
            console.log('second number assigned: ' + problem.secondNum);
        }
        if (!problem.operator){
            problem.operator = el.textContent;
            console.log('operator assigned: ' + problem.operator);
        }  
    }  
    if (problem.firstNum && problem.operator && problem.secondNum){
        answer = operate(problem.firstNum, problem.secondNum, problem.operator);
        console.log(`Answer = ${answer}`);
        problem.firstNum = answer;
        problem.operator = null;
        problem.secondNum = null;  
    }
}));
