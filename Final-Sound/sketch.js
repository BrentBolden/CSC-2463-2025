/*
* This game will spawn many bugs across the screen. Each bug will walk in a random direction until they get to the end of the screen.
*When they get to the end of the screen they will wrap round to the other end. The player will have to squish the bugs as they crawl around the screen.
*The bugs will also start to move faster as the player squishes more of them. A timer will count down from 30 seconds and end the game after it reaches 0.
*The game will display the player's score along with their high score and ask if they want to play again.
*/
let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
})

let gameState = GameStates.START;
let score = 0;
let highscore = 0;
let time = 30;
let textPadding = 15;
let bugs = [];
let numBugs = 0;
let bugSpriteSheet;
let baseSpeed = 25;
let globalSpeed = baseSpeed;
let speedModifier = 20;
let spriteWidth = 64;
let isMousePressed = false;
let screenWrapOffset = 32;
let anyBugSquished = false;
let musicSynth;
let bugSquishSFX;
let bugMissSFX;
let musicStart = false;
let titleJingle;
let gameOverTheme;
let gameOverSynth;
let mainTheme;

function preload(){ 
  bugSpriteSheet = loadImage("assets/sprites/bug_sprites.png");
}

function setup() {
  createCanvas(600, 600);
  bugSquishSFX = new Tone.Synth().toDestination();
  bugMissSFX = new Tone.Synth().toDestination();
  musicSynth = new Tone.PolySynth(Tone.Synth).toDestination();
  createRandomBugs(10);
  if(Tone.context.state != "running"){
    Tone.start();
  }

titleJingle = new Tone.Part(((time, note) => {
  musicSynth.triggerAttackRelease(note, "4n", time);
}), [
  [0, "F5"],
  ["0:1", "D5"],
  ["0:2", "E5"],
  ["0:3", "G5"],
  ["0:3:2", "A5"],
  ["0:4", "B5"],
  ["0:5", "G5"],
  ["0:5:2", "A5"],
  ["0:6", "G5"]
]);

mainTheme = new Tone.Part(((time, note) => {
  musicSynth.triggerAttackRelease(note, "4n", time);
}), [
  [0, "D5"],
  ["0:1", "B5"],
  ["0:1:2", "C6"],
  ["0:3", "B5"],
  ["0:3:2", "C6"],

  ["0:4", "D6"],
  ["0:5", "E6"],

  ["0:8", "D5"],
  ["0:9", "B5"],
  ["0:9:2", "C6"],
  ["0:11", "B5"],
  ["0:11:2", "C6"],

  ["0:12", "B5"],
  ["0:12:2", "D6"],
  ["0:13", "E6"],
  ["0:14", "G6"],
  ["0:15", "F#6"],
]);

gameOverTheme = new Tone.Part(((time, note) => {
  musicSynth.triggerAttackRelease(note, "4n", time);
}), [
  [0, "E5"],
  ["0:1", "G5"],
  ["0:2", "F5"],
  ["0:2:2", "D#5"],
  ["0:3", "G5"],
  ["0:4", "C5"],

]);



Tone.Transport.start();
Tone.Transport.bpm.value = 120;
gameOverTheme.start(Tone.now());
mainTheme.loop = true;
mainTheme.loopEnd = "4m";


}


function draw() {
  background(220);

  switch(gameState){
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Press ENTER to Start", width/2, height/2);
      break;
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Bugs Squished: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);
      time -= deltaTime / 1000;
      drawBugs(); 
      if (time <= 0){
        mainTheme.stop();
        Tone.Transport.bpm.value = 120;
        gameOverTheme.start(Tone.now());
        gameState = GameStates.END;
      }

      break;
    case GameStates.END:
      textAlign(CENTER, CENTER);
      text("Game Over!", width/2, height/2 - 20);
      text("Bugs Squished: " + score, width/2, height/2);
      break;
  }
}

