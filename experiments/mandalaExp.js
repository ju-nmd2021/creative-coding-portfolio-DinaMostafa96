//global variable
let x1, x2, y2, x3, y3, x4;
let pedals = 30;
let angles;
let layers = 20;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100); // sets the color mode to HSB with specific ranges.
//   frameRate(1);
// }

function mandalaArt() {
  translate(innerWidth / 2, innerHeight / 2);
  angles = 360 / pedals; //calculates the angle between each petal based on the number of petals.

  for (let j = layers; j > 0; j--) {
    let ly = j / layers;

    //we sa values and randomized the padel within a range to change shapes
    x1 = random(185 * ly, 205 * ly);
    x4 = random(230 * ly, 245 * ly);
    x2 = random(190 * ly, 215 * ly);
    let maxX2 = x2 * tan(angles) * 0.7;
    y2 = random(5 * ly, maxX2 * ly);
    x3 = random(210 * ly, 230 * ly);
    y3 = random(5 * ly, maxX2 * ly);
    hue = random(256);
    sat = random(70, 100);
    brt = random(70, 100);
    alph = random(70, 100);
    fill(hue, sat, brt, alph);
    for (let i = 0; i < pedals; i++) {
      stroke(0, 0, 0);

      //to draw the padel we used curveVertex which has a starting point and end point and it can have as many
      //points in the middle to make the curve - here we have only 4 points-  here the y will always be zero(0)
      //because we want the beginging and the ending of the curve to be on the X axis

      ///the + half of the padel
      curveVertex(x1, 0);
      beginShape();
      curveVertex(x1, 0);
      curveVertex(x2, y2);
      curveVertex(x3, y3);
      curveVertex(x4, 0);
      curveVertex(x4, 0);
      endShape();
      ///the - half of the padel
      beginShape();
      curveVertex(x1, 0);
      curveVertex(x1, 0);
      curveVertex(x2, -y2);
      curveVertex(x3, -y3);
      curveVertex(x4, 0);
      curveVertex(x4, 0);
      endShape();
      rotate(angles);
    }
  }
}

function draw() {
  mandalaArt();




}
