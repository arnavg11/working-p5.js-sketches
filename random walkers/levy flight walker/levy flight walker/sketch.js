class Walker {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.ppos = createVector(width / 2, height / 2);
  }
  update() {
    //move
    let vel = p5.Vector.random2D()
    if (random() < s.value()) {
      vel.setMag(random(40, 70))
    }
    this.pos.add(vel)
    //edge checking
    this.pos.x += -width * (this.pos.x > width) + width * (this.pos.x < 0)
    this.pos.y += -height * (this.pos.y > height) + height * (this.pos.y < 0)
    line(this.pos.x, this.pos.y, this.ppos.x, this.ppos.y);
    this.ppos = createVector(this.pos.x,this.pos.y)
  }
}
var x,s;

function setup() {
  createCanvas(400, 400);
  background(51);
  stroke(255)
  x = new Walker()
  strokeWeight(2)
  s = createSlider(0,.5,.01,.01)
}

function draw() {
  x.update()
}