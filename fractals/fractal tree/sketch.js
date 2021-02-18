var slider, slider1, ang, w
var scal = 1.2

function setup() {
  createCanvas(800, 700);
  slider = createSlider(0, PI * 2, PI / 4, PI / 360)
  slider1 = createSlider(0, PI * 2, PI / 4, PI / 360)

}

function draw() {
  ang = slider.value()
  w = slider1.value()
  background(0);
  stroke(255)
  translate(width / 2, height)
  branch(130, w)
}

function branch(len, w) {


  strokeWeight(w)

  line(0, 0, 0, -len)
  translate(0, -len)

  if (len > 6) {
    push()
    stroke(len/2,len,len/2)
    rotate(-ang)
    branch(len * .7, w * scal)
    pop()
    push()
    stroke(len/2,len,len/2)
    rotate(ang)
    branch(len * .7, w * scal)
    pop()
  }
}