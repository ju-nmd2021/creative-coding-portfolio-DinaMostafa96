// INSPO: https://www.youtube.com/watch?v=vmhRlDyPHMQ&list=PLwUlLzAS3RYow0T9ZXB0IomwB-DyBRTfm
let player;
let oscillator;
let analyser;

window.addEventListener("load", () => {
  player = new Tone.Player("assets/sound.mp3");
  oscillator = new Tone.Oscillator(440, "sine").toDestination();

  analyser = new Tone.Analyser("fft", 4096);

  oscillator.connect(analyser);
  oscillator.toDestination();
  player.connect(analyser);
  player.toDestination();
});

window.addEventListener("click", () => {
  player.start();
  // oscillator.start();
});

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
    for (let j = 0; j < 360; j += 80) {
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
