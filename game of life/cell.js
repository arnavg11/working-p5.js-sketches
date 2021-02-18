function Cell(x = 1, y =1 ) {
  this.neighbours = []
  this.coords = createVector(x, y)
  this.isAlive = false
  this.nextState = this.isAlive
  this.show = function() {
    this.isAlive = this.nextState
    if (this.isAlive) {
      push();
      // fill(51,255,255);
      fill(255);
    } else {
      push()
      fill(51)
    }
    square(this.coords.x * scl, this.coords.y * scl, scl);
    pop()
  }
  this.update = function(){

    var num = 0
    for(var i of this.neighbours){
      if(i.isAlive){
        num++
      }
    }
    if((this.isAlive&&(num==2))||(num==3)){
      this.nextState = true
      
    }else{
      this.nextState = false
    }
  }
}