class Grid {
  constructor(data, xoff, yoff)
  {
    // this.rows = rows;
    // this.columns = columns;
    this.xoff = xoff;
    this.yoff = yoff;
    this.xspace = 48;
    this.yspace = 32;
    this.textSize = 24;
    this.data = data;
  }
  getHeight()
  {
    return this.data.length*(this.yspace);
  }
  getWidth()
  {
    return this.data[0].length*(this.xspace);
  }
  setPos(x,y)
  {
    this.xoff = x;
    this.yoff = y;
  }
  draw()
  {
    for(var i = 0; i < this.data.length; i++)
    {
      for(var j = 0; j < this.data[i].length; j++)
      {
        textSize(this.textSize);
        var cell = this.data[i][j];
        str = cell.toString();
        
        if(cell==0)
        {
          fill(25, 0, 100 );
        } else {
          fill(100, 200, 100 );
        }
        // textFont('Helvetica');
        text(str, this.xoff+(j*this.xspace),this.yoff+(i*this.yspace));
      }
    }
  }
};