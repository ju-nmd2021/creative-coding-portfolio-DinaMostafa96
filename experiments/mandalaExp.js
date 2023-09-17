let x1, x2, y2, x3, y3, x4;
let pedals;

function setup() {
  createCanvas(500, 500);

  background(0);
  angleMode(DEGREES);
  translate(250, 250);
  pedals = 30;
  x1 = random(185, 205);
  x4 = random(230, 245);
  x2 = random(190, 215);
  y2 = random(5, 100);
  x3 = random(210, 230);
  y3 = random(5, 100);

  for (let i = 0; i < 360 / pedals; i++) beginShape();
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

  rotate(pedals);
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
}
