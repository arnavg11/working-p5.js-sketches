var terrain = [], yoff = 100
const scl = 10, w = 500, h = 500
function setup() {
  createCanvas(400, 400,WEBGL);
  stroke(255)
  strokeWeight(1.4)
  for(let y = 0; y<h; y+=scl){
    terrain.push([])
    let xoff = 0
    for(let x = 0; x<w; x+=scl){
      terrain[y/scl].push(noise(xoff,yoff)*200)
      xoff-=.04
    }
    yoff-=.04
  }
  noFill()
}

function draw() {
  background(51);
  // translate(width/2,height/2);
  rotateX(1);
  noStroke()
  push()
  translate(-w/2, -h/2+100)
  for(let y = scl; y<h; y+=scl){
    // fill(255)
    beginShape(TRIANGLE_STRIP)
    for(let x = 0; x<w; x+=scl){
      let x_ = x/scl, y_ = y/scl
      fill(map(terrain[y_][x_],0,200,0,300))
      vertex(x,y,terrain[y_][x_]); 
      vertex(x,(y-scl),terrain[y_-1][x_])
    }
    endShape()
  }
  for(let i = 1; i<w/scl; i++){
    line(i*scl,0,terrain[0][i],i*scl-scl,0,terrain[0][i-1])
  }
  for(let i = 1; i<h/scl; i++){
    line(w-scl,i*scl,terrain[i][w/scl-1],w-scl,i*scl-scl,terrain[i-1][w/scl-1])
  }
  pop()
  // add new row
  terrain.unshift([])
  terrain.pop()
  let xoff = 0;
  for(let x = 0; x<w; x+=scl){
    terrain[0].push(noise(xoff,yoff)*200)
    xoff-=.04
  }
  yoff-=.04
}