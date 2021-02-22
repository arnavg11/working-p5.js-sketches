class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  show(){
    push()
    strokeWeight(5)
    point(this.x,this.y)
    pop()
  }
}

class rectangle{
  constructor(x,y,w,h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  show(){
    push()
    rectMode(RADIUS)
    noFill()
    rect(this.x,this.y,this.w,this.h)
    pop()
  }
  isInside(p){
    return p.x>=(this.x-this.w)&&p.x<=(this.x+this.w)&&
      p.y>=(this.y-this.h)&&p.y<=(this.y+this.h)
  }
  subdivide(){
    let offx = this.x-this.w, offy = this.y-this.h
    let x = this.x-offx, y= this.y-offy
    return {
      nw: new rectangle(offx+x/2,offy+y/2,this.w/2,this.h/2),
      ne: new rectangle(offx+3*x/2,offy+y/2,this.w/2,this.h/2),
      se: new rectangle(offx+3*x/2,offy+3*y/2,this.w/2,this.h/2),
      sw: new rectangle(offx+x/2,offy+3*y/2,this.w/2,this.h/2),
    }
  }
  intersects(q){
    return abs(q.x-this.x)<(this.w+q.w)&&
      abs(q.y-this.y)<(this.h+q.h);
  }
}

class quadTree{
  constructor(b,c){
    this.bound = b;
    this.cap = c;
    this.ne = null;
    this.nw = null;
    this.sw = null;
    this.se = null;
    this.points = []
    this.isDivided = false
  }
  insert(p){
    if(!this.bound.isInside(p))return;
    if(this.isDivided){
      this.ne.insert(p);
      this.nw.insert(p);
      this.sw.insert(p);
      this.se.insert(p);
      return;
    }
    if(this.cap>this.points.length){
      this.points.push(p)
    }else{
      
      if(!this.isDivided){
        this.subdivide()
      }
      this.ne.insert(p);
      this.nw.insert(p);
      this.sw.insert(p);
      this.se.insert(p);
    }
  }
  subdivide(){
    this.isDivided = true;
    let rects = this.bound.subdivide()
    this.ne = new quadTree(rects.ne,this.cap)
    this.nw = new quadTree(rects.nw,this.cap)
    this.sw = new quadTree(rects.sw,this.cap)
    this.se = new quadTree(rects.se,this.cap)
    
    this.points.forEach((p)=>{
      this.ne.insert(p);
      this.nw.insert(p);
      this.sw.insert(p);
      this.se.insert(p);
    })
    
    this.points = null
  }
  show(){
    if(this.isDivided){
      this.nw.show()
      this.ne.show()
      this.se.show()
      this.sw.show()
    }else{
      this.bound.show()
    }
  }
  query(range,found = []){
    if(!this.bound.intersects(range))return []
    if(this.isDivided){
      this.nw.query(range, found)
      this.ne.query(range, found)
      this.se.query(range, found)
      this.sw.query(range, found)
    }else{
      this.points.forEach((p)=>{
        if(p.x>(range.x-range.w)&&p.x<(range.x+range.w)&&p.y>(range.y-range.h)&&p.y<(range.y+range.h)){
          found.push(p);
        }
      })
    }
    return found
  }
}