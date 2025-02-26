let startContext, meow_button, delSlider, feedbackSlider, pitchSlider, tutorial = true


let pitch = new Tone.PitchShift(0, 0).toDestination()
pitch.wet.value = 0.5
  
function preload(){

 samples = new Tone.Players({
  meow: "media/meow.mp3",
  fog_horn: "media/fog-horn.mp3",
  splash: "media/splash.mp3",
  horse_gallop: "media/horse-gallop.mp3"
 }).connect(pitch) 
}

function setup() {
  createCanvas(400, 400);
  // startContext = createButton("Start Audio Context")
  // startContext.position(0, 0)
  // startContext.mousePressed(startAudioContext)
  meow_button = createButton("Play Meow Sample");
  meow_button.position(30, 30)
  fog_button = createButton("Play Fog Horn Sample");
  fog_button.position(200, 30)
  splash_button = createButton("Play Splash Sample");
  splash_button.position(30, 300)
  horse_button = createButton("Play Horse Sample");
  horse_button.position(200, 300)
  meow_button.mousePressed(() => {samples.player("meow").start()})
  fog_button.mousePressed(() => {samples.player("fog_horn").start()})
  splash_button.mousePressed(() => {samples.player("splash").start()})
  horse_button.mousePressed(() => {samples.player("horse_gallop").start()})

  delSlider = createSlider(0, 1, 0, 0.01);
  delSlider.position(width/2, height/2);
  delSlider.input(() => {pitch.delayTime.value = delSlider.value()})

  pitchSlider = createSlider(-50, 50, 0, 1);
  pitchSlider.position(width/2 - 200, height/2 + 50);
  pitchSlider.input(() => {pitch.pitch = pitchSlider.value()})

  feedbackSlider = createSlider(0, 0.99, 0, 0.01)
  feedbackSlider.position(width/2 - 200, height/2)
  feedbackSlider.input(() => {pitch.feedback.value = feedbackSlider.value()})  

}
function keyPressed(){
  if(keyCode == ENTER){
    tutorial = false
  }
}

function draw() {
  background(220);
  if(tutorial){
    textAlign(CENTER)
    text("Press the 4 buttons to play a sample.", width/2 , height/2 -100)
    text("Use the sliders to change the pitch, delay and feedback of the samples.", width/2, height/2 - 80)
    text("Press Enter to clear this message.", width/2, height/2 - 60)
    textAlign(LEFT)
  }
  text("Delay Time: " + delSlider.value(), width/2, height/2 -10)
  text("Pitch: " + pitchSlider.value(), width/2 - 200, height/2 + 40)
  text("Feedback Amount: " + feedbackSlider.value(), width/2 - 200, height/2 -10)
}

// function startAudioContext(){
//   if(Tone.context.state != "running"){
//     Tone.start();
//     console.log("Audio Context Started")
//   }
//   else{
//     console.log("Audio Context is already running.")
//   }
// }

