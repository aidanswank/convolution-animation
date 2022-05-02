var signal = [];
var impulse = [];
// console.log(signal.length+impulse.length-1)

function rotateCounterClockwise(a){
  var n=a.length;
  for (var i=0; i<n/2; i++) {
      for (var j=i; j<n-i-1; j++) {
          var tmp=a[i][j];
          a[i][j]=a[j][n-i-1];
          a[j][n-i-1]=a[n-i-1][n-j-1];
          a[n-i-1][n-j-1]=a[n-j-1][i];
          a[n-j-1][i]=tmp;
      }
  }
  return a;
}

function arr_shift(shift)
{
  arr = new Array(signal.length).fill(0);
  // arr[0] = 1;
  // var shift = shift // reverse shift
  for(var i = 0; i < impulse.length; i++)
  {
    var idx = (impulse.length-1)-i;
    var shift_index = i-shift;
    if(shift_index > -1 && shift_index < signal.length)
    {
      // console.log(shift_index);

      arr[shift_index] = impulse[idx]
    }
    // console.log(idx2);
  }
  return arr;
}

let slider;
var outlen;
var signal_input;
var impulse_input;
var sum_button;

// var grid = [];
var newgrid = [];
var shiftedImpulseGrid;
var multipliedGrid;
var resultGrid;

function create_shifted_impulse_arr()
{
  grid = [];
  outlen = (signal.length+impulse.length)-1;
  
  for(var row = 0; row < outlen; row++)
  {
    // arr = new Array(signal.length).fill(0);
    var shift = (impulse.length-1)-row // reverse shift
    var arr = arr_shift(shift);
    grid.push(arr);
  }

  return grid;
}

function setDataFromForums()
{
  sig_str = signal_input.value();
  imp_str = impulse_input.value();

  signal = sig_str.split(',');
  impulse = imp_str.split(',');
  // console.log(signal_input,impulse_input);

  signalGrid = new Grid([signal],0,offsetY); // a grid with 1 row but gonna use same object

  // console.log(create_shifted_impulse_arr());
  var shifted_arr = create_shifted_impulse_arr();
  shiftedImpulseGrid = new Grid(shifted_arr,0,signalGrid.yoff+20);

  multipliedGrid = new Grid([],0,0);

  resultGrid = new Grid([[1,2,3,4,5,6,7]],0,0);
  resultGrid.hide();
  // console.log(multipliedGrid);
}

var sig_idx;

function draw_gridhighlight(index,grid,width,height)
{
  fill(255, 0, 0 , 20);
  rect(grid.xoff-(width/3.5) + (index*grid.xspace), grid.yoff-25, width, height);
}

function sum_rows(grid)
{
  console.log(grid);
  var results = new Array(outlen).fill(0); // zero out empty array with outsize
  for(var i = 0; i < grid.length; i++)
  {
    for(var j = 0; j < grid[i].length; j++)
    {
      // console.log('row',i,grid[i][j]);
      results[j] += grid[i][j];
    }
  }
  // console.log(results)
  return results;
}

function sum_rows_callback()
{
  resultGrid.show();
  resultGrid.data = [ sum_rows(newgrid) ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // var mygrid = new Grid(5,2);
  // console.log(mygrid);
  
  signal_input = createInput();
  signal_input.position(10, 10);
  signal_input.value('1,-3,2,1,0,1');
  
  impulse_input = createInput();
  impulse_input.position(signal_input.x + signal_input.width, 10);
  impulse_input.value('3,2,1')

  button = createButton('submit');
  button.position(impulse_input.x + impulse_input.width, 10);
  button.mousePressed(setDataFromForums);

  
  slider = createSlider(0, 255, 200);
  slider.position(signal_input.x, signal_input.height*2);
  slider.style('width', '80px');
  
  sum_button = createButton('SUM ROWS');
  sum_button.mousePressed(sum_rows_callback);
  sum_button.position(slider.width+16, signal_input.height*2);  
  sum_button.hide();

  
  setDataFromForums();

}

var step = 0.0;
var offsetY = 100;
var offsetX = 16;

// console.log(window.innerWidth)

function draw() {

  let val = slider.value()/255;
  sig_idx =  Math.round( val*(signal.length-1) );
  // console.log(sig_idx);

  step+=0.01;

  if(sig_idx==(signal.length-1))
  {
    // console.log("MXXXX");
    sum_button.show();
  } else {
    sum_button.hide();
  }

  background(255);

  signalGrid.setPos((window.innerWidth-signalGrid.getWidth())/2,signalGrid.yoff);
  signalGrid.draw();

  draw_gridhighlight(sig_idx,signalGrid,32,32);

  push();
  textSize(64);
  translate(window.innerWidth/2-32, signalGrid.yoff+signalGrid.getHeight()+35);
  // rotate(radians(val)*360);
  fill(0,0,0);
  text('*',0,0);
  pop();

  // draw_grid(grid,16,offsetY,32);
  shiftedImpulseGrid.setPos((window.innerWidth-shiftedImpulseGrid.getWidth())/2,signalGrid.yoff+signalGrid.getHeight()+50);
  shiftedImpulseGrid.draw();
  rotate(0);

  draw_gridhighlight(sig_idx,shiftedImpulseGrid,32,shiftedImpulseGrid.getHeight())

  // draw_recthighlight(shiftedImpulseGrid);

  newgrid = [];
  for(var i = 0; i < sig_idx+1; i++)
  {
    var arr = [];
    for(var j = 0; j < outlen; j++)
    {
      var x = shiftedImpulseGrid.data[j][i]*signal[i];
      arr.push(x);
    }
    // console.log(arr);
    newgrid.push(arr);
  }

  multipliedGrid.data = newgrid;
  // console.log(shiftedImpulseGrid.data);
  // shiftedImpulseGrid.setPos((window.innerWidth-shiftedImpulseGrid.getWidth())/2,shiftedImpulseGrid.yoff)

  multipliedGrid.setPos((window.innerWidth-multipliedGrid.getWidth())/2, shiftedImpulseGrid.getHeight()+shiftedImpulseGrid.yoff+20);
  multipliedGrid.draw();

  resultGrid.setPos((window.innerWidth-resultGrid.getWidth())/2, multipliedGrid.getHeight()+multipliedGrid.yoff+20);
  resultGrid.draw();

  // draw_grid(newgrid,16,offsetY+300,32);

  // sum_rows(newgrid);


  // for(var i = 0; i < newgrid.length; i++)
  // {
  //   fill(0, 100, 100 );
  //   textSize(32);
  //   text(newgrid[i].toString(), 16, 300+32*(i+1));
  // }

  // var n = []
  // // sum rows
  // for(var j = 0; j < 2; j++)
  // {
  //   for(var i = 0; i < outlen; i++)
  //   {
  //       // console.log(newgrid[0][i]);
  //       n.push(newgrid[j][i]);
  //   }
  //   console.log(n);
  // }
  
  // textSize(32);
  // str = "["+signal.join()+"]";
  // text(str, 8, 80);
  // fill(0, 102, 153);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}