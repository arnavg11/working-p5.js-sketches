class Rocket {
  constructor(frames) {
    this.pos = createVector(30, height / 2)
    this.vel = createVector()
    this.acc = createVector()
    this.frames = []
    this.iter = 0;
    for (let i = 0; i < frames; i++) {
      this.frames.push(p5.Vector.random2D())
    }
    this.reached = false
    this.crashed = false
  }
  update() {
    // this.show()
    if (this.crashed || this.reached) return null

    this.move()
    this.accelerate()
    this.turn()
    this.checkMove()
    this.iter++;
  }
  show() {
    push()
    imageMode(CENTER)
    translate(this.pos.x, this.pos.y)
    rotate(horizontal.angleBetween(this.vel))
    image(sprite, 0, 0, 20, 20)
    pop()
  }
  move() {
    this.pos.add(this.vel)
  }
  accelerate() {
    this.vel.add(this.acc)
  }
  turn() {
    this.acc = createVector()
    this.acc = this.frames[this.iter]
  }
  checkMove() {
    this.crashed = this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height
    this.reached = dist(this.pos.x, this.pos.y, goal.x, goal.y) <= goal.r
    if (this.crashed || this.reached) return null
    for (let i of obstacles) {
      if (this.crashed || this.reached) return null
      if (this.pos.x > i[0] && this.pos.x < i[2] && this.pos.y > i[1] && this.pos.y < i[3]) this.crashed = true
    }
  }
  //dna stuff
  calcFitness() {
    let score = 0//dist+.2 iters
    if (this.reached) score += 1
    else {
      let d = dist(this.pos.x, this.pos.y, goal.x, goal.y)
      score += map(d, goal.r, maxDist, 1, 0, true)
    }
    return pow(score, 4) * 100
  }

  mutate(rate) {
    for (let i = 0; i < this.frames.length; i++) {
      if (random(1) < rate) this.frames[i] = p5.Vector.random2D()
    }
  }

}

class Population {
  constructor(strength, frames) {
    this.strength = strength
    this.community = []
    for (let i = 0; i < strength; i++) {
      this.community.push(new Rocket(frames))
    }
  }
  progress() {
    //matingPool
    let matingPool = [] //candid, score
    let avg = 0
    let max=[null,0]//obj,score
    for (var i of this.community) {
      let f = i.calcFitness()
      if(f>max[1]){max[0] = i;
                  max[1]=f}
      avg+=f
      matingPool.push([i, f])
    }
    avgFitness = avg/this.strength
    this.community = []
    for (i = 0; i < this.strength; i++) {
      let p1 = pickRand(matingPool)
      let p2 = pickRand(matingPool)
      let child = reproduce(p1, p2);
      child.mutate(.01);
      this.community.push(child)
    }
    return max[0];
  }
  play() {
    for (var i of this.community) {
      i.update()
    }
  }
  show() {

    var closest = {
      best: this.community[0],
      d: dist(this.community[0].pos.x, this.community[0].pos.y, goal.x, goal.y)
    }
    for (var i = 1; i < this.community.length; i++) {
      let candid = this.community[i]
      let l = dist(candid.pos.x, candid.pos.y, goal.x, goal.y)
      if (l < closest.d) {
        closest.best = candid
        closest.d = l
      }
    }
    push()
    noStroke()
    fill(255)
    circle(closest.best.pos.x, closest.best.pos.y, 20)
    stroke(255, 190)
    line(closest.best.pos.x, closest.best.pos.y, goal.x, goal.y)
    pop()
    for (i of this.community) {
      i.show()
    }
  }
}

function reproduce(p1, p2) {
  let child = new Rocket(p1.frames);
  for (let i = 0; i < p1.frames.length; i++) {
    if (random(1) < 0.5) child.frames[i] = p2.frames[i]
    else child.frames[i] = p1.frames[i]
  }
  return child;
}


function pickRand(arr) {
  let rand = random(100);
  while (true) {
    let [candid, score] = arr[int(random(arr.length))]
    if (score >= rand) {
      return candid
    } else rand -= 5
  }
}