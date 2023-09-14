const selectedElement = document.getElementById("selected");
const sineButton = document.getElementById("sine");
const squareButton = document.getElementById("square");
const sawButton = document.getElementById("sawtooth");
const triangleButton = document.getElementById("triangle");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const slider = document.getElementById("volume");
let volume;
let oscillator;

window.addEventListener("load", () => {
  volume = new Tone.Volume().toDestination();
  volume.volume.value = (slider.value / 100) * -60;

  oscillator = new Tone.Oscillator(440, "sine").connect(volume);
});

sineButton.addEventListener("click", () => {
  oscillator.type = "sine";
  selectedElement.innerText = "Selected: Sine";
});

squareButton.addEventListener("click", () => {
  oscillator.type = "square";
  selectedElement.innerText = "Selected: Square";
});

sawButton.addEventListener("click", () => {
  oscillator.type = "sawtooth";
  selectedElement.innerText = "Selected: SawTooth";
});

triangleButton.addEventListener("click", () => {
  oscillator.type = "triangle";
  selectedElement.innerText = "Selected: Triangle";
});

slider.addEventListener("input", () => {
  volume.volume.value = (slider.value / 100) * -60;
});

startButton.addEventListener("click", () => {
  oscillator.start();
});

stopButton.addEventListener("click", () => {
  oscillator.stop();
});

window.addEventListener("click", () => {
  Tone.start();
});
