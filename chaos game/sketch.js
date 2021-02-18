var points = [], started = false, pPoint
function setup() {
  createCanvas(400, 400);
  background(51);
  stroke(255)
  strokeWeight(4)
}

function draw() {
  if(started){
    let p = points[floor(random(points.length))]
    let x = p5.Vector.lerp(pPoint,p,.5)
    point(x.x, x.y)
    pPoint = x
  }
}
function keyPressed(){
  if(keyCode==32){
    started = true
    pPoint = p5.Vector.lerp(points[floor(random(points.length))],points[floor(random(points.length))],random())
  }
}
function mousePressed(){
  points.push(createVector(mouseX,mouseY))
  point(mouseX,mouseY)
}