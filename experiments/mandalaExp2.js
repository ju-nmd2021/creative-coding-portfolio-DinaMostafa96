let x1, x2, y2, x3, y3, x4;
let pedals = 30;
let angles;
let layers = 20;

let type = 1; // 1 for complex see-through, 2 for solid
let rate = 0.5; // rate of pedal change 0.5
let hueyD = 1.4; // rate of color change 1.4
let fr = 24; // framerate 24
let chance = 0.1; // chance in 10 of reversal 0.1
let array1 = [];
let newArray = [];
let paused = false;
let x1D, x2D, y2D, x3D, y3D, x4D;
let huey, sat, brt, alph, ang, currR, maxY2, maxY3, ped, lay;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(fr);
  angles = 360 / pedals;
  setupMandalaArt();
}

function setupMandalaArt() {
  for (let j = layers; j > 0; j--) {
    let ly = j / layers;
    x1 = random(185 * ly, 205 * ly);
    x4 = random(230 * ly, 245 * ly);
    x2 = random(190 * ly, 215 * ly);
    let maxX2 = x2 * tan(angles) * 0.7;
    y2 = random(5 * ly, maxX2 * ly);
    x3 = random(210 * ly, 230 * ly);
    y3 = random(5 * ly, maxX2 * ly);
    huey = random(256);
    sat = random(70, 100);
    brt = random(70, 100);
    alph = random(70, 100);
    fill(huey, sat, brt, alph);
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
      rotate(angles);
    }
  }
  newArt();
}

function newArt() {
  array1 = [];
  ped = round(random(8, 25)); // 8 to 25
  lay = random(4, 30); // 4, 40+ takes more processing
  ang = 360 / ped;

  // calculate STARTING hues and points for each layer, starting with outside petals and going inward, and save them plus directions to array
  for (let j = lay; j > 0; j--) {
    currR = (j / lay) * (width / 2);
    x1 = random(0.35 * currR, 0.45 * currR);
    x2 = random(0.5 * currR, 0.7 * currR);
    maxY2 = x2 * tan(ang) * 0.9;
    y2 = random(0.06 * currR, maxY2);
    x3 = random(x2 * 1.1, 0.85 * currR);
    maxY3 = x3 * tan(ang) * 0.9;
    y3 = random(0.06 * currR, maxY3);
    x4 = random(0.88 * currR, 0.99 * currR);
    x1D = x2D = y2D = x3D = y3D = x4D = (rate / lay) * j;
    huey = random(360);
    array1.push(
      x1,
      x2,
      y2,
      x3,
      y3,
      x4,
      x1D,
      x2D,
      y2D,
      x3D,
      y3D,
      x4D,
      huey,
      hueyD
    );
  }
  if (paused) {
    drawArt();
  }
}

function drawArt() {
  newArray = [];
  translate(innerWidth / 2, innerHeight / 2);
  background(0);

  for (let k = lay; k > 0; k--) {
    let place = (lay - k) * 14;
    let x1N = array1[place + 0];
    let x2N = array1[place + 1];
    let y2N = array1[place + 2];
    let x3N = array1[place + 3];
    let y3N = array1[place + 4];
    let x4N = array1[place + 5];
    let x1Nd = array1[place + 6];
    let x2Nd = array1[place + 7];
    let y2Nd = array1[place + 8];
    let x3Nd = array1[place + 9];
    let y3Nd = array1[place + 10];
    let x4Nd = array1[place + 11];
    let hueyN = array1[place + 12];
    let hueyNd = array1[place + 13];
    currR = (k / lay) * (width / 2);

    x1N += x1Nd;
    if (x1N < 0.35 * currR || x1N > 0.45 * currR || random(10) < chance) {
      x1Nd *= -1;
    }
    x2N += x2Nd;
    if (x2N < 0.5 * currR || x2N > 0.7 * currR || random(10) < chance) {
      x2Nd *= -1;
    }
    maxY2 = x2N * tan(ang) * 0.9;
    y2N += y2Nd;
    if (y2N < 0.06 * currR || y2N > maxY2 || random(10) < chance) {
      y2Nd *= -1;
    }
    x3N += x3Nd;
    if (x3N < x2N * 1.1 || x3N > 0.85 * currR || random(10) < chance) {
      x3Nd *= -1;
    }
    maxY3 = x3N * tan(ang) * 0.9;
    y3N += y3Nd;
    if (y3N < 0.06 * currR || y3N > maxY3 || random(10) < chance) {
      y3Nd *= -1;
    }
    x4N += x4Nd;
    if (x4N < 0.88 * currR || x4N > 0.99 * currR || random(10) < chance) {
      x4Nd *= -1;
    }
    hueyN += hueyNd;
    if (hueyN > 359) {
      hueyN = 0;
    }
    if (hueyN < 0) {
      hueyN = 359;
    }
    if (random(10) < chance) {
      hueyNd *= -1;
    }
    fill(hueyN, sat, brt, alph);
    newArray.push(
      x1N,
      x2N,
      y2N,
      x3N,
      y3N,
      x4N,
      x1Nd,
      x2Nd,
      y2Nd,
      x3Nd,
      y3Nd,
      x4Nd,
      hueyN,
      hueyNd
    );
    for (let i = 0; i < pedals; i++) {
      stroke(0, 0, 0);
      beginShape();
      curveVertex(x4N, 0);
      curveVertex(x4N, 0);
      curveVertex(x3N, y3N);
      curveVertex(x2N, y2N);
      curveVertex(x1N, 0);
      curveVertex(x2N, -y2N);
      curveVertex(x3N, -y3N);
      curveVertex(x4N, 0);
      curveVertex(x4N, 0);
      endShape();
      rotate(ang);
    }
    rotate(ang / 2);
  }
  array1 = newArray;
}

function draw() {
  if (type === 1) {
    drawArt();
  } else {
    mandalaArt();
  }
}

function keyTyped() {
  if (key === "s") {
    save("myCanvas.jpg");
  }
  if (key === "n") {
    setupMandalaArt();
  }
  if (key === "p") {
    if (paused) {
      loop();
      paused = false;
    } else {
      noLoop();
      paused = true;
    }
  }
}