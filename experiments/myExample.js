const cols = 15;
const rows = 15;
const size = 70;
const gap = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(250, 246, 192);
  noLoop();
}

function draw() {
  drawGrid();
}

function drawGrid() {
  //grid inspired from https://codepen.io/pixelkind/pen/abPdggb

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * (size + gap);
      let y = j * (size + gap);

      if (Math.random() > 0.7) {
        push();
        strokeWeight(2);
        fill(random(255), random(255), random(255));
        rect(x, y, size, size);
        pop();
      }

      const circleX = x + size / 2;
      const circleY = y + size / 2;
      const circleSize = size * 0.6;
      fill(250, 246, 192);
      ellipse(circleX, circleY, circleSize);

      const circleX2 = x + size / 2;
      const circleY2 = y + size / 2;
      const circleSize2 = size * 0.3;
      fill(random(255), random(255), random(255));
      ellipse(circleX2, circleY2, circleSize2);
    }
  }
}
function mouseClicked() {
  drawGrid();
}
