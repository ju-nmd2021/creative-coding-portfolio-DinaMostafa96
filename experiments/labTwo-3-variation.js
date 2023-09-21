let player;
let oscillator;
let analyser;

window.addEventListener("load", () => {
  player = new Tone.Player("assets/sound2.mp3");
  oscillator = new Tone.Oscillator(440, "sine").toDestination();

  analyser = new Tone.Analyser("fft", 4096);

  oscillator.connect(analyser);
  oscillator.toDestination();
  player.connect(analyser);
  player.toDestination();
});

window.addEventListener("click", () => {
  player.start();
  // oscillator.start();
});

function setup() {
  createCanvas(800, 800);
}

class Cell {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.newState = -1;
    this.size = 0;
    this.maxSize = 40;
  }

  draw() {
    if (this.state == 0) {
      fill(255, 255, 0, 55);
    } else {
      fill(255, 0, 255);
    }
    rect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}

let board = [];
// let size = 4;
let lifecycle = 2;
let count = 0;
let boardsize = 200;

for (let i = 0; i < boardsize; i++) {
  board.push([]);
  for (let j = 0; j < boardsize; j++) {
    let state = Math.round(Math.random() % 1);
    let cell = new Cell(i, j, state);
    board[i].push(cell);
  }
}

function calculateNewState(x, y) {
  // count neighbour cells
  let startX = Math.max(0, x - 1);
  let startY = Math.max(0, y - 1);
  let endX = Math.min(board.length, x + 2);
  let endY = Math.min(board[x].length, y + 2);

  let values = [];
  for (let i = startX; i < endX; i++) {
    let cells = board[i].slice(startY, endY);
    values = values.concat(cells);
  }
  // filter for 1/0
  let liveCells = values.filter((cell) => cell.state === 1);
  let currentState = board[x][y].state;
  if (liveCells.length === 3) {
    board[x][y].newState = 1;
  } else if (liveCells.length === 4) {
    board[x][y].newState = currentState;
  } else {
    board[x][y].newState = 0;
  }
  // 2 = 0
  // 4 = same
  // 3 = 1
  // >5 = 0
}

function calculateLiving() {
  let flat = board.flat();
  let mapped = flat.map((cell) => cell.state);
  let living = mapped.reduce((acc, cur) => acc + cur);
  console.log(living);
}

function draw() {
  if (count == 0) {
    noStroke();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].size < board[i][j].maxSize) {
          board[i][j].size += 1; // Increase the size in each frame, but limit to maxSize
        }
        board[i][j].draw();
        calculateNewState(i, j);
      }
    }
    calculateLiving();

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].state = board[i][j].newState;
      }
    }
  }
  count++;
  if (count == lifecycle) {
    count = 0;
  }
}
