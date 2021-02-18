var slidermin,slidermax


function setup() {
  createCanvas(400, 400);  pixelDensity(1)
  background(0)
  slidermin = createSlider(-2.5,0,-2.5,0.01)
  slidermax = createSlider(0,2.5,2.5,0.01)
}

function draw() {
  var u = slidermin.value(), v = slidermax.value()
  loadPixels()
  for(var x =0; x<width;x++){
    for(var y=0;y<height;y++){
      var p = (x+y*width)*4
      var grade = 0
      var ca=map(x,0,width,slidermin.value(),slidermax.value());var cb = map(y,0,height,slidermin.value(),slidermax.value())
      var za = 0;var zb=0
      var max_it = 125
      var it,sqa,sqb
      for(it = 0; it<max_it;it++){
        sqa = za*za-zb*zb;sqb = 2*za*zb
        za = sqa + ca
        zb= sqb+cb
        if((za+zb)>19){
          break
        }
      }
      grade = map(sqrt(map(it,0,max_it,0,1)),0,1,0,255)
      if(max_it  == it){grade = 0}
      pixels[p] = grade
      pixels[p+1] = grade
      pixels[p+2] = grade
      pixels[p+3] = 255
    }
  }
    updatePixels()
}