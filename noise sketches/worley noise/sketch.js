var points = []

function setup() {
  createCanvas(250, 250);
  for (let i = 0; i < 4; i++) {
    points.push(createVector(random(width), random(height),random(400)))
  }
  stroke(0, 255, 0)
  strokeWeight(4)
  pixelDensity(1)
}
var z = 0;
function draw() {
  background(51);
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      distances = []
      let pos = createVector(x, y,z)
      points.forEach((e) => {
        distances.push(pos.dist(e))
      })
      distances = sort(distances)
      let c = distances[0]
      let grade = map(c,0,600,0,230)
      let p = (y * width + x) * 4
      pixels[p] = grade
      pixels[p+1] = grade
      pixels[p+2] = grade
      
    }
  }
  updatePixels()
  for (let i of points) point(i.x, i.y)
  z+=1-401*(z>400)
}

function mousePressed() {
  points.push(createVector(mouseX, mouseY,random(400)))
}