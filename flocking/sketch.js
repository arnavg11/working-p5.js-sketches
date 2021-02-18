var x = []
var img
var horizontal
function preload(){
  img = loadImage("pointer.png")
  horizontal = createVector(1,0)
}
function setup() {
  createCanvas(900, 900);
  frameRate(50)
  for (let i = 0; i < 100; i++) {
    x.push(new Boid())
  }
}

function draw() {
  background(51);
  for (var i of x) {
    i.move()
   i.cohesion(x)
    i.peerPressure(x)
     i.socialDistance(x)
  }

  // noLoop()
}