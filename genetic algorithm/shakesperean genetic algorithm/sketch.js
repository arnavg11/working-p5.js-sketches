var population = [];
var stop = false
const target = "to be or not to be"
var gen = 0;

function setup() {
  createCanvas(400, 400);
  fill(255)
  for (let i = 0; i < 150; i++) {
    population.push(new Organism(target.length))
  }
}

function keyPressed() {
  if (keyCode == 32) stop = !stop
}

function draw() {
  if (!stop) {
    var matingPool = []
    for (var i of population) {
      let x = Math.pow(i.grade(target),2)
      if (i.getPhrase() == target) {
        console.log("S0LVED! IN GENS:"+gen)
        noLoop()
      }
      matingPool.push([i,x])
    }
    population = []
    for (i = 0; i < 150; i++) {
      let parents = [pickRand(matingPool), pickRand(matingPool)]
      let child = parents[0].reproduce(parents[1])
      child.mutate(.01);
      population.push(child)
    }
    background(51)
    let evething = ""
    for (i of population) {
      evething += i.getPhrase() + "\n"
    }
    text(evething, 10, 10, width, height)
    gen++
  }
}

function pickRand(arr) {
  let rand = random(1);
  while(true){
    let [candid, score] = arr[parseInt(random(arr.length))]
    if(score>=rand){return candid}
    else rand-=.1
  }
}