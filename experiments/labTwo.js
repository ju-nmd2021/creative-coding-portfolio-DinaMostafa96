let colorChangeSpeed = 10;
let currentColor;

class Element {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 4);
    this.acceleration = createVector(0, 0);
    this.size = 80;
    this.mass = 2;
  }

  applyForce(force) {
    let newForce = force.copy();
    newForce.div(this.mass);
    this.acceleration.add(newForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    fill(255, 255, 255, 1);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
  }
}

class Attractor {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 200;
    this.mass = 20;
  }

  attract(element) {
    let force = p5.Vector.sub(this.position, element.position);
    let distance = constrain(force.mag(), 5, 25);
    force.normalize();
    let m = (G * element.mass * this.mass) / (distance * distance);
    force.mult(m);
    return force;
  }

  draw() {
    if (frameCount % colorChangeSpeed === 0) {
      currentColor = color(random(255), random(255), random(255));
    }

    fill(currentColor);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
  }
}

let element;
let attractor;
let G = 1;

function setup() {
  createCanvas(innerWidth, innerHeight);
  element = new Element(100, 100);
  attractor = new Attractor(400, 300);
  currentColor = color(random(255), random(255), random(255));
}

function draw() {
  let force = attractor.attract(element);
  element.applyForce(force);
  element.update();
  element.draw();
  attractor.draw();
}
