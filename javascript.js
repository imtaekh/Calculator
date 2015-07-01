var display = document.querySelector(".display .inner p");
var clearButton = document.querySelector(".clear");
var numButton = document.querySelectorAll(".num");
var addButton = document.querySelector(".add");
var subtractButton = document.querySelector(".subtract");
var multiplyButton = document.querySelector(".multiply");
var divideButton = document.querySelector(".divide");
var equalButton = document.querySelector(".equal");
var dotButton = document.querySelector(".dot");

clearButton.addEventListener("click",hitClear);
for(var i=0; i<numButton.length; i++){
  numButton[i].addEventListener("click",hitNum);
}
addButton.addEventListener("click",hitOperator);
subtractButton.addEventListener("click",hitOperator);
multiplyButton.addEventListener("click",hitOperator);
divideButton.addEventListener("click",hitOperator);
equalButton.addEventListener("click",hitEqual);
dotButton.addEventListener("click",hitDot);

var calData={
  MAXLENGTH: 9,
  length: 0,
  count: 0,
  numbers: [],
  operators: [],
  reset: function(){
    calData.length= 0;
    calData.count= 0;
    calData.numbers= [];
    calData.operators= [];
  }
};

function hitClear(){
  calData.reset();
  display.innerText= "0";
}

function hitNum(){
  var num = Number(this.innerText);
  if(calData.length === 0 && num === 0){
  }else if(calData.length < calData.MAXLENGTH){
    if(calData.length !== 0) display.innerText = display.innerText+num;
    else display.innerText = num;
    calData.length++;
  }
}

function hitDot(){
  if(calData.length===0){
    display.innerText ="0.";
    calData.length=2;
  } else if(calData.length<calData.MAXLENGTH-1&&display.innerText.split("").every(function(element, i, arry){return element != ".";})){
    display.innerText = display.innerText+".";
    calData.length++;
  }
}

function addData(){
  calData.numbers[calData.count]=Number(display.innerText);
  calData.count++;
  calData.length=0;

  var soFar="";
  for(var i=0;i<calData.count;i++){
    soFar=soFar+calData.numbers[i]+calData.operators[i];
  }
  console.log(soFar);
}

function hitOperator(){
  if(display.innerText){
    calData.operators[calData.count]=this.innerText[0];
    addData();
  }
}

function hitEqual(){
  calData.operators[calData.count]="";
  addData();
  var result=calData.numbers[0];
  for(var i=1;i<calData.count;i++){
    switch(calData.operators[i-1]){
      case "+":
        result=add(result,calData.numbers[i]);
        break;
      case "-":
        result=subtract(result,calData.numbers[i]);
        break;
      case "*":
        result=multiply(result,calData.numbers[i]);
        break;
      case "/":
        result=divide(result,calData.numbers[i]);
        break;
    }
  }
  console.log("= "+result);

  //trim into less than 10 digits
  result= result.toString();
  if(result.length>10){
    var wholeNum = result.split(".");
    if(result>Math.pow(10,calData.MAXLENGTH)){
      result = "too long";
    } else {
      result = Number(Number(result).toFixed(calData.MAXLENGTH-1-wholeNum[0].length));
    }
  }

  //display the result
  display.innerText=result;
  calData.reset();
}

function add(x,y){
  return (Number(x)+Number(y));
}
function subtract(x,y){
  return (Number(x)-Number(y));
}
function multiply(x,y){
  return (Number(x)*Number(y));
}
function divide(x,y){
  return (Number(x)/Number(y));
}
