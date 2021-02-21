class Ball{
  constructor(x,y){
    this.x = x
    this.y = y
    this.vel = p5.Vector.random2D()
  }
  update(){
    this.move()
    this.checkEdges()
  }
  checkEdges(){
    this.x+=width*((this.x<=0)-(this.x>=width))
    this.y+=height*((this.y<=0)-(this.y>=height))
  }
  move(){
    let acc = p5.Vector.random2D()
    this.vel.add(acc)
    if(this.vel.mag()>1)this.vel.setMag(1)
    this.x+=this.vel.x
    this.y+=this.vel.y
  }
  show(isHighlighted){
    push()
    noStroke()
    fill(255,255*isHighlighted+100)
    circle(this.x,this.y,d)
    pop()
  }
}
