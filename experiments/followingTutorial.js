let position;
let velocity;
let acceleration;

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

    rotateY(frameCount / 20);

    beginShape();
    for (let j = 0; j < 360; j += 90) {
      let rad = i * 3;
      let x = rad * cos(j) + mouseX / 30;
      let y = rad * sin(j) + mouseY / 30;
      let z = sin(frameCount * 2 + i * 5) * 50 + mouseY / 30; // Updated Z-coordinate based on mouseY

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

function draw() {
  background(30);
  shape();
  if (position.x > width || position.x < 0) {
    velocity.x *= -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y *= -1;
  }

  const mouse = createVector(mouseX, mouseY);
  acceleration = p5.Vector.sub(mouse, position);
  acceleration.normalize();
  acceleration.mult(0.5);
  // Add the speed to the ball
  velocity.add(acceleration);
  velocity.limit(10);
  position.add(velocity);
}
}