function keyPressed() {
  switch(gameState) {
    case GameStates.START:
      if(keyCode == ENTER){
        titleJingle.stop();
        Tone.Transport.bpm.rampTo(360, 30);
        mainTheme.start(Tone.now());
        gameState = GameStates.PLAY;
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      break;
  }
}

function addBug(x, y, dirX, dirY, size, spritesheet){
  this.x = x;
  this.y = y;
  this.dirX = dirX;
  this.dirY = dirY;
  this.size = size;
  this.spritesheet = spritesheet

  bugs.push(new Bug(this.x, this.y, this.dirX, this.dirY, this.size));
  bugs[numBugs].addAnimation("walk", new SpriteAnimation(this.spritesheet, 0, 0, 64, 64, this.dirX, this.dirY, 6));
  bugs[numBugs].addAnimation("dying", new SpriteAnimation(this.spritesheet, 0, 1, 64, 64, this.dirX, this.dirY, 1));
  bugs[numBugs].addAnimation("dead", new SpriteAnimation(this.spritesheet, 1, 1, 64, 64, this.dirX, this.dirY, 1));
  numBugs++;
}

function createRandomBugs(amount){
  for(let i = 0; i < amount; i++){
    addRandomBug(spriteWidth, bugSpriteSheet)
  }
}

function addRandomBug(size, spritesheet){
 this.randX = Math.floor(Math.random() * width - 16) + 16
 this.randY = Math.floor(Math.random() * height - 16) + 16
 this.randDir = Math.floor(Math.random() * 4)
 this.directionX = 0;
 this.directionY = 0;
 
  switch(this.randDir){
    case 0:
     this.directionX = -1;
     this.directionY = 0; 
    break;
    case 1:
      this.directionX = 1;
      this.directionY = 0; 
     break;
     case 2:
      this.directionX = 0;
      this.directionY = 1; 
     break;
     case 3:
      this.directionX = 0;
      this.directionY = -1; 
     break;
  }

 this.size = size;
 this.spritesheet = spritesheet

 bugs.push(new Bug(this.randX, this.randY, this.directionX, this.directionY, this.size));
 bugs[numBugs].addAnimation("walk", new SpriteAnimation(this.spritesheet, 0, 0, 64, 64, this.directionX, this.directionY, 6));
 bugs[numBugs].addAnimation("dying", new SpriteAnimation(this.spritesheet, 0, 1, 64, 64, this.directionX, this.directionY, 1));
 bugs[numBugs].addAnimation("dead", new SpriteAnimation(this.spritesheet, 1, 1, 64, 64, this.directionX, this.directionY, 1));
 numBugs++;

}

function drawBugs(){
  for(let i = 0; i < numBugs; i++){
    bugs[i].draw();
  }
}

function mousePressed(){
  if(gameState == GameStates.PLAY){
    for(let i = 0; i < numBugs; i++){
    bugs[i].checkIfPressed(i);
    }
    if(anyBugSquished == false){
      bugMissSFX.triggerAttackRelease(300, 0.1);
    }
    anyBugSquished = false;
}

}

function mouseReleased(){
  isMousePressed = false;
}
class Bug {


  constructor(x, y, dirX, dirY, size) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
    this.currentState;
    this.isAlive = true;
    this.dirX = dirX;
    this.dirY = dirY;
    this.hitboxSize = size / 2;
    this.hitboxX = this.x - 16
    this.hitboxY = this.y - 16
    this.is_debug = false;
    this.deathTimer = 3;
  }

  addAnimation(key, animation){
    this.animations[key] = animation;
  }

  draw() {
    this.hitboxX = this.x - 16
    this.hitboxY = this.y - 16
    let animation = this.animations[this.currentAnimation]

    switch(this.isAlive){
      case true:
        this.checkScreenWrapping();
        this.currentAnimation = "walk";
        this.x += globalSpeed * this.dirX * deltaTime / 1000;
        this.y += globalSpeed * this.dirY * deltaTime / 1000;
        break;
      case false:
        if(this.deathTimer > 0){
          this.currentAnimation = "dying";
          this.deathTimer -= deltaTime / 1000
        }
        else
          this.currentAnimation = "dead"
          
        break;
    }

    if (animation) {
      push()
      translate(this.x, this.y)
      animation.draw()
      pop();
    }

    if(this.is_debug){
      noStroke();
      fill(255, 0, 0, 127);
      rectMode()
      rect(this.hitboxX, this.hitboxY, this.hitboxSize, this.hitboxSize);
    }

  }

    checkScreenWrapping(){
     if(this.x > width + screenWrapOffset){
      this.x -= width + screenWrapOffset
     }
    else if (this.x < -screenWrapOffset) {
      this.x += width + screenWrapOffset;
    }
    else if (this.y > (height + screenWrapOffset)){
      this.y -= height + screenWrapOffset;
    }
    else if (this.y <= -screenWrapOffset){
      this.y += height + screenWrapOffset;
    }
    }
    checkIfPressed(i) {
    if(!isMousePressed && this.isAlive){
    this.hitboxX = this.x -16
    this.hitboxY = this.y -16
    if ( (mouseX >= this.hitboxX && mouseX <= this.hitboxX + this.hitboxSize 
      && mouseY >= this.hitboxY && mouseY <= this.hitboxY + this.hitboxSize) )
       {
        bugSquishSFX.triggerAttackRelease(450, 0.3);
        score++;
        globalSpeed += speedModifier;
        this.isAlive = false;
       addRandomBug(spriteWidth, bugSpriteSheet);
       isMousePressed = true;
       anyBugSquished = true;
      } 
  
    }
  }

}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, spriteW, spriteH, dirX = 1, dirY = 1, duration){
    this.spritesheet = spritesheet
    this.u = startU
    this.v = startV
    this.duration = duration
    this.startU = startU
    this.frameCount = 0
    this.spriteW = spriteW;
    this.spriteH = spriteH;
    this.dirX = dirX;
    this.dirY = dirY;
    this.rotate_debug = 0;
  }

  draw() {
        imageMode(CENTER)
        angleMode(DEGREES)
        if(this.dirX == -1)
          rotate(-90);
        else if(this.dirX == 1)
          rotate(90);
        else if (this.dirY == 1)
          rotate(180);
        else if (this.dirY == -1)
          rotate(0);

        rotate(this.rotate_debug);
        translate(this.x, this.y);


        image(this.spritesheet, 0, 0, 64, 64, this.u * this.spriteW, this.v * this.spriteH, this.spriteW, this.spriteH)
    
        this.frameCount++;
        if(this.frameCount % 10 == 0) {
          this.u++
        }
    
    
        if (this.u ==  this.startU + this.duration){
          this.u = this.startU
        } 
  }
}



