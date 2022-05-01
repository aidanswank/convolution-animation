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

var signal = [1,-3,2,1,0,1];
var impulse = [3,2,1];
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

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(0, 255, 100);
  slider.position(10, 10);
  slider.style('width', '80px');

  // console.log(convolve(signal,impulse));
  grid = [];

  outlen = (signal.length+impulse.length)-1;

  for(var row = 0; row < outlen; row++)
  {
    // arr = new Array(signal.length).fill(0);
    var shift = (impulse.length-1)-row // reverse shift
    var arr = arr_shift(shift);
    grid.push(arr);
  }

  // console.log(grid)
  // var x = signal[i];
  // for(var i = 0; i < outlen; i++)
  // {
  //   console.log(grid[i][0],x);
  //   // for(var j = 0; j < grid.length; j++)
  //   // {
  //   //   // for(var k = 0; k < grid[j].length; k++)
  //   //   // {

  //   //   // }
  //   // }
  // }

  // console.log(arr);


}

step = 0.0;



function draw() {

  let val = slider.value()/255;
  var sig_idx =  Math.round( val*(signal.length-1) );
  console.log(sig_idx);

  step+=0.01;

  background(220);

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
      textSize(32);
      str = cell.toString();
      text(str, 16+j*32,38+i*32);
    }
  }

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
    rect(16 + (sig_idx*32), 4, 16, 32*outlen);
  }

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

  console.log(newgrid);
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