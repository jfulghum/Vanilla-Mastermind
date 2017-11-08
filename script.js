var currentColor = null
var wrongGuesses = [];
var code = [];
var guess = [];

var COLORS = {
  'turquoise' : "rgb(64, 224, 208)",
  'black' : "rgb(0, 0, 0)",
  'purple' : "rgb(128, 0, 128)",
  'orange' : "rgb(255, 165, 0)",
  'blue' : "rgb(0, 0, 255)",
  'red' : "rgb(255, 0, 0)",
  'green' : "rgb(0, 255, 0)",
  'yellow' : "rgb(64, 224, 208)"
}

function canvasMaker(id,color){
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(25,25,25,0,2*Math.PI);
    ctx.fillStyle=color;
    ctx.fill();
    c.setAttribute("onClick","changeCursor(this)");
}

canvasMaker("canv1", "blue")
canvasMaker("canv2", "red")
canvasMaker("canv3", "green")
canvasMaker("canv4", "yellow")
canvasMaker("canv5", "turquoise")
canvasMaker("canv6", "black")
canvasMaker("canv7", "purple")
canvasMaker("canv8", "orange")

function createRow() {
  var child = document.createElement("ul");
  child.innerHTML =
  '<li class="empty"></li>' +
  '<li class="empty"></li>' +
  '<li class="empty"></li>' +
  '<li class="empty"></li>';
  return child;
}

generateCompCode();
renderEmpties();

function renderEmpties() {
  var empties = document.querySelector("#empties-placeholder");
  empties.innerHTML = "";
  for (var i = 0; i < 9-wrongGuesses.length; ++i) {
    empties.appendChild(createRow());
  }
}

function renderWrongGuesses() {
  var pastGuesses = document.querySelector("#past-guesses");
  pastGuesses.innerHTML = "";
  for (var i = 0; i < wrongGuesses.length; ++i) {
    var row = createRow();
    for (var k = 0; k < row.children.length; ++k) {
      row.children[k].classList.add(wrongGuesses[i][k]);
    }
    pastGuesses.appendChild(row);
  }
}

function render() {
  renderWrongGuesses();
  renderEmpties();
}

function changeCursor(el){
    var mywindow = document.getElementsByTagName('html');
    currentColor = el.getContext("2d").fillStyle;

    var img = el.toDataURL()
    mywindow[0].setAttribute('style', 'cursor: url('+img+') 20 20,auto;');
}

for (var i = 0; i < 4; i++){
  var element = document.getElementsByClassName('empty')[i]
  element.setAttribute("onClick", "changeColor(this)")
}

function correctSubmit(){
  var firstRow = document.getElementById("first-row").children
  var count = 0;
  for (var i = 0; i < firstRow.length; i++){
    if (firstRow[i].style.backgroundColor){
      count++;
    }
  }
  return count === 4 ? true : false;
}

function submitEvent(){
  if (correctSubmit()){
    firstRow = document.getElementById("first-row").children;
    for (var i = 0; i < firstRow.length; i++){
      guess.push(firstRow[i].style.backgroundColor);
    }
  }
}



var myBtn = document.getElementById("submitButton");
myBtn.addEventListener('click', function (event){
  console.log(correctSubmit());
  if (correctSubmit()){
    firstRow = document.getElementById("first-row").children;
    for (var i = 0; i < firstRow.length; i++){
      rgb = firstRow[i].style.backgroundColor;
      firstRow[i].style.backgroundColor = "";
      firstRow[i].style.backgroundImage = "url('wood_background2.jpg')";
      guess.push(parseCOLOR(COLORS, rgb));
    }
    codeCheck();
    wrongGuesses.push(guess);
    guess = [];
    render();
  }
});

function changeColor(el){
  el.style.background = currentColor;
}



function parseCOLOR(object, rgb){
  return Object.keys(object).find(key => object[key] === rgb);
}

function generateCompCode(){
  for (var i = 0; i < 4; i++){
    var rand = Math.floor(Math.random() * Object.keys(COLORS).length);
    code.push(Object.keys(COLORS)[rand]);
  }
  console.log("Current code is", code);
  return code;
}



function codeCheck(){
  // var exact_count = 0;
  // var near_count = 0;
  // for (var i = 0; i < code.length; i ++){
  //   if (code[i] === guess[i]){
  //     code[i] = NaN;
  //     exact_count ++;
  //     guess[i] = NaN;
  //   }
  //   if (code.includes(guess[i])){
  //     near_count ++
  //   }
  // }
  // near_count = Math.abs(near_count - exact_count)
  // return [exact_count, near_count];
}
