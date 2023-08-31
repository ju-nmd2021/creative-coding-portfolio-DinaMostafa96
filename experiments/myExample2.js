const cols = 15;
const rows = 15;
const size = 80;
const gap = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
}

function draw() {
  for (let i = 0; i < cols; i++) {
    for (let k = 0; i < rows; k++) {
      let x = i * size;
      let y = k * size;

      rect(x, y, size, size);
    }
  }
}
