//The goal of this program is to create a paint app.
//The user will be able to select a color from a palatte and draw
//lines depending on the palatte selected.

var brushColor = 'red';
var noDrawWidth = 0;//the no draw x, y, width, height and offset is used to prevent the user from drawing inside of the palettes 
var noDrawHeight = 0;
var noDrawX = 0; 
var noDrawY = 0;
var brushIsOn = true;
const NO_DRAW_OFFSET = 2;

var paletteTypes = ['red', 'orange', 'yellow', 'chartreuse', 'cyan', 'blue', 'fuchsia', 'saddlebrown', 'white', 'black'];
var palettes = [];//stores each individual palette
var numPalettes = paletteTypes.length

class colorPalette {

  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    fill(this.color);
    square(this.x, this.y, this.size);
  }

  checkIfPressed() {
    if (mouseX >= this.x && mouseX <= this.x + this.size 
      && mouseY >= this.y && mouseY <= this.y + this.size) {
        brushColor = this.color;
      }  
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255,255,255);
  createPalettes(0, 0, 25);
  strokeWeight(10);

}

function createPalettes(x, y, size) {
  for(let i = 0; i < numPalettes; i++){
    let c = paletteTypes[i]
    palettes.push(new colorPalette(x, y + i * size, size, paletteTypes[i]));
  }

  noDrawX = x;
  noDrawY = y;
  noDrawWidth = size + NO_DRAW_OFFSET;
  noDrawHeight = (size * numPalettes) + NO_DRAW_OFFSET;
  //fill(255, 0, 0, 125);
  //rect(noDrawX, noDrawY, noDrawWidth, noDrawHeight);

}

function mousePressed(){
  for(let i = 0; i < palettes.length; i++) {
    palettes[i].checkIfPressed();
  }
}

function mouseDragged() {

  if( (mouseX >= noDrawX && mouseX <= noDrawX + noDrawWidth 
    && mouseY >= noDrawY && mouseY <= noDrawY + noDrawHeight)
    || (pmouseX >= noDrawX && pmouseX <= noDrawX + noDrawWidth 
      && pmouseY >= noDrawY && pmouseY <= noDrawY + noDrawHeight)) {
        brushIsOn = false;//brush is turned off until button is released so the user can't try to draw inside of the line
    } else if (brushIsOn) {
      stroke(brushColor);
      line(pmouseX, pmouseY, mouseX, mouseY);
    }

}

function mouseReleased() {
  brushIsOn = true;//mouse is turned on just in case it was turned of earlier if the user tried to draw on top of the palattes 
}