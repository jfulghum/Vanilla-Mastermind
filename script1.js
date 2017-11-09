var currentColor = null
var wrongGuesses = [];
var answer = [];
var guess = [];
var newGuessArray = []


var colors = [
  "#40e0d0",
  "#000000",
  "#800080",
  "#ffa500",
  "#0000ff",
  "#ff0000",
  "#008000",
  "#ffff00"
]

function createColorChoiceElement(id,color){
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(25,25,25,0,2*Math.PI);
    ctx.fillStyle=color;
    ctx.fill();
    c.setAttribute("onClick","changeCursor(this)");
}

function createColorChoiceBoard(){
  for (var i =0; i<colors.length ; i++){
    createColorChoiceElement("canv" + i, colors[i])
  }
}

function generateAnswer(){
  for (var i = 0; i < 4; i++){
    var rand = Math.floor(Math.random() * colors.length);
    answer.push(colors[rand]);
  }
  console.log("Current answer is", answer);
  return answer;
}

function createRow() {
  var child = document.createElement("ul");
  child.innerHTML =
  '<li class="empty pos_0"></li>' +
  '<li class="empty pos_1"></li>' +
  '<li class="empty pos_2"></li>' +
  '<li class="empty pos_3"></li>';
  return child;
}

function createBoard(){
  var empties = document.querySelector("#empties");
  for (var i = 0; i < 10; ++i) {
    empties.appendChild(createRow());
  }
}

createColorChoiceBoard()
createBoard()
generateAnswer();
addClickHandler()

function changeCursor(el){
    var mywindow = document.getElementsByTagName('html');
    currentColor = el.getContext("2d").fillStyle;
    var img = el.toDataURL()
    mywindow[0].setAttribute('style', 'cursor: url('+img+') 20 20,auto;');
}

function addClickHandler(){
  for (var i = 0; i < 4; i++){
    var element = document.getElementsByClassName('empty')[i]
    element.setAttribute("onClick", "changeColor(this)")
  }
}

function removeClickHandler(){
  var peg = document.getElementsByClassName('peg')
  for (var i = 0; i < peg.length; i++){
  peg[i].removeAttribute("onClick", "changeColor(this)")
  }
}

function checkWin(){
    if (guess.length === 4){
    var guesses = []
      for (var i = 0; i < guess.length; i++){
        guesses.push(guess[i])
      }
    wrongGuesses.push(guesses)
   
    newGuessArray = guesses;
    answerCheck();
    guess = [];
    addClickHandler()
    removeClickHandler()
  }
};

function changeColor(el){
  el.classList.remove("empty");
  el.classList.add("peg")
  if (el.className === 'pos_0 peg'){
    guess[0] = currentColor;
  } else if (el.className === 'pos_1 peg'){
    guess[1] = currentColor;
  } else if (el.className === 'pos_2 peg'){
    guess[2] = currentColor;
  } else if (el.className === 'pos_3 peg'){
    guess[3] = currentColor;
  }
  el.style.background = currentColor;
  console.log(guess)
}


function answerCheck(){
  var exact_count = 0;
  var near_count = 0;
  // var copyGuess = Object.assign([], newGuessArray)
  var copyAnswer = Object.assign([], answer)
  for (var i = 0; i < answer.length; i ++){
    if (copyAnswer[i] === guess[i]){ 
      guess[i]=NaN;
      copyAnswer[i]=NaN;
      exact_count++;
    }
  }
  
  for (var i = 0; i < copyAnswer.length; i ++){
    if (copyAnswer.includes(guess[i])){
      near_count++;
    }
  }

  near_count = Math.abs(near_count - exact_count);
  checkWinner(exact_count, near_count)
}

function checkWinner(exact_count, near_count){
 console.log(exact_count)
 console.log(near_count)

  if (exact_count == 4){
    alert("You WON!")
  } else if (wrongGuesses.length>=10){
    alert("You lost!")
  }else
  {
    renderPegs(exact_count, near_count)
  }
}

function renderPegs(exact_count, near_count){
  var pegs = document.querySelector("#peg-list");
}
