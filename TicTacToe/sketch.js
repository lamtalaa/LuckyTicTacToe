let players = ['X', 'O'];
let spot = [
  ['','',''],
  ['','',''],
  ['','','']
];

let chosenPlayer;

let screenState = 0;

fillGrid();

function setup() {
  // put setup code here
  createCanvas(600,800);

  startButton = createButton('Click to Start');
  startButton.position(width/2.45, height/2);
  startButton.size(110,30);
  startButton.mousePressed(startButtonClicked);
  startButton.hide();

  replayButton = createButton('Replay');
  replayButton.position(380, 626);
  replayButton.size(90,30);
  replayButton.mousePressed(replayButtonClicked);
  replayButton.hide();

  X_Button = createButton('X');
  X_Button.position(300,626);
  X_Button.size(90,30);
  X_Button.mousePressed(X_ButtonClicked);
  X_Button.hide();

  O_Button = createButton('O');
  O_Button.position(400,626);
  O_Button.size(90,30);
  O_Button.mousePressed(O_ButtonClicked);
  O_Button.hide();
}

function startButtonClicked() {
  screenState = 1;
  startButton.hide();
}

function replayButtonClicked() {
  screenState = 1;
  fillGrid();
  replayButton.hide();
}

function X_ButtonClicked() {
  screenState = 2;
  chosenPlayer = 'X';
  X_Button.hide();
  O_Button.hide();
}

function O_ButtonClicked() {
  screenState = 2;
  chosenPlayer = 'O';
  O_Button.hide();
  X_Button.hide();
}

function draw() {
  // put drawing code here
  if (screenState == 0) {
    welcomeScreen();
  } else if (screenState == 1) {
    startGame();
  } else if (screenState == 2) {
    gameRunning();
  }
}

function welcomeScreen() {
  background(220);

  startButton.show();

  fill(165,42,42);
  textSize(40);
  text("Welcome to", width / 3, height / 4);
  text("Lucky Tic-Tac-Toe", width / 4, height / 3);
}

function startGame() {
  background(220);

  let w = width / 3;
  let h = (height - 200) / 3;
  textSize(32);
  strokeWeight(4);
  drawGrid(w,h);
  X_Button.show();
  O_Button.show();

  fill(165,42,42);
  textSize(30);
  text("Pick a Player:", 60, 650)
}

function gameRunning() {
  background(220);
  replayButton.show();
  
  let w = width / 3;
  let h = (height - 200) / 3;

  drawGrid(w,h);

  textSize(32);
  strokeWeight(4);
  
  for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
      if (spot[i][j] == players[0]) {
        drawX(i,j,w,h);
      } else if (spot[i][j] == players[1]) {
        drawO(i,j,w,h);
      }
    }
  }
  fill(165,42,42);
  textSize(30);
  pickTheWinner(chosenPlayer);
}

function fillGrid() {
  for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
      let randomPlayer = Math.floor(Math.random()*players.length);
      spot[i][j] = players[randomPlayer];
    }
  }
}

function drawX(i,j,w,h) {
  let x = w * i + w/2;
  let y = h * j + h/2;
  let xr = w/4;
  line(x-xr, y-xr, x+xr, y+xr);
  line(x+xr, y-xr, x-xr, y+xr);
}

function drawO(i,j,w,h) {
  let x = w * i + w/2;
  let y = h * j + h/2;
  noFill();
  ellipse(x,y,w/2);
}

function drawGrid(w,h) {
  line(w,0,w,height-200);
  line(w*2,0,w*2,height-200);
  line(0,h,width,h);
  line(0,h*2,width,h*2);
  line(0,h*3,width,h*3);
}

function pickTheWinner(chosenPlayer) {
  if((((spot[0][0] == 'X' && spot[0][1] == 'X' && spot[0][2] == 'X') ||
      (spot[1][0] == 'X' && spot[1][1] == 'X' && spot[1][2] == 'X') ||
      (spot[2][0] == 'X' && spot[2][1] == 'X' && spot[2][2] == 'X') ||
      (spot[0][0] == 'X' && spot[1][0] == 'X' && spot[2][0] == 'X') ||
      (spot[0][1] == 'X' && spot[1][1] == 'X' && spot[2][1] == 'X') ||
      (spot[0][2] == 'X' && spot[1][2] == 'X' && spot[2][2] == 'X') ||
      (spot[0][0] == 'X' && spot[1][1] == 'X' && spot[2][2] == 'X') ||
      (spot[0][2] == 'X' && spot[1][1] == 'X' && spot[2][0] == 'X'))
      && chosenPlayer == 'X') ||
      (((spot[0][0] == 'O' && spot[0][1] == 'O' && spot[0][2] == 'O') ||
      (spot[1][0] == 'O' && spot[1][1] == 'O' && spot[1][2] == 'O') ||
      (spot[2][0] == 'O' && spot[2][1] == 'O' && spot[2][2] == 'O') ||
      (spot[0][0] == 'O' && spot[1][0] == 'O' && spot[2][0] == 'O') ||
      (spot[0][1] == 'O' && spot[1][1] == 'O' && spot[2][1] == 'O') ||
      (spot[0][2] == 'O' && spot[1][2] == 'O' && spot[2][2] == 'O') ||
      (spot[0][0] == 'O' && spot[1][1] == 'O' && spot[2][2] == 'O') ||
      (spot[0][2] == 'O' && spot[1][1] == 'O' && spot[2][0] == 'O'))
      && chosenPlayer == 'O')) {
        text("Congrats, you Won!", 60, 650);
  } else {
    text("Sorry, you did not Win!", 60, 650);
  }
}