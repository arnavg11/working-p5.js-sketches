var obstacles = [], bestOfGen
var sprite, avgFitness = 0;
var x, horizontal, gen = 0
const goal = {
    x: 400 - 10,
    y: 400 / 2,
    r: 5
  },
  frames = 240
var start = false,
  maxDist, frameNo = 0; //maxDist must be changed according to position of goal
function preload() {
  sprite = loadImage('pointer.png')
}

function setup() {
  createCanvas(400, 400);
  x = new Population(200, frames)
  horizontal = createVector(1, 0)
  maxDist = dist(0, 0, goal.x, goal.y)

}

function draw() {
  background(51);
  fill(255, 200)
  if (drawing) rect(drawing.x, drawing.y, mouseX - drawing.x, mouseY - drawing.y)
  for (var i of obstacles) {

    rect(i[0], i[1], i[2] - i[0], i[3] - i[1])
  }
  //goal
  fill(240, 100, 100)
  push()
  noStroke()
  circle(goal.x, goal.y, goal.r * 2)
  pop()
  if (start) {
    x.play()
    frameNo++;
    let done  = true
    for(let i of x.community){
      if(!i.reached||!i.crashed)done = false
    }
    if (frames <= frameNo||done) {
      let temp = x.progress()
      bestOfGen = new Rocket(frames)
      bestOfGen.frames = temp.frames
      frameNo = 0
      gen++
    }
  }
 
  if(gen==0){
    x.show()
  }else{ text(gen,width-20,20)
        text(avgFitness,20,20)
         bestOfGen.show()
       bestOfGen.update()}
}

var drawing;

function mousePressed() {
  drawing = createVector(mouseX, mouseY)
}

function mouseReleased() {
  obstacles.push([min(drawing.x, mouseX), min(drawing.y, mouseY), max(drawing.x, mouseX), max(drawing.y, mouseY)])
  drawing = null
}

function keyPressed() {
  if (keyCode == 32) start = !start
}