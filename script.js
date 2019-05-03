let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value){
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0"){
    buffer = value;
  } else {
    buffer += value;
  }

}
function handleSymbol(value){
  switch(value) {
    case 'C':
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case '=':
      if (previousOperator === null){
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case 'Del':
      if (buffer.length === 1) {
        buffer = "0";
      }  else {
        buffer = buffer.substring(0, buffer.length - 1);
      } 
      break;

      default:
        handleMath(value);
        break;
  } 
}

function handleMath(value){
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer ="0";
}

function flushOperation(intBuffer){
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer;
  } else if (previousOperator === 'X') {
    runningTotal *= intBuffer;
  } else { previousOperator === '/' 
    runningTotal /= intBuffer;
  }
};


function rerender() {
  screen.innerText = buffer;
  
}
document.querySelector('.numbers')
        .addEventListener('click', function(event){
          buttonClick(event.target.innerText);
})

//FAILED CODE

// let digitBtn = document.getElementsByClassName("number");
// let digitValue = document.querySelectorAll(".number")[0].value;
// let digitArray = Array.from(digitValue);

// console.log(digitArray);

// digitBtn.addEventListener('click', function(){
//   document.getElementById("result").value = ""
// })

// function myFunction(num) {
//   document.getElementById("result").value = "1";
// }