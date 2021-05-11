const getMax = (data, metricLabel) => {
    let max = 0;
  
    for (let row of data) if (row[metricLabel] > max) max = row[metricLabel];
  
    return max;
  };
  
  export const generateAxisValues = (
    data,
    metricLabel,
    maxHeight = 380,
    tickHeight = 45,
    min = 0
  ) => {
    // generate the maximum number of axis
    let maxAxis = Math.ceil(maxHeight / tickHeight);
  
    // based on the maximun axis, generate all numbers between the minimum and maximum
    let allAxis = [];
  
    allAxis.push(min);
  
    // now get numbers between the given range
    let maxValue = getMax(data, metricLabel);
  
    let factor = Math.round((maxValue - min) / (maxAxis - 1));
  
    for (let i = 1; i < maxAxis; i++) {
      allAxis.push(allAxis[i - 1] + factor);
    }
  
    return allAxis;
  };
  