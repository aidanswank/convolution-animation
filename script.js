var signal = [];
var impulse = [];
// console.log(signal.length+impulse.length-1)

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

// set data from forums to arrays
// parse commas to arrays
// create grid objects
function setDataFromForums()
{
  sig_str = signal_input.value();
  imp_str = impulse_input.value();

  signal = sig_str.split(',');
  impulse = imp_str.split(',');
  // console.log(signal_input,impulse_input);

  signalGrid = new Grid([signal],0,offsetY); // a grid with 1 row but gonna use same object

  // console.log(create_shifted_impulse_arr());
  var shifted_arr = create_shifted_impulse_arr(signal,impulse);
  shiftedImpulseGrid = new Grid(shifted_arr,0,signalGrid.yoff+20);

  multipliedGrid = new Grid([],0,0);

  resultGrid = new Grid([[1,2,3,4,5,6,7]],0,0);
  resultGrid.hide();
  // console.log(multipliedGrid);
}

// signal index selector controlled by silder
var sig_idx;

// for the blue highlights over the grids
function draw_gridhighlight(index,grid,width,height)
{
  fill(0, 0, 255 , 40);
  rect(grid.xoff-(width/3.5) + (index*grid.xspace), grid.yoff-25, width, height);
}

// html forum callback for "sum rows" button
function sum_rows_callback()
{
  resultGrid.show();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // var mygrid = new Grid(5,2);
  // console.log(mygrid);
  
  signal_input = createInput();
  signal_input.position(10, 10);
  signal_input.value('1,2,3');
  
  impulse_input = createInput();
  impulse_input.position(signal_input.x + signal_input.width, 10);
  impulse_input.value('-1,1')

  button = createButton('submit');
  button.position(impulse_input.x + impulse_input.width, 10);
  button.mousePressed(setDataFromForums);

  
  slider = createSlider(0, 255, 200);
  slider.position(signal_input.x, signal_input.height*2);
  slider.style('width', '100px');
  slider.value(0);
  
  sum_button = createButton('SUM ROWS');
  sum_button.mousePressed(sum_rows_callback);
  sum_button.position(slider.width+16, signal_input.height*2);  
  sum_button.hide();

  
  setDataFromForums();

}

var step = 0.0;
// for placing middle of screen
var offsetY = 90;
var offsetX = 16;

var slide_y = 0;
var slide_y_target = 0;

function draw() {

  let val = slider.value()/255;
  sig_idx =  Math.round( val*(signal.length-1) );
  // console.log(sig_idx);

  // step+=0.01;

  // when slider dragged to the very end
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

  strokeWeight(1);
  draw_gridhighlight(sig_idx,signalGrid,32,32);

  big_text("*", 64, window.innerWidth/2-32, signalGrid.yoff+signalGrid.getHeight()+35);

  shiftedImpulseGrid.setPos((window.innerWidth-shiftedImpulseGrid.getWidth())/2,signalGrid.yoff+signalGrid.getHeight()+50);
  shiftedImpulseGrid.draw();
  // rotate(0);

  draw_gridhighlight(sig_idx,shiftedImpulseGrid,32,shiftedImpulseGrid.getHeight())

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

  big_text("=", 50, window.innerWidth/2-34, shiftedImpulseGrid.yoff+shiftedImpulseGrid.getHeight()+12);
  
  multipliedGrid.data = newgrid;
  // console.log(shiftedImpulseGrid.data);
  // shiftedImpulseGrid.setPos((window.innerWidth-shiftedImpulseGrid.getWidth())/2,shiftedImpulseGrid.yoff)
  slide_y_target = val*100;

  if( step < 2000 ){
    slide_y = lerp(slide_y, slide_y_target, 0.125);
  } step += 1;

  // console.log(slide_y);

  multipliedGrid.setPos((window.innerWidth-multipliedGrid.getWidth())/2+slide_y, shiftedImpulseGrid.getHeight()+shiftedImpulseGrid.yoff+40);
  multipliedGrid.draw();

  strokeWeight(4); // Thicker
  line((window.innerWidth-300)/2, multipliedGrid.getHeight()+multipliedGrid.yoff-15, (window.innerWidth-300)/2+265,  multipliedGrid.getHeight()+multipliedGrid.yoff-15);

  resultGrid.setPos((window.innerWidth-resultGrid.getWidth())/2, multipliedGrid.getHeight()+multipliedGrid.yoff+20);
  resultGrid.draw();

  resultGrid.data = [ sum_rows(newgrid) ];


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}