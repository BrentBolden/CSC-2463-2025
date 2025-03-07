let synth1, filt, rev, polySynth, vibrato, freqSlider, delSlider

let activeKey = null

let keyNotes1 = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
createCanvas(400, 400);  

filt = new Tone.Filter(1500, 'lowpass').toDestination()
rev = new Tone.Reverb(2).connect(filt)
vibrato = new Tone.Vibrato(0, 0).connect(rev)

polySynth = new Tone.PolySynth(Tone.Synth).connect(vibrato)
polySynth.set({
    envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.9,
    release: 0.3
  },

  oscillator: {
    type: 'triangle'
  }
})
polySynth.volume.value = -6



freqSlider = createSlider(0, 5, 0, 1);
freqSlider.position(width/2, height/2);
freqSlider.input(() => {vibrato.frequency.value = freqSlider.value()})

depthSlider = createSlider(0, 1, 0, 0.01);
depthSlider.position(width/2 - 200, height/2);
depthSlider.input(() => {vibrato.depth.value = depthSlider.value()})

}

function draw() {
  background(220);
  textAlign(CENTER)
  text("Use the keyboard keys to play notes in an ocatave from C4 to C5.", width/2 , height/2 -100)
  text("Use the sliders to change the vibrato frequency and depth.", width/2, height/2 - 80)
  text("[C4] = a, [D4] = s, [E4] = d, [F4] = f, [G4] = g, [A4] = h, [B4] = j, [C5] = k", width/2, height/2 - 60)
  textAlign(LEFT)
  text("Vibrato Depth: " + depthSlider.value(), width/2 -200, height/2 -10)
  text("Vibrato Frequency: " + freqSlider.value(), width/2, height/2 -10)
}

function keyPressed(){
  let pitch1 = keyNotes1[key]
    if (pitch1){
      polySynth.triggerAttack(pitch1)
  }

}

function keyReleased() {
  let pitch1 = keyNotes1[key]
  if (pitch1){
    polySynth.triggerRelease(pitch1)
  }
}