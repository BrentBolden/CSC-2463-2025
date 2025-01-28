function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 0, 127);

  
  stroke('white')
  strokeWeight(3)
  fill('green')
  circle(100, 100, 100);

  fill("red")

drawStar(100, 100)




}

//draws star based on x, and y position
//able to scale up or down
function drawStar(x, y) { 

//x and y refer to the center of the star
//size of the star is based on the distance from the center
circle(x, y, 5)

beginShape()
vertex(x -13, y - 15)//top, left vert
vertex(x, y - 50)//top, mid vert
vertex(x + 13, y - 15)//top, right vert

vertex(x + 50, y - 10)//right
vertex(x + 20, y + 5)

vertex(x + 30, y + 45)//bottom right
vertex(x , y + 20)

vertex(x - 30, y + 45)//bottom left
vertex(x - 20, y + 5)

vertex(x - 50, y -10)

endShape(CLOSE)
}

