function lerp(a, b, f)
{
  return a + f * (b - a);
}

/*
    these functions arent practical solutions for computing convolutions!
    They are just meant for displaying a series of steps to show one 
    possible way a convolution could be calculated
*/

////////////////
/*
    shift impulse response array right or left
    to display the different "shifted" copies
    <------
    1,2,3,0
    2,3,0,0
    3,0,0,0
*/
function arr_shift(shift,signal,impulse)
{
  arr = new Array(signal.length).fill(0);
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

/*
    create shifted impulse grid
    [1,0,0]
    [2,1,0]
    [0,2,1]
    [0,0,2]
*/
function create_shifted_impulse_arr(signal,impulse)
{
  grid = [];
  outlen = (signal.length+impulse.length)-1;
  
  for(var row = 0; row < outlen; row++)
  {
    // arr = new Array(signal.length).fill(0);
    var shift = (impulse.length-1)-row // reverse shift
    var arr = arr_shift(shift,signal,impulse);
    grid.push(arr);
  }

  return grid;
}

function sum_rows(grid)
{
  // console.log(grid);
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
////////////////////////

// for "*" and "=" symbols
function big_text(str,size,x,y)
{
  push();
  textSize(size);
  translate(x,y);
  fill(0,0,0);
  text(str,0,0);
  pop();
}

// x y pos
class vec2 {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

// for colors
class vec3 {
    constructor(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// not a "slider" like a gui but an object that "slides"
// around using linear interpolation 
class lerpSlider
{
    constructor(speed) {
        // this.steps = 0;
        this.speed = speed;
        this.target_pos = new vec2(0,0);
        this.current_pos = new vec2(0,0);
        this.reachedEnd = false;
    }
    reset()
    {
        this.tick = 0;
    }
    setTarget(x,y)
    {
        this.target_pos.x = x;
        this.target_pos.y = y;
    }
    update()
    {
        // slide_y_target = val*100;

        // if( this.step < 2000 ){
        this.current_pos.x = lerp(this.current_pos.x, this.target_pos.x, this.speed);
        this.current_pos.y = lerp(this.current_pos.y, this.target_pos.y, this.speed);
        // } this.step += 1;
    }
}