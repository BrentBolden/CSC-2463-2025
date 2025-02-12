
let greenchar
let eskimochar
let yellowchar
let chars = []

function preload(){
  greencharsprite = loadImage("SpelunkyGreen.png")
  eskimocharsprite = loadImage("SpelunkyEskimo.png")
  yellowcharsprite = loadImage("SpelunkyYellow.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)

  greenchar = new Character(randInteger(50, 350), 50)
  greenchar.addAnimation("walk_right", new SpriteAnimation(greencharsprite, 0, 0, 8))
  greenchar.addAnimation("walk_left", new SpriteAnimation(greencharsprite, 0, 0, 8))
  greenchar.addAnimation("neutral", new SpriteAnimation(greencharsprite, 0, 0, 1))
  greenchar.currentAnimation = "neutral"


  eskimochar = new Character(randInteger(50, 350), 200)
  eskimochar.addAnimation("walk_right", new SpriteAnimation(eskimocharsprite, 0, 0, 8))
  eskimochar.addAnimation("walk_left", new SpriteAnimation(eskimocharsprite, 0, 0, 8))
  eskimochar.addAnimation("neutral", new SpriteAnimation(eskimocharsprite, 0, 0, 1))
  eskimochar.currentAnimation = "neutral"



  yellowchar = new Character(randInteger(50, 350), 300)
  yellowchar.addAnimation("walk_right", new SpriteAnimation(yellowcharsprite, 0, 0, 8))
  yellowchar.addAnimation("walk_left", new SpriteAnimation(yellowcharsprite, 0, 0, 8))
  yellowchar.addAnimation("neutral", new SpriteAnimation(yellowcharsprite, 0, 0, 1))
  yellowchar.currentAnimation = "neutral"
}


class Character {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.currentAnimation = null
    this.animations = {}
  }

  addAnimation(key, animation){
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation]
    if (animation) {
      switch(this.currentAnimation) {
        case "walk_right":
          this.x += 2
        break;
        case "walk_left":
          this.x -= 2
          this.is_flipped = true
        break;
      }
      push()
      translate(this.x, this.y)
      animation.draw()
      pop();
    }
  }

  keyPressed() {
    switch (keyCode) {
      case RIGHT_ARROW:
        this.currentAnimation = "walk_right"
        this.animations[this.currentAnimation].flipped = false
        break;
      case LEFT_ARROW:
        this.currentAnimation = "walk_left"
        this.animations[this.currentAnimation].flipped = true
        break;
    }
  }
  
  keyReleased() {
    if(this.animations[this.currentAnimation].flipped){
    this.currentAnimation = "neutral"
    this.animations[this.currentAnimation].flipped = true
    }
    else {
      this.currentAnimation = "neutral"
      this.animations[this.currentAnimation].flipped = false
    }
  }

}

class SpriteAnimation {

  constructor(spritesheet, startU, startV, duration){
    this.spritesheet = spritesheet
    this.u = startU
    this.v = startV
    this.duration = duration
    this.startU = startU
    this.frameCount = 0
    this.flipped = false
  }

  draw() {
        let s = (this.flipped) ? -1 : 1
        scale(s, 1)
        image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80)
    
        this.frameCount++;
        if(this.frameCount % 10 == 0) {
          this.u++
        }
    
    
        if (this.u ==  this.startU + this.duration){
          this.u = this.startU
          
        } 
        
    

  }



}



function keyPressed() {

  for(let i = 0; i < chars.length; i++){
    chars[i].keyPressed()
  }
  greenchar.keyPressed()
  eskimochar.keyPressed()
  yellowchar.keyPressed()
}

function keyReleased() {
  for(let i = 0; i < chars.length; i++) {
    chars[i].keyReleased()
  }
  greenchar.keyReleased()
  eskimochar.keyReleased()
  yellowchar.keyReleased()
}

function randInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


function draw() { 
  background(220);
  
  greenchar.draw()
  eskimochar.draw()
  yellowchar.draw()
}


