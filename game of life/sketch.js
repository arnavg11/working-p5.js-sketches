var scl = 20;
var cells = [],
  started = false,
  drawMode = false,
  pMouse

function setup() {
  pMouse = createVector()
  createCanvas(20 * scl, 20 * scl);
  background(51);
  stroke(255)
  var totalx = width / scl,
    totaly = height / scl
  cells = []
  for (let y = 0; y < totaly; y++) {
    cells.push([])
    for (let x = 0; x < totalx; x++) {
      cells[y].push(new Cell(x, y))
    }
  }
  stroke(255)
  //neighbours
  for (let y = 0; y < totaly; y++) {
    for (let x = 0; x < totalx; x++) {
      var ele = cells[y][x];
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          try {
            var candid = cells[y + j][x + i]

            if ((candid) && (candid != ele)) {
              ele.neighbours.push(candid)
            }
          } catch (TypeError) {}
        }
      }
    }
  }
}

function draw() {
  background(0)
  for (var i of cells) {
    for (var j of i) {
      j.show()
    }
  }
  if (drawMode) {
    if ((abs(pMouse.x - mouseX) > scl) || (abs(pMouse.y - mouseY) >scl)) {
      pMouse = createVector(Math.floor(mouseX / scl), Math.floor(mouseY / scl))
      mousePressed(true)
    }
  }
  if (started) {
    frameRate(3)
    for (i of cells) {
      for (var x of i) {
        x.update()
      }
    }
  }
}

function mousePressed(x = false) {
  var x = Math.floor(mouseX / scl),
    y = Math.floor(mouseY / scl)
  if (!drawMode) {
    try {
      cells[y][x].isAlive = !cells[y][x].isAlive
      cells[y][x].nextState = !cells[y][x].nextState
      cells[y][x].show()
    } catch (typeError) {}
  } else {
    try {
      cells[y][x].isAlive = true
      cells[y][x].nextState = true
      cells[y][x].show()
    } catch (typeError) {}
  }
}

function keyPressed() {
  if (keyCode == 32) {
    console.log(1)
    started = !started
  }
  if (keyCode == 68) {
    console.log('d')
    drawMode = !drawMode
    pMouse = createVector(Math.floor(mouseX / scl), Math.floor(mouseY / scl))
  }
}