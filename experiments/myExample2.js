let circleX = width / 2;
let circleY = height / 2;
let circleRadius = 20;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
  noFill();
  stroke(0);
}

function draw() {
  for (let i = 0; i < 5; i++) {
    drawElement(circleRadius);
    circleRadius += 100;
  }
  noLoop();
}

function drawElement(circleRadius) {
  let rectSize = circleRadius * Math.sqrt(2); // Diagonal of the square
  let rectX = circleX - rectSize / 2;
  let rectY = circleY - rectSize / 2;
  strokeWeight(1);
  ellipse(circleX, circleY, circleRadius * 2);
  strokeWeight(2);
  rect(rectX, rectY, rectSize, rectSize);
}
