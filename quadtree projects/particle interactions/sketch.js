var balls = [],
  bound
const d = 10

function setup() {
  createCanvas(650, 650);
  bound = new rectangle(width / 2, height / 2, width / 2, height / 2)
  for (let i = 0; i < 1700; i++) {
    let b = new Ball(random(width), random(height))
    balls.push(b)
  }
}
function draw() {
  background(51);
  let q = insertBalls()
  balls.forEach((e) => {
    let pnts = q.query(e)
    let isIntersecting = false
    for(var j of pnts){
      if(dist(e.x,e.y,j.x,j.y)<=d && e!==j){
        isIntersecting = true;
        break;
      }
    }
    e.show(isIntersecting)
    e.update()
  })
  push()
  stroke(255)
  q.show()
  pop()
  // noLoop()
}

function insertBalls() {
  let q = new quadTree(bound, 4)
  balls.forEach((e) => {
    q.insert(e)
  })
  return q
}