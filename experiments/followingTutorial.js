// INSPO: https://www.youtube.com/watch?v=vmhRlDyPHMQ&list=PLwUlLzAS3RYow0T9ZXB0IomwB-DyBRTfm

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  position = createVector(100, 100);
  velocity = createVector(5, 8);
  angleMode(DEGREES);
}

function shape() {
  rotateY(60);
  noFill();

  for (let i = 0; i < 50; i++) {
    let r = map(sin(frameCount / 2), -1, 1, 100, 200);
    let g = map(i, 0, 50, 100, 200);
    let b = map(cos(frameCount / 2), -1, 1, 200, 100);

    stroke(r, g, b);

    rotateZ(frameCount / 20);

    beginShape();
    for (let j = 0; j < 360; j += 90) {
      let rad = i * 3;
      let x = rad * cos(j);
      let y = rad * sin(j) + mouseY;
      let z = sin(frameCount * 2 + i * 5) * 50;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

function draw() {
  background(30);
  shape();
}
