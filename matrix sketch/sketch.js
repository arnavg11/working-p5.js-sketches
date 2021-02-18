var streams = [],
  sSize = 20
  var s
function setup() {
  createCanvas(1600, 600);
  background(0);
  var x=0
  for (var i = 0; i < width / sSize; i++) {
    s = new Stream_sym()
    s.genSym(x,random(-1000,0))
    streams.push(s)
    x+=sSize
  }
  textSize(sSize)
}

function draw() {
  background(0,159);
  streams.forEach(function(s){s.render()})
}