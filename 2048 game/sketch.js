var game = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  scl
const s = 32
function setup() {
  createCanvas(600, 600);
  scl = height / 4
  for (let i = 0; i < 2; i++) {
    pickRandomSpot()
  }
  fill(51)
  textSize(s)
}

function pickRandomSpot() {
  var r
  for (;;) {
    r = [floor(random(4)), floor(random(4))]
    if (game[r[0]][r[1]] == 0) break;
  }
  if (random() < .15) game[r[0]][r[1]] = 2
  else game[r[0]][r[1]] = 1
  return r
}

function draw() {
  background('#b9ada1')
  noFill()
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      push()
      rectMode(CENTER)
      let v = game[y][x]
      let textColor = 0
      let off= 0;
      switch(v){
        case 1: fill('#ece4db'); textColor = '#756e66'; break;
        case 2: fill('#ebdfcb'); textColor = '#756e66'; break;
        case 3: fill('#f2b179'); textColor = 255; break;
        case 4: fill('#f59563'); textColor = 255; off=s/3; break;
        case 5: fill('#f67c5f'); textColor = 255;off=s/3; break;
        case 6: fill('#f65e3b'); textColor = 255;off = s/3; break;
        case 7: fill('#edcf72'); textColor = 255;off=s/1.5; break;
        case 8: fill('#edcc61'); textColor = 255;off=s/1.5; break;
        case 9: fill('#edc850'); textColor = 255;off=s/1.5; break;
        case 10: fill('#edc53f'); textColor = 255;off=s/1.1; break;
        case 11: fill('#edc53f'); textColor = 255;off=s/1.1; break;
        default: fill('#cac1b5')
      }
      
      noStroke()
      square((x + .5) * scl, (y + .5) * scl, scl-5,scl/30)
      fill(textColor)
      if (v != 0) text(pow(2, v), (x + .5) * scl - off- s / 4, (y + .5) * scl + s / 4)
      pop()
    }
  }
}

function unlinkCopy() {
  let r = []
  for (let i = 0; i < game.length; i++) {
    r.push([])
    for (let j of game[i]) {
      r[i].push(j)
    }
  }
  return r
}

function checkEquals(arr){
  for(let i = 0 ; i<4; i++){
    for(let j = 0; j<4;j++){
      if(game[i][j]!=arr[i][j]){
        return false;
      }
    }
  }
  return true
}

function keyPressed() {
  let x = unlinkCopy()
  switch (keyCode) {
    case 87:
      shiftUp();
      break;
    case 65:
      shiftLeft();
      break;
    case 83:
      shiftDown();
      break;
    case 68:
      shiftRight();
      break;
    case 38:
      shiftUp();
      break;
    case 37:
      shiftLeft();
      break;
    case 40:
      shiftDown();
      break;
    case 39:
      shiftRight();
      break;
  }
  if(!checkEquals(x))pickRandomSpot()
}

function shiftDown() {
  for (let x = 0; x < 4; x++) {
    let vacancies = 0;
    for (let y = 3; y >= 0; y--) {
      let v = game[y][x];
      if (v) {
        game[y][x] = 0
        try {
          if (game[y + vacancies + 1][x] == v) {
            game[y + vacancies + 1][x]++;
          } else game[y + vacancies][x] = v
        } catch {
          game[y + vacancies][x] = v
        }
      } else {
        vacancies++;
      }
    }
  }

}

function shiftUp() {
  for (let x = 0; x < 4; x++) {
    let vacancies = 0;
    for (let y = 0; y < 4; y++) {
      let v = game[y][x];
      if (v) {
        game[y][x] = 0
        try {
          if (game[y - vacancies - 1][x] == v) {
            game[y - vacancies - 1][x]++;
          } else game[y - vacancies][x] = v
        } catch {
          game[y - vacancies][x] = v
        }
      } else {
        vacancies++;
      }
    }
  }
}

function shiftLeft() {
  for (let y = 0; y < 4; y++) {
    let vacancies = 0
    for (let x = 0; x < 4; x++) {
      let v = game[y][x]
      if (v) {
        game[y][x] = 0;
        if (game[y][x - vacancies - 1] == v) {
          game[y][x - vacancies - 1]++;
          vacancies++
        } else game[y][x - vacancies] = v
      } else {
        vacancies++
      }
    }
  }
}

function shiftRight() {
  for (let y = 3; y > -1; y--) {
    let vacancies = 0
    for (let x = 3; x > -1; x--) {
      let v = game[y][x]
      if (v) {
        game[y][x] = 0;
        if (game[y][x + vacancies + 1] == v) {
          game[y][x + vacancies + 1]++;
          vacancies++
        } else game[y][x + vacancies] = v
      } else {
        vacancies++
      }
    }
  }
}
