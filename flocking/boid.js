class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height))
    this.vel = p5.Vector.random2D().setMag(random(10))
    this.acc = createVector()
    this.maxForce = .4
    this.maxVel = 5
    this.sight = 80
    this.tooClose = 60
  }
  render() {
    push()
    translate(this.pos.x,this.pos.y)
    rotate(horizontal.angleBetween(this.vel))
    imageMode(CENTER)
    image(img,0,0,20,20)
    pop()
  }
  move() {
    this.render()
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.checkEdges()
    this.acc.mult(0)
  }
  checkEdges() {
    if (this.pos.x > width) {
      this.pos.x = 0
    } else if (this.pos.x < 0) {
      this.pos.x = width
    }
    if (this.pos.y > height) {
      this.pos.y = 0
    } else if (this.pos.y < 0) {
      this.pos.x = height
    }
  }
  peerPressure(boids) {
    let total = 0,
      radius = 100
    let avg = createVector()
    for (let i of boids) {
      if (i != this && abs(p5.Vector.sub(this.pos, i.pos).mag()) < this.sight&&this.scope(i)) {
        avg.add(i.vel)
        total++
      }
    }
    if (total) {
      avg.div(total)
      avg.setMag(this.maxVel)
      avg.sub(this.vel)
      avg.limit(this.maxForce)
      this.acc.add(avg)
    }
  }
  cohesion(boids) {
    let total = 0,
      avg = createVector()
    for (let i of boids) {
      if (i != this && abs(p5.Vector.sub(this.pos, i.pos).mag()) < this.sight&&this.scope(i)) {
        avg.add(i.pos)
        total++
      }
    }
    if (total) {
      avg.div(total)
      avg.sub(this.pos)
      avg.setMag(this.maxVel)
      avg.sub(this.vel)
      avg.limit(this.maxForce)
      this.acc.add(avg)
    }
  }
  socialDistance(boids) {

    let total = 0,
      avg = createVector()
    for (let i of boids) {
      let d = p5.Vector.sub(this.pos, i.pos)
      if (i != this && abs(d.mag()) < this.tooClose&&this.scope(i)) {
        d.div(d.mag())
        avg.add(d)
        total++
      }
    }
    if (total) {
      avg.div(total/3)
      avg.setMag(this.maxVel)
      avg.sub(this.vel)
      avg.limit(this.maxForce)
      this.acc.add(avg)
    }
  }
  scope(companion){
    let ang = abs(this.pos.angleBetween(companion.pos))
    return ang<60
  }
  // scope(x){
  //   return true
  // }
}