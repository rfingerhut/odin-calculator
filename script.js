const problem = {
    firstNum:null,
    secondNum:null,
    prevOperator: null,
    error: false,
}

// ****** DOING THE CALCULATIONS FUNCTIONS ******
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

// ****** UPDATING THE DISPLAY ******
const display = document.querySelector('#outputContainer');
const output = document.createElement('p');
let input ='';

function updateDisplay(str){
    output.textContent = output.textContent + ' ' + str;
    display.appendChild(output);  
}


// ****** CALC BUTTON HANDLING ******
const calcButtons = document.querySelectorAll('.calculatorButton');
calcButtons.forEach(el => el.addEventListener('click', () => handleCalcButtonClick(el)));

function handleCalcButtonClick(el) {
    // When the calculator is not in an error state from dividing by zero: 
    if (problem.error == false) {
        let temp = el.textContent;
        updateDisplay(el.textContent);
        storeValues(temp);
    }
}

function storeValues(str){
    input+=str;
}


// ****** CLEAR BUTTON HANDLING ******
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


// ****** EQUAL BUTTON HANDLING ******
const equalButton = document.querySelector('#equalButton');
equalButton.addEventListener('click', () => {
    if (problem.error === false) equals();
});

function equals(){
    problem.secondNum = Number(input) || 0;
    clearDisplay();
    result = operate(problem.firstNum, problem.secondNum, problem.prevOperator);

    // When result is an actual number:
    if (typeof result === 'number' && !isNaN(result)){
        problem.firstNum = result;
        problem.secondNum = null;
        updateDisplay(result);

    // When result is NOT an actual number, like NaN (when dividing by zero):
    } else {
        updateDisplay('ERROR! Can\'t divide by zero. Press the clear button to continue.');
        problem.firstNum = null;
        problem.secondNum = null;
        problem.prevOperator = null;
        input = '';
    }
}


// ****** OPERATOR BUTTON HANDLING ******
const operatorButton = document.querySelectorAll('.operatorButton');
operatorButton.forEach( el => el.addEventListener('click', () => {if (problem.error == false) handleOperatorButtonClick(el)}));

function handleOperatorButtonClick(el){
    const newOperator = el.textContent;

    // When operator buttons are pressed consecutively:
    if (input=='' && problem.prevOperator !== null){
        let displayText = output.textContent.trim();
        console.log(displayText);

        // When last character of the display is already an operator:
        if (['+', '-', '*', '/'].includes(displayText.slice(-1))) {
            displayText = displayText.slice(0, -1) + newOperator;
        
        // When last character is NOT an operator:
        } else {
            displayText += ' ' + newOperator;
        }

        problem.prevOperator = newOperator;
        output.textContent = displayText;

        return;
    }
    
    // When operator button pressed before firstNum as been assigned:
    if (problem.firstNum === null) {
        problem.firstNum = Number(input) || 0;
        problem.prevOperator = newOperator;

        // When zero has been assigned to firstNum:
        (problem.firstNum === 0) ? updateDisplay(problem.firstNum + ' ' + newOperator): updateDisplay(newOperator);
        input = '';
        return;
    }

    // When operator button pressed after firstNum as been assigned:
    if (input !== ''){
        problem.secondNum = Number(input) || 0;
        equals();
         problem.prevOperator = newOperator;
        input = '';
        updateDisplay(newOperator);
        return;
    }
}