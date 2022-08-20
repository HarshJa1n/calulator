let currentTotal = 0;
let previousOperator= null;
let buffer = "0";
const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons')
.addEventListener('click',function(event){
    console.log(event.target.innerText);
    buttonClick(event.target.innerText);
});

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
} else {
    handleNumber(value);
}
updateDisplay();
}

function handleNumber(value){
    if(buffer === "0"){
        buffer = value;
    } else {
        buffer += value;
    }
}


function handleSymbol(value){
    switch(value){
        case 'C':
            buffer = "0";
            currentTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = '' + currentTotal;
            currentTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
        default:
            handleMath(value);
    }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if(previousOperator === null){
        currentTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function flushOperation(intBuffer){
    switch(previousOperator){
        case '+':
            currentTotal += intBuffer;
            break;
        case '-':
            currentTotal -= intBuffer;
            break;
        case '×':
            currentTotal *= intBuffer;
            break;
        case '÷':
            currentTotal /= intBuffer;
            break;
    }
}
function updateDisplay(){
    screen.innerText = buffer;
}