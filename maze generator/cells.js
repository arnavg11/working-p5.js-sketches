function getIndex(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1
  }
  return i + j * cols
}

function cell(i, j) {
  this.i = i
  this.j = j
  this.walls = [true, true, true, true] //top,right,down, left
  this.visited = false
  this.show = function() {
    stroke(255)
    if (this.walls[0]) {
      line(this.i * scl, this.j * scl, (this.i + 1) * scl, this.j * scl) //top
    }
    if (this.walls[1]) {
      line((this.i + 1) * scl, this.j * scl, (this.i + 1) * scl, (this.j + 1) * scl) //right
    }
    if (this.walls[2]) {
      line(this.i * scl, (this.j + 1) * scl, (this.i + 1) * scl, (this.j + 1) * scl) //down
    }
    if (this.walls[3]) {
      line(this.i * scl, this.j * scl, this.i * scl, (this.j + 1) * scl) //left
    }
    if (this.visited) {
      noStroke()
      fill(255, 0, 255)
      square(this.i * scl, this.j * scl, scl)
    }
  }
  this.checkNeighbours = function() {
    var neighb = []
    var top = cell_list[getIndex(i, j - 1)]
    var right = cell_list[getIndex(1 + i, j)]
    var down = cell_list[getIndex(i, j + 1)]
    var left = cell_list[getIndex(i - 1, j)]
    if (top && !top.visited) {
      neighb.push(top)
    }
    if (right && !right.visited) {
      neighb.push(right)
    }
    if (down && !down.visited) {
      neighb.push(down)
    }
    if (left && !left.visited) {
      neighb.push(left)
    }
    if (neighb.length) {
      var r = floor(random(neighb.length))
      return neighb[r]
    }
  }
  this.emphasize = function(){
    noStroke()
    fill(0,255,0)
    square(this.i*scl,this.j*scl,scl)
  }
}

function removeWalls(a, b) {
  if (a.i - b.i == 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if (a.i - b.i == -1) {
    b.walls[3] = false
    a.walls[1] = false
  }
  if (a.j - b.j == 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if (a.j - b.j == -1) {
    b.walls[0] = false
    a.walls[2] = false
  }
}