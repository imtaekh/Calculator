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
  console.log(showProcess()+display.innerText);
}

function hitNum(){
  var num = Number(this.innerText);
  if(display.innerText[display.innerText.length-2]=="*"||display.innerText[display.innerText.length-2]=="/"){
    display.innerText = "-"+num;
    calData.length=2;
    console.log(showProcess()+display.innerText);
  }else{
    if(calData.length === 0 && num === 0){
      display.innerText = num;
    }else if(calData.length < calData.MAXLENGTH){
      if(calData.length !== 0) display.innerText = display.innerText+num;
      else display.innerText = num;
      calData.length++;
    }
    console.log(showProcess()+display.innerText);
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
  console.log(showProcess()+display.innerText);
}

function addData(){
  calData.numbers[calData.count]=Number(display.innerText);
  calData.count++;
  calData.length=0;
  console.log(showProcess());
}
function calculateData(){
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
  if(result.length>calData.MAXLENGTH){
    var wholeNum = result.split(".");
    if(Math.abs(result) > Math.pow(10,calData.MAXLENGTH-(result>0?0:1))-1){
      result = "too long";
    } else {
      result = Number(Number(result).toFixed(calData.MAXLENGTH-1-wholeNum[0].length));
    }
  }
  return result;
}

function hitOperator(){
  var operator=this.innerText[0];
    switch (display.innerText[display.innerText.length-1]){
      case "+":
        if(display.innerText&&display.innerText!=0){
          calData.operators[calData.count-1]=operator;
          display.innerText=calculateData()+operator;
          console.log(showProcess());
        }
        break;
      case "-":
        if(display.innerText&&display.innerText!=0&&calData.count>0){
            calData.operators[calData.count-1]=operator;
            display.innerText=calculateData()+operator;
            console.log(showProcess());

        } else if(operator==="+"){
          display.innerText="0";
        }
        break;
      case "*":
      case "/":
        if(display.innerText&&display.innerText!=0){
          if(operator=="-"){
            display.innerText=display.innerText+"-";
          } else{
            calData.operators[calData.count-1]=operator;
            display.innerText=calculateData()+operator;
            console.log(showProcess());
          }
        }
        break;
      default:
        if(display.innerText&&display.innerText!=0){
          calData.operators[calData.count]=operator;
          addData();
          display.innerText=calculateData()+calData.operators[calData.count-1];
        } else if(operator==="-"){
          display.innerText="-";
          calData.length++;
          console.log("-");
        }
    }
}

function hitEqual(){
  if(calData.count===0&&display.innerText=="-"){
    display.innerText=0;
  } else {
    switch (display.innerText[display.innerText.length-1]){
      case "+":
      case "-":
      case "*":
      case "/":
        display.innerText=calData.numbers[calData.count-1];
        break;
      default:
        calData.operators[calData.count]="";
        addData();
    }
    display.innerText=calculateData();
    calData.reset();
  }
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

function showProcess(){
  var soFar="";
  for(var i=0;i<calData.count;i++){
    soFar=soFar+calData.numbers[i]+calData.operators[i];
  }
  return soFar;
}
