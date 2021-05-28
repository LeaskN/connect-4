// Start with completing lines 2-20, then go on to clicked
let playerTurn = document.querySelector('.player-turn');
let width = 7;
let height = 6;
let boxes = document.querySelectorAll('.box');
let game = document.getElementById('game');
let gameState = [];
let currentPlayer = "X";
let gameActive = true;
playerTurn.innerHTML = currentPlayer + "'s turn";

function createGame(){
  for(let i = 0; i < width*height; i++){
    let currentBox = document.createElement('div');
    currentBox.setAttribute('id', i+1);
    currentBox.setAttribute('class', 'box');
    currentBox.addEventListener('click', clicked)
    game.prepend(currentBox);
  }  
  for(let i = 0; i < height; i++){
    gameState.push([]);
    for(let j = 0; j < width; j++){
      gameState[i].push('')
    }
  }
}


function fillBox(clickedCell){
  let bottom = isBelowEmpty(clickedCell.id);
  document.getElementById(bottom).innerHTML = currentPlayer;
  let row = bottom % width !== 0 ? Math.ceil(bottom/width) : bottom/width;
  let col = bottom % 7 === 0 ? bottom % 7 + width : bottom % 7;
  gameState[row-1][col-1] = currentPlayer;
}

function isBelowEmpty(id){
  if(id > width && document.getElementById(id-width).innerHTML == ''){
    return isBelowEmpty(id-width);
  } else {
    return id;
  }
}

function playerChange(){
  if(currentPlayer === 'X'){
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  
  playerTurn.innerHTML = currentPlayer + "'s turn";
}

function restart(){
  gameState = [];
  game.innerHTML = '';
  createGame();
  boxes.forEach(box => {box.innerHTML = ""; box.style.backgroundColor = 'transparent'});
  currentPlayer='X';
  playerTurn.innerHTML = currentPlayer + "'s turn";
  gameActive = true;
}

function checkHorizontal(row){
  //checkForFourInARow(row)
  for(let i = 0; i < row.length; i++){
    if(row[i] === ''){continue}
    if(row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3]){
      playerTurn.innerHTML = row[i] + ' wins!'
      gameActive = false;
    }
  }
}

function checkVertical(col){
  let currentCol = gameState.map(row => row[col]);
  // checkForFourInARow(currentCol);
  for(let i = 0; i < currentCol.length; i++){
    if(currentCol[i] === ''){continue}
    if(currentCol[i] === currentCol[i+1] && currentCol[i] === currentCol[i+2] && currentCol[i] === currentCol[i+3]){
      playerTurn.innerHTML = currentCol[i] + ' wins!'
      gameActive = false;
    }
  }
}

function checkDiagonalLeft(col){
  console.log(col)
  let currentArr = gameState.map((row, i) => {
    return row[col + i];
  });
  console.log(currentArr)
  for(let i = 0; i < currentArr.length; i++){
    if(currentArr[i] === '' ||  currentArr[i] === undefined){continue}
    if(currentArr[i] === currentArr[i+1] && currentArr[i] === currentArr[i+2] && currentArr[i] === currentArr[i+3]){
      playerTurn.innerHTML = currentArr[i] + ' wins!'
      gameActive = false;
    }
  }
}

function checkDiagonalRight(col){
  console.log(col)
  let currentArr = gameState.map((row, i) => {
    return row[col - i];
  });
  console.log(currentArr)
  for(let i = 0; i < currentArr.length; i++){
    if(currentArr[i] === '' ||  currentArr[i] === undefined){continue}
    if(currentArr[i] === currentArr[i+1] && currentArr[i] === currentArr[i+2] && currentArr[i] === currentArr[i+3]){
      playerTurn.innerHTML = currentArr[i] + ' wins!'
      gameActive = false;
    }
  }
}


function checkForWinner(){

  for(let i = 0; i < gameState.length; i++){
    let row = gameState[i];
    for(let j = 0; j < row.length; j++){
      let current = row[j];
      if(current === ''){continue;}
      checkHorizontal(row);
      checkVertical(j);
      checkDiagonalRight(j);
      checkDiagonalLeft(j);
    }
  }
}

createGame();

function clicked(e){
  // the following line should be one of the LAST items completed
  if(gameActive === false){return};
  // the following condition should be one of the LAST items completed
  if(e.target.innerHTML === ''){
  // the following line should be one of the FIRST items completed
    fillBox(e.target);
    playerChange();
    checkForWinner();  
  }
}