var currentColor = null
var wrongGuesses = [];
var code = [];
var guess = [];

var COLORS = {
  'turquoise' : "#40e0d0",
  'black' : "#000000",
  'purple' : "#800080",
  'orange' : "#ffa500",
  'blue' : "#0000ff",
  'red' : "#ff0000",
  'green' : "#008000",
  'yellow' : "#ffff00"
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

canvasMaker("canv1", "#0000ff")
canvasMaker("canv2", "#ff0000")
canvasMaker("canv3", "#008000")
canvasMaker("canv4", "#ffff00")
canvasMaker("canv5", "#40e0d0")
canvasMaker("canv6", "#000000")
canvasMaker("canv7", "#800080")
canvasMaker("canv8", "#ffa500")

function createRow() {
  var child = document.createElement("ul");
  child.innerHTML =
  '<li class="empty pos_0"></li>' +
  '<li class="empty pos_1"></li>' +
  '<li class="empty pos_2"></li>' +
  '<li class="empty pos_3"></li>';
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

function renderFeedback(){
  var pegs = document.querySelector("#peg-list");
}

function render() {
  renderWrongGuesses();
  renderEmpties();
  renderFeedback();
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
    if (correctSubmit()){
    firstRow = document.getElementById("first-row").children;
    for (var i = 0; i < firstRow.length; i++){
      // hex = firstRow[i].style.backgroundColor;
      firstRow[i].style.backgroundColor = "";
      firstRow[i].style.backgroundImage = "url('wood_background2.jpg')";
      // guess.push(parseCOLOR(COLORS, hex));
    }
    var guesses = []
    for (var i = 0; i < guess.length; i++){
      guesses.push(parseCOLOR(COLORS, guess[i]))
    }
    wrongGuesses.push(guesses)
    codeCheck();
    guess = [];
    render();
  }
});

function changeColor(el){
  el.style.background = currentColor;
  if (el.className === 'empty pos_0'){
    guess[0] = currentColor;
  } else if (el.className === 'empty pos_1'){
    guess[1] = currentColor;
  } else if (el.className === 'empty pos_2'){
    guess[2] = currentColor;
  } else if (el.className === 'empty pos_3'){
    guess[3] = currentColor;
  }
  // console.log(guess)
}

function parseCOLOR(object, hex){
  return Object.keys(object).find(key => object[key] === hex);
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
  var exact_count = 0;
  var near_count = 0;
  var copyGuess = Object.assign([], guess)
  var copyCode = Object.assign([], code)
  for (var i = 0; i < copyCode.length; i ++){
    if (copyCode[i] === copyGuess[i]){
      copyCode[i] = NaN;
      copyGuess[i] = NaN;
      exact_count++;
    }
    if (copyCode.includes(copyGuess[i])){
      near_count++;
    }
  }
  near_count = Math.abs(near_count - exact_count);

  // return [exact_count, near_count];
  renderPegs(exact_count, near_count)
  console.log(exact_count, near_count)
}

function renderPegs(exact_count, near_count){

}
