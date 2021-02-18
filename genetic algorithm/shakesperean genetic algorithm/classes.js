function Organism(len) {
  this.len = len;
  this.genes = []
  for (var i = 0; i < len; i++) {
    this.genes.push(String.fromCharCode(parseInt(random(32, 128))))
  }
  this.grade = function(target) {
    let score = 0;
    for (var i = 0; i < this.len; i++) {
      if (this.genes[i] == target[i]) score++
    }
    return score/this.len;
  }
  this.reproduce = function (mate){
    let child = new Organism(this.len)
    let mid = random(this.len);
    for(let i = 0; i<this.len; i++){
      if(i<mid)child.genes[i] = this.genes[i]
      else child.genes[i] = mate.genes[i]
    }
    return child;
  }
  this.mutate = function(rate) {
    for (var i = 0; i < this.len; i++) {
      if (random(1)<rate) {
        this.genes[i] = String.fromCharCode(parseInt(random(32, 128)))
      }
    }
  }
  this.getPhrase = function(){
    let phrase = ""
    for(var i of this.genes)phrase+=i;
    return phrase
  }
}