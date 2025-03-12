let basicSynth, filter, marioSwim, currentState = "text";



function preload(){
  marioSwim = loadImage("mario_swim.png");
}
function setup() {
  createCanvas(778, 527);
  filt = new Tone.Filter(300, "lowpass",-48).toDestination();
  basicSynth = new Tone.Synth().connect(filt);
  textAlign(CENTER)
}

function draw() {
  background(220);
  switch(currentState){
    case "swim":
    image(marioSwim, 0, 0);
    setTimeout(changeStateText, 300);
    break;
    case "text":
    text("Click the canvas to make Mario swim!", width/2 , height/2);
    break;

  }

}

function mouseClicked(){
  basicSynth.frequency.rampTo(500, 0.3);
  basicSynth.triggerAttackRelease(100, 0.3);
  currentState = "swim";
}

function changeStateText(){
  currentState = "text"
}