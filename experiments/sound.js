let player;
let oscillator;
let analyser;

window.addEventListener("load", () => {
  player = new Tone.Player("path/to/your/file.mp3");
  oscillator = new Tone.Oscillator(440, "sine").toDestination();

  analyser = new Tone.Analyser("fft", 4096);

  oscillator.connect(analyser);
  oscillator.toDestination();
  player.connect(analyser);
  player.toDestination();
});

window.addEventListener("click", () => {
  // player.start();
  oscillator.start();
});

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(255, 255, 255);
  let value = analyser.getValue();
  for (let i = 0; i < value.length; i++) {
    let v = map(value[i], -100, 0, height, 0);
    rect(i * 1, 0, 1, v); // waveform: * 100
  }
}
