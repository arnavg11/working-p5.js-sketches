function setup() {
  createCanvas(400, 400);
  pixelDensity(1)
  noiseDetail(20)
}
var zoff = 0
function draw() {
  var yoff = 0;
  loadPixels()
  for(let y = 0; y<height; y++){
    var xoff = 0
    for(let x = 0; x<width; x++){
      let c = noise(xoff,yoff,zoff)*255
      let ind = (y*width+x)*4
      pixels[ind] = c
      pixels[ind+1] = c
      pixels[ind+2] = c
      pixels[ind+3] = 255
      xoff+=.01
    }
    yoff+=.01
  }
  updatePixels()  
  zoff+=.01
}