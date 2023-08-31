const cols = 15; // Number of columns
const rows = 15; // Number of rows
const size = 70; // Size of each square
const gap = 10; // Gap between squares
const centerX = innerWidth / 2;
const centerY = innerHeight / 2;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(250, 246, 192);
  noLoop();
}

function draw() {
  drawGrid();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * (size + gap);
      let y = j * (size + gap);

      if (Math.random() > 0.7) {
        strokeWeight(1);
        fill(random(255), random(255), random(255));
        rect(x, y, size, size);
      }

      const circleX = x + size / 2;
      const circleY = y + size / 2;
      const circleSize = size * 0.6;
      fill(250, 246, 192);
      ellipse(circleX, circleY, circleSize);
    }
  }
}
function mouseClicked() {
  drawGrid();
}
