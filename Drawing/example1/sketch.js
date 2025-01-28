function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 255, 0);
  noStroke();
  fill(0, 255, 0);
  rect(20, 20, 150, 60);

  stroke('black');
  fill('white');
  circle(50, 50, 50);
  rect(100, 25, 50, 50);
}
