var scl = 30,
  num_mines = 99, plainBlock = true;
var mines = [],
  gameEnd = false,
  firstMove = true
function setup() {
  
  createCanvas(30 * scl, 16 * scl);
  background(51);
  stroke(255)
  var totalx = width / scl,
    totaly = height / scl
  textAlign(CENTER)
  mines = []
  for (let y = 0; y < totaly; y++) {
    line(0, y * scl, width, y * scl)
    mines.push([])
    for (let x = 0; x < totalx; x++) {
      line(x * scl, 0, x * scl, height)
      mines[y].push(new Tile(x, y))
    }
  }
  stroke(0)
  //mine assigning
  for (let i = 0; i < num_mines; i++) {
    var candid = pickRand(mines);
    if (candid.isMine) {
      i--
    } else {
      candid.isMine = true
    }
  }
  //neighbours
  for (let y = 0; y < totaly; y++) {
    for (let x = 0; x < totalx; x++) {
      var ele = mines[y][x];
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          try {
            var candid = mines[y + j][x + i]

            if ((candid) && (candid != ele)) {
              ele.neighbours.push(candid)
            }
          } catch (err) {}
        }
      }
    }
  }
}

function pickRand(outcomes) {
  return outcomes[Math.floor(random() * outcomes.length)][Math.floor(random() * outcomes[0].length)]
}

function mousePressed() {
  if (gameEnd) {
    return null
  }
  var x = Math.floor(mouseX / scl),
    y = Math.floor(mouseY / scl)

  try {
    mines[y][x].select()
  } catch (err) {}
  if (checkWin()) {
    console.log('you wOn!!')
    gameEnd = true
  }
}

function expose() {
  for (var j of mines) {
    for (var i of j) {
      i.show()
    }
  }
  gameEnd = true
}

function checkWin() {
  for (var i = 0; i < mines.length; i++) {
    for (var j of mines[i]) {
      if (!(j.selected || j.isMine)) {
        return false
      }
    }
  }
  return true
}

function keyPressed() {
  if (keyCode == 32) {
    expose()
  } else if (keyCode == 75) {
    if (gameEnd) {
      return null
    }
    var x = Math.floor(mouseX / scl),
      y = Math.floor(mouseY / scl)

    try {
      mines[y][x].flag()
    } catch (err) {}
  }
}