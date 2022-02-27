//Everything entered by the user in the first list including the commas
var numbersString;
//Everything entered by the user in the second list including the commas
var numbersString2; 
//A list to store all of the numbers entered by the user in the first list as Strings
var numbersStringList = [];
//A list to store all of the numbers entered by the user in the second list as Strings
var numbersStringList2 = [];
//A list to store all of the numbers entered in the first list by the user as Numbers
var numbers = [];
//A list to store all of the numbers entered in the second list by the user as Numbers
var numbers2 = [];

//When the calculate button is clicked
onEvent("calculateButton", "click", function( ) 
{
  setScreen("statisticsScreen");
  numbersString = getText("userInput");
  numbersStringList = numbersString.split(",");
  numbersString2 = getText("userInput2");
  numbersStringList2 = numbersString2.split(",");
  
  for(var i = 0; i < numbersStringList.length; i++) 
  {
    numbers[i] = Number(numbersStringList[i]);
  }
  
  for(var j = 0; j < numbersStringList2.length; j++) 
  {
    numbers2[j] = Number(numbersStringList2[j]);
  }
  //Arranges the numbers in ascending order
  numbers.sort();
  numbers2.sort();
  console.log(numbers2);
  //Variables that store the values of the statistics correspondning to each list
  var mean = calculateMean(numbers);
  var median = findMedian(numbers);
  var mode = findMode(numbers);
  var sum = calculateSum(numbers);
  var populationStandardDeviation = calculatePopulationStandardDeviation(numbers);
  var sampleStandardDeviation = calculateSampleStandardDeviation(numbers);
  var sampleSize = getSampleSize(numbers);
  var minimum = findMinimum(numbers);
  var maximum = findMaximum(numbers);
  
  var mean2 = calculateMean(numbers2);
  var median2 = findMedian(numbers2);
  var mode2 = findMode(numbers2);
  var sum2 = calculateSum(numbers2);
  var populationStandardDeviation2 = calculatePopulationStandardDeviation(numbers2);
  var sampleStandardDeviation2 = calculateSampleStandardDeviation(numbers2);
  var sampleSize2 = getSampleSize(numbers2);
  var minimum2 = findMinimum(numbers2);
  var maximum2 = findMaximum(numbers2);
  
  //Stores the data meant to be printed out for the user corresponding to each list
  var toString = "Mean: " + mean + "\nMedian: " + median + "\nMode: " + mode + "\nSum: " + sum + "\nPopulation Standard Deviation: " +
  populationStandardDeviation + "\nSample Standard Deviation: " + sampleStandardDeviation + "\nSample Size: " + 
  sampleSize + "\nMinimum: " + minimum + "\nMaximum: " + maximum;
  
  var toString2 = "Mean: " + mean2 + "\nMedian: " + median2 + "\nMode: " + mode2 + "\nSum: " + sum2 + "\nPopulation Standard Deviation: " +
  populationStandardDeviation2 + "\nSample Standard Deviation: " + sampleStandardDeviation2 + "\nSample Size: " + 
  sampleSize2 + "\nMinimum: " + minimum2 + "\nMaximum: " + maximum2;
  
  setText("statsOutput", toString);
  setText("statsOutput2", toString2);
});

//Button that enables the user to return to the data input screen
onEvent("backButton", "click", function( ) 
{
  setScreen("inputScreen");
});



function calculateSum(numbers)
{
  var sum = 0;
  for(var i = 0; i < numbers.length; i++)
  {
    sum += numbers[i];  
  }
  
  return sum;
}

function calculateMean(numbers) {
  var mean = 0;
  var sum = calculateSum(numbers);
  mean = sum / numbers.length;
  return mean;
}

function calculatePopulationStandardDeviation(numbers) {
  var mean = calculateMean(numbers);
  var deviationSquared;
  var sumOfDeviations = 0;
  var variance;
  var populationStandardDeviation;
  for(var i = 0; i < numbers.length; i++)
  {
    deviationSquared = Math.pow(numbers[i] - mean, 2); 
    sumOfDeviations += deviationSquared;
  }
  
  variance = sumOfDeviations / numbers.length;
  populationStandardDeviation = Math.sqrt(variance);
  return populationStandardDeviation;
}

function calculateSampleStandardDeviation(numbers) {
  var mean = calculateMean(numbers);
  var deviationSquared;
  var sumOfDeviations = 0;
  var sampleStandardDeviation;
  var variance;
  for(var i = 0; i < numbers.length; i++)
  {
    deviationSquared = Math.pow(numbers[i] - mean, 2); 
    sumOfDeviations += deviationSquared;
  }
  variance = sumOfDeviations / (numbers.length - 1);
  sampleStandardDeviation = Math.sqrt(variance);
  return sampleStandardDeviation;
}

function getSampleSize(numbers) {
  return numbers.length;
}

function findMinimum(numbers) {
  var min = numbers[0];
  for(var i = 0; i < numbers.length; i++)
  {
    if(numbers[i] < min)
    {
      min = numbers[i];
    }
  }
  
  return min;
}

function findMaximum(numbers) {
  var max = numbers[0];
  for(var i = 0; i < numbers.length; i++)
  {
    if(numbers[i] > max)
    {
      max = numbers[i];
    }
  }
  
  return max;
}

function findMedian(numbers)
{
  var medianIndex = (numbers.length + 1) / 2 - 1;
  var median;
  var firstNum;
  var secondNum;
  if(medianIndex % 1 == 0)
  {
    median = numbers[medianIndex];
    return median;
  }
  else
  {
    firstNum = numbers[medianIndex - (medianIndex % 1)];
    secondNum = numbers[medianIndex - (medianIndex % 1) + 1];
    median = (firstNum + secondNum) / 2;
    return median;
  }
}

function findMode(numbers) {
  //Stores the amount of times a number appears
  var count = 0;
  //Stores the maximum amount of times a number appeared
  var maxCount = 0;
  //Stores the number(s) that appeared most
  var mode = [];
  //Stores the counts for each number in the list
  //Note: the count for the last number the user entered is not stored in this list 
  //since the count for this number can never be the maximum count
  var countsList = [];
  //Stores the index of the mode
  var modeIndex;
  
  //Nested loops, outer loop traverses from beginning to end of list 
  //Inner traverses from i + 1 to the end of list, counting how many times numbers[i] repeats 
  for(var i = 0; i < numbers.length - 1; i++)
  {
    count = 0;
    for(var j = i + 1; j < numbers.length; j++)
    {
      if(numbers[i] == numbers[j])
      {
        count++;
      }
    }
    appendItem(countsList, count);
  }
  
  //Traverses through the countsList and finds the maximum count
  //Then matches the index of that maximum count to the corresponding index in the numbers list to get the mode
  for(var k = 0; k < countsList.length; k++)
  {
    if(countsList[k] > maxCount)
    {
      maxCount = countsList[k];
      modeIndex = k;
    }
  }
  
  appendItem(mode, numbers[modeIndex]);
  
  //This if statement checks if a mode has been found
  if(mode[0] != null)
  {
    //This loops traverses through the countsList to check if there is a second mode
    for(var l = 0; l < countsList.length; l++)
    {
      if(l != modeIndex && countsList[l] == maxCount)
      {
        appendItem(mode, numbers[l]);
      }
    }
    
    return mode;
    
    
  }
  
  else
  {
    return "No Mode";
  }
}
