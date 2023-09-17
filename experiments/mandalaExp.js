let x1, x2, y2, x3, y3, x4;
let pedals = 30;
let angles;

function setup() {
  createCanvas(500, 500);

  background(0);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  translate(250, 250);
  angles = 360 / pedals;
  x1 = random(185, 205);
  x4 = random(230, 245);
  x2 = random(190, 215);
  let maxX2 = x2 * tan(angles) * 0.8;
  y2 = random(5, maxX2);
  x3 = random(210, 230);
  y3 = random(5, maxX2);
  hue = random(256);
  sat = random(70, 100);
  brt = random(70, 100);
  alph = random(70, 100);
  fill(hue, sat, brt, alph);
  for (let i = 0; i < pedals; i++) {
    stroke(0, 0, 0);
    beginShape();
    curveVertex(x1, 0);
    curveVertex(x1, 0);
    curveVertex(x2, y2);
    curveVertex(x3, y3);
    curveVertex(x4, 0);
    curveVertex(x4, 0);
    endShape();

    beginShape();
    curveVertex(x1, 0);
    curveVertex(x1, 0);
    curveVertex(x2, -y2);
    curveVertex(x3, -y3);
    curveVertex(x4, 0);
    curveVertex(x4, 0);
    endShape();
    // stroke(hue, sat, brt, alph);
    // line(x1, 0, x4, 0);

    rotate(angles);
  }
}
