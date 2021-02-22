var pnts = [],qt, show = true, showQT = false

function setup() {
  createCanvas(700,700);
  qt = new quadTree(new rectangle(width/2,height/2,width/2,height/2),4)
  for(let i = 0; i<0; i++){
    let p = new Point(random(width),random(height))
    pnts.unshift(p)
    qt.insert(p)
  }
  stroke(255)
}

function draw() {
  background(51);
  if(show){
  for(let i of pnts){
    i.show()
  }
  }
  if(mouseIsPressed){
    if(mouseX!=pmouseX||mouseY!=pmouseY) mousePressed()
  }
  if(showQT)qt.show()
  let m = new rectangle(mouseX,mouseY,20,20)
  push()
  stroke(0,255,0)
  m.show()
  
  let x = qt.query(m)
  x.forEach((e)=>{
    stroke(0,255,0)
    e.show()
  })
  pop()
}
function keyPressed(){
  if(keyCode==32){
    show =! show
  }
  else if(keyCode==81)showQT=!showQT
}

function mousePressed(){
  let p = new Point(mouseX,mouseY)
  pnts.push(p)
  qt.insert(p)
}