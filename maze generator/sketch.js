var scl = 10
var cols, rows, cell_list = []
var current
var stack = []

function setup() {
  createCanvas(500, 500);
  cols = floor(width / scl)
  rows = floor(height / scl)
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      cell_list.push(new cell(i, j))
    }
  }
  current = cell_list[0]
  current.visited = true
frameRate(150)

}

function draw() {
  background(60);

  for (var i = 0; i < rows * cols; i++) {
    cell_list[i].show()
  }


    current.emphasize()
  current.visited = true
  var next = current.checkNeighbours()

  if (next) {
    stack.push(current)

    removeWalls(next, current)
    current = next
  } else if (stack.length > 0) {
    current = stack.pop()
  }
}