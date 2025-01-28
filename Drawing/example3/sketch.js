function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  background(0, 0, 0);
  noStroke();

  fill("yellow");
  arc(50, 50, 80, 80, 3.9, 2.35);

  fill("red");
  circle(150, 50, 80);
  rect(110, 50, 80, 40);

  fill("white")
  circle(130, 50, 25);
  circle(170, 50, 25);
 
  fill("blue");
  circle(130, 50, 13.5);
  circle(170, 50, 13.5);
}
