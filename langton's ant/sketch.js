class Ant {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.angle = floor(random(4))
  }
  show() {
    push()
    translate(this.pos.x * scl + scl / 2, this.pos.y * scl + scl / 2)
    rotate(this.angle * PI / 2)
    image(sprite, -scl / 2, -scl / 2, scl, scl)
    pop()
  }
  move() {
    
    let info = findEle(this.pos)
    if (info!=undefined) this.angle -= 1;
    else this.angle += 1;
    alt(this.pos.copy(), info)
    if (this.angle < 0) this.angle += 4
    else if (this.angle >= 4) this.angle -= 4
    switch (this.angle) {
      case 0:
        this.pos.y -= 1;
        break;
      case 1:
        this.pos.x += 1;
        break;
      case 2:
        this.pos.y += 1;
        break;
      case 3:
        this.pos.x -= 1;
        break;
    }
    this.pos.x = constrain(this.pos.x, 0, width / scl - 1)
    this.pos.y = constrain(this.pos.y, 0, height / scl - 1)    
  }
}

function removeEle(ind) {
  if(ind==drawings.length-1){
    
    drawings.pop()
  }else{
    drawings.splice(ind,1)
  }
}

function alt(p, ind) {
  if (ind != undefined) {removeEle(ind)}
  else {drawings.push(p)}
}

function findEle(p) {
  var c = 0
  for (let i of drawings) {
    if (p.x == i.x && p.y == i.y) {return c;}
    c++
  }
  return ;
}
var drawings = [];
const scl = 10;
var a, sprite, drawings, stop = true

function preload() {
  sprite = loadImage('ant.png')
}

function setup() {
  createCanvas(600, 600);
  a = []
  for(let i =0; i<1; i++){
    a.push(new Ant(floor(width/(2*scl)), floor(height/(2*scl))))
  }
}
var it = 0

function draw() {
  background(255);
  for(let y = 0; y<height; y+=scl){
    for(let x = 0; x<width; x+=scl){
      square(x,y,scl)
    }
  }
  if(stop)a.forEach(e=>{e.move()})
  drawings.forEach((e) => {
    push()
    fill(0)
    square(e.x * scl, e.y * scl, scl)
    pop()
  })
    if(keyIsDown(DOWN_ARROW)){
    frameRate(frameRate()-1)
  }
  else if(keyIsDown(UP_ARROW)){
    frameRate(frameRate()+1)
  }
  a.forEach(e=>{e.show()})
  it++
}
function mousePressed(){
  if(mouseX<0||mouseX>width||mouseY<0||mouseY>height)return;
  let x = floor(mouseX/scl)
  let y = floor(mouseY/scl)
  a.push(new Ant(x,y))
}
function keyPressed(){
  if(keyCode==32){
    stop=!stop
  }
}
