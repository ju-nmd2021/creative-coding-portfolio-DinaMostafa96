let x1, x2, y2, x3, y3, x4;
let pedals = 30;
let angles;
let layers = 20;

function mandalaArt(handSize) {
  // Pass the hand size as a parameter
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
      //because we want the beginning and the ending of the curve to be on the X axis

      ///the + half of the padel
      curveVertex(x1 * handSize, 0); // Multiply x1 by handSize to control the size
      beginShape();
      curveVertex(x1 * handSize, 0); // Multiply x1 by handSize to control the size
      curveVertex(x2 * handSize, y2 * handSize); // Multiply x2 and y2 by handSize to control the size
      curveVertex(x3 * handSize, y3 * handSize); // Multiply x3 and y3 by handSize to control the size
      curveVertex(x4 * handSize, 0); // Multiply x4 by handSize to control the size
      curveVertex(x4 * handSize, 0); // Multiply x4 by handSize to control the size
      endShape();
      ///the - half of the padel
      beginShape();
      curveVertex(x1 * handSize, 0); // Multiply x1 by handSize to control the size
      curveVertex(x1 * handSize, 0); // Multiply x1 by handSize to control the size
      curveVertex(x2 * handSize, -y2 * handSize); // Multiply x2 and y2 by handSize to control the size
      curveVertex(x3 * handSize, -y3 * handSize); // Multiply x3 and y3 by handSize to control the size
      curveVertex(x4 * handSize, 0); // Multiply x4 by handSize to control the size
      curveVertex(x4 * handSize, 0); // Multiply x4 by handSize to control the size
      endShape();
      rotate(angles);
    }
  }
}

let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  video = createCapture(VIDEO);
  video.size(innerWidth, innerHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100); // sets the color mode to HSB with specific ranges.
  frameRate(30);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  // image(video, 0, 0, width, height);
  // mandalaArt();
  background(255);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();

  if (predictions.length > 0) {
    let landmarks = predictions[0].landmarks;

    // Calculate the distance between two key points (e.g., thumb tip and index tip)
    let thumbX = landmarks[4][0];
    let thumbY = landmarks[4][1];
    let indexX = landmarks[8][0];
    let indexY = landmarks[8][1];

    let currentThumbX = thumbX;
    let currentIndexX = indexX;

    let currentThumbY = thumbY;
    let currentIndexY = indexY;

    currentIndexX += (indexX - currentIndexX) / 5;
    currentThumbX += (thumbX - currentThumbX) / 5;

    currentIndexY += (indexY - currentIndexY) / 5;
    currentThumbY += (thumbY - currentThumbY) / 5;

    let distance = dist(
      currentThumbX,
      currentThumbY,
      currentIndexX,
      currentIndexY
    );

    // let smoothDistance =

    // Map the distance to control the size of the mandala
    let mandalaSize = map(distance, 0, 100, 0.2, 2.0); // Adjust the range as needed

    // Call the mandalaArt function with the hand size
    mandalaArt(mandalaSize);
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
