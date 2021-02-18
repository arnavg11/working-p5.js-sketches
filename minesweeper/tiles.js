function Tile(x, y) {
  this.neighbours = []
  this.coords = createVector(x, y)
  this.isMine = false
  this.selected = false
  this.flagged = false
  this.select = function() {
    if (this.selected || this.flagged) {
      return null
    }

    if (this.isMine) {

      fill(255, 0, 0);
      square(this.coords.x * scl, this.coords.y * scl, scl)

      if (!(firstMove)) {
        gameEnd = true
              console.log('you L0ST!!')
      } else {
        console.log('you hit a M!N3 reseting....')
        setup()
        mousePressed()
      }
      return null
    } else {
      var num = 0
      for (var i of this.neighbours) {
        if (i.isMine) {
          num++
        }

      }
      fill(255);
      square(this.coords.x * scl, this.coords.y * scl, scl)
      fill(0)
      if (num != 0) {
        if (firstMove&&plainBlock) {
          console.log('you hit a numb3r reseting....')
          setup()
          mousePressed()
          return null
        } else {
          text(num, this.coords.x * scl + scl / 2, this.coords.y * scl + scl / 2)
        }
      } else {
        expl(this)
      }

    }
    this.selected = true
    firstMove = false
  }
  this.flag = function() {
    if (this.selected) {
      return null
    }else if(this.flagged){
      this.flagged = false
      push()
                strokeWeight(2)
          stroke(255)
      fill(51)
      square(this.coords.x*scl,scl*this.coords.y, scl)
      pop()
      return null
    }
    var loc = p5.Vector.mult(this.coords, scl)
    push()
    fill(255, 0, 0)
    noStroke()
    triangle(loc.x + scl / 2, loc.y + 2, loc.x + scl / 2, loc.y + scl / 2, loc.x + 1, loc.y + 1 + scl / 4)
    stroke(0)
    strokeWeight(1)

    line(loc.x + scl / 2, loc.y + 2, loc.x + scl / 2, loc.y + scl - 2)
    pop()
    this.flagged = true
  }
  this.show = function() {

    if (this.isMine) {
      fill(255, 0, 0);
      square(this.coords.x * scl, this.coords.y * scl, scl)
    } else {
      var num = 0
      for (var i of this.neighbours) {
        if (i.isMine) {
          num++
        }
      }
      fill(255);
      square(this.coords.x * scl, this.coords.y * scl, scl)
      fill(0)
      if (num != 0)(text(num, this.coords.x * scl + scl / 2, this.coords.y * scl + scl / 2))
      return num
    }
  }
}


function expl(t) {
  temp = 0
  var task = t.neighbours
  var temp = [1]
  while (temp.length != 0) {
    temp = []
    for (var i of task) {
      i.selected = true
      if (i.show() == 0) {
        for (var j of i.neighbours) {
          if (!(j.selected)) {
            temp.push(j)
          }
        }
      }
    }
    task = temp
  }
}