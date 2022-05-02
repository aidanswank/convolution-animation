// translated from https://learn.gold.ac.uk/mod/page/view.php?id=1107802

function convolve(signal, impulseResponse)
{
  outSize = signal.length + impulseResponse.length - 1;
  var output = new Array(outSize).fill(0); // zero out empty array with outsize
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