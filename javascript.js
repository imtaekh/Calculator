var numButton = document.querySelectorAll(".num");
var display = document.querySelector(".display .inner p");
var addButton = document.querySelector(".add");
var subtractButton = document.querySelector(".subtract");
var multiplyButton = document.querySelector(".multiply");
var divideButton = document.querySelector(".divide");
var clearButton = document.querySelector(".clear");
var equalButton = document.querySelector(".equal");
var dotButton = document.querySelector(".dot");

clearButton.addEventListener("click",clear);
for(var i=0; i<numButton.length; i++){
  numButton[i].value=i+1+"";
  if(i==9) {numButton[i].value="0";}
  numButton[i].addEventListener("click",hitNum);
}
addButton.addEventListener("click",operator);
addButton.operator="+";
subtractButton.addEventListener("click",operator);
subtractButton.operator="-";
multiplyButton.addEventListener("click",operator);
multiplyButton.operator="*";
divideButton.addEventListener("click",operator);
divideButton.operator="/";

var calData={
  MAXLENGTH: 10,
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


function clear(){
  calData.reset();
  display.innerText= "0";
}

function hitNum(){
  if(calData.length<calData.MAXLENGTH){
    if(calData.length!==0) display.innerText = display.innerText+this.value;
    else display.innerText =this.value;
    calData.length++;

    if(calData.length==1&&this.value=="0"){
      calData.length=0;
    }
  }
}

dotButton.addEventListener("click",function(){
  if(calData.length===0){
    display.innerText ="0.";
    calData.length=2;
  } else if(calData.length<calData.MAXLENGTH-1&&display.innerText.split("").every(function(element, i, arry){return element != "."})){
    display.innerText = display.innerText+".";
    calData.length++;
  }
});


function operator(){
  if(display.innerText){
    calData.operators[calData.count]=this.operator;
    addData();
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

equalButton.addEventListener("click",equal);

function equal(){
  calData.operators[calData.count]="=";
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
  clear();

  var finalResult = result;
  result= result.toString();
  if(result.length>10){
    wholeNum = result.split(".");
    if(wholeNum[0].length>10){
      finalResult = "too long";
    } else {
      finalResult = Number(result).toFixed(9-wholeNum[0].length);
      finalResult = Number(finalResult);
    }
  }
  display.innerText=finalResult;
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
