function convolve(signal, impulseResponse)
{
  outSize = signal.length + impulseResponse.length - 1;
  var output = new Array(outSize).fill(0);
  for(var n = 0; n < outSize; n++)
  {
    // For the inner loop, we need to find the range where the signal and the impulse response overlap.
    var kmax = n;
    var kmin = 0;
		// set kmax so k doesn't go beyond the signal length
		if (n > signal.length - 1)
		{
      kmax = signal.length - 1;
		}
		//set kmin so we don't go beyond the end of the impulse response
		if (n >= impulseResponse.length - 1) {
      console.log("n is more or equal to (impulseRes len-1)")
      kmin = n - (impulseResponse.length - 1);
		}
		for (var k = kmin; k <= kmax; k++) {
      output[n] += signal[k] * impulseResponse[n - k];
      // console.log("n ",n," kmin ",kmin," k",k," out[n]" ,output[n]);
      console.log("n",n,"k",k,"n-k=",n-k,"impulse[n-k]",impulseResponse[n - k],"signal[k]",signal[k]);
		}
  }
  
  return output;
}

var signal = [];
var impulse = [];
// console.log(signal.length+impulse.length-1)

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

var grid = [];
var newgrid = [];

function create_grid()
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
}

function setDataFromForums()
{
  sig_str = signal_input.value();
  imp_str = impulse_input.value();

  signal = sig_str.split(',');
  impulse = imp_str.split(',');
  console.log(signal_input,impulse_input);


  create_grid();
}

var sig_idx;
function draw_recthighlight()
{
  // console.log(sig_idx)
  for(var row = 0; row < signal.length; row++)
  {
    // arr = new Array(signal.length).fill(0);
    // var shift = (impulse.length-1)-row // reverse shift
    // var arr = arr_shift(shift);

    // grid.push(arr);
    
    // fill(0, 102, 153 );
    // textSize(32);
    // str = "["+grid[row].join()+"]";
    // text(str, 8, 32*(row+1));

    fill(0, 100, 100 );
    textSize(32);
    str = signal[row].toString();
    text(str, 400, 32*(row+1));

    
    // var idx2 =  Math.round( val*(signal.length-1) );
    // console.log( idx2 );
    // rec a
    fill(255, 0, 0 , 20);
    rect(400, 4+(sig_idx*32), 32, 32);
    // rec b
    fill(255, 0, 0 , 20);
    rect(16 + (sig_idx*32), offsetY-28, 16, 32*outlen);
  }
}

function sum_rows(grid)
{
  console.log(grid)
}

function sum_rows_callback()
{
  sum_rows(newgrid)
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(0, 255, 100);
  slider.position(10, 40);
  slider.style('width', '80px');
  
  signal_input = createInput();
  signal_input.position(10, 10);
  signal_input.value('1,-3,2,1,0,1');
  
  impulse_input = createInput();
  impulse_input.position(170, 10);
  impulse_input.value('3,2,1')

  button = createButton('submit');
  button.position(impulse_input.x + impulse_input.width, 10);
  button.mousePressed(setDataFromForums);

  sum_button = createButton('SUM ROWS');
  sum_button.mousePressed(sum_rows_callback);
  sum_button.position(110, 40);  
  sum_button.hide();
  
  // console.log(convolve(signal,impulse));
  setDataFromForums();
  create_grid();

}

var step = 0.0;
var offsetY = 100;

function draw_grid(grid,offx,offy,spacing)
{
  for(var i = 0; i < grid.length; i++)
  {
    for(var j = 0; j < grid[i].length; j++)
    {
      // console.log(grid[i][j])
      var cell = grid[i][j];
      if(cell==0)
      {
        fill(25, 0, 100 );
      } else {
        fill(100, 200, 100 );
      }
      textSize(24);
      str = cell.toString();
      text(str, offx+(j*spacing),offy+(i*spacing));
    }
  }
}

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

  background(220);

  draw_grid(grid,16,offsetY,32);
  // for(var i = 0; i < grid.length; i++)
  // {
  //   for(var j = 0; j < grid[i].length; j++)
  //   {
  //     // console.log(grid[i][j])
  //     var cell = grid[i][j];
  //     if(cell==0)
  //     {
  //       fill(25, 0, 100 );
  //     } else {
  //       fill(100, 200, 100 );
  //     }
  //     textSize(32);
  //     str = cell.toString();
  //     text(str, 16+j*32,offsetY+i*32);
  //   }
  // }
  
  draw_recthighlight();

  newgrid = [];
  for(var i = 0; i < sig_idx+1; i++)
  {
    var arr = [];
    for(var j = 0; j < outlen; j++)
    {
      var x = grid[j][i]*signal[i];
      arr.push(x);
    }
    // console.log(arr);
    newgrid.push(arr);
  }

  draw_grid(newgrid,16,offsetY+300,32);

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