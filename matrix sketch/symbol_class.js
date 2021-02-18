function Sym(x,y,speed,f){
  this.x = x;this.y = y
  this.val = 'a'
  this.speed = speed
  this.f = f
  this.setVal = function(){
    if (random()>.1){
    this.val = String.fromCharCode(0x30a0+floor(random(56)))
    }else{
      this.val = floor(random(10))
    }
  }
  this.render = function(){
    if (random()<.01){
      this.setVal()
    }
    if (this.f){
      fill(100,255,200)
    }else{
    fill(0,255,100)}
    text(this.val, this.x,this.y)
  }
  this.move = function(){
    this.y=(this.y-sSize>=height)?0: this.y+this.speed;
  }
}

function Stream_sym(){
  this.symbols = []
  this.leng = random(5,15)
  this.speed = random(4,10)
  this.genSym = function(x,y){
    var f = random()<.4
    for(var i = 0; i<this.leng; i++){
      var symb = new Sym(x,y-i*sSize,this.speed,f)
      symb.setVal()
      this.symbols.push(symb)
      f = false
    }
  }
  this.render = function(){
    this.symbols.forEach(function(s){
      s.move()
      s.render()
    })
  }
}