/* 
    Purpose: Chart logic for burndown chart implementation
    Date Modified: 17/10/2022
    Contributors: Ashwin George
    Reviewer: Arosh Heenkenda
*/

// Data Object to be added to the chart 
const charData = {
  labels: [],
  datasets: [{
    label: 'Remaining Hours',
    data: [],
    backgroundColor: [
      '#274690',
    ],
    borderColor: [
      '#274690',
    ],  
  }, {
    label: 'Ideal Hours',
    data: [],
    backgroundColor:'rgba(0, 0, 0, 0.2)',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 0,
    fill: true,
    pointRadius: 0,
    hitRadius: 0,
  }, {
    label: 'Cumulative Hours',
    data: [],
    backgroundColor: [
      '#34F6F2',
    ],
    borderColor: [
      '#34F6F2',
    ],  
  }]
};

// configurations for chart 
const config = {
  type: 'line',
  data: charData,
  options: {
    plugins: {  
      legend: {
        labels: {
          color: "#3E92CC",  
          font: {
            size: 13
          }
        }
      },
      labels: {
        fontColor: "#3E92CC",
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#3E92CC'
        },
        title: {
          display: true,
          text: '',
          color: '#3E92CC',
        },
        type: 'time',
        time: {
          unit: 'day'
        }
      },
      y: {
        ticks: {
          color: '#3E92CC'
        },
        title: {
          display: true,
          text: 'Hours',
          color: '#3E92CC'
        },
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};

// Initialising the chart 
var myChart = document.getElementById('myChart').getContext('2d');
var theChart = new Chart(myChart, config);

/**
 * Creates an array of dates
 * @param {*} start Starting Date
 * @param {*} end Ending Date
 * @returns Array of dates from start to end
 */
function getDateArray(start, end) {
  let arr = [];
  for(let dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
    dt.setHours(0,0,0,0);
    arr.push(new Date(dt));
  }
  return arr;
}

/**
 * Configures chart and allows display to occur during toggle function 
 */
function changeChart(){
  loadlistOfSprints();
  let startDate = listOfSprints[sprintIndex.index]["start"];
  let endDate = listOfSprints[sprintIndex.index]["end"];
  // Gets an array of dates from start to end
  arrayOfDates = getDateArray(startDate, endDate);
  theChart.config.data.labels = arrayOfDates;
  // Sets the ideal velocity to display in the graph
  setAvgVelocity();
  theChart.update();
}

/**
 * Creates the Ideal Velocity Graph 
 */
function setAvgVelocity(){
  loadlistOfSprints();
  // Searches and adds up all story points 
  let storyTotal = findTotalStoryP();
  let startDate = listOfSprints[sprintIndex.index]["start"];
  let endDate = listOfSprints[sprintIndex.index]["end"];
  let arrayOfDates = getDateArray(startDate, endDate);

  let dateLength = arrayOfDates.length;
  // Creates an array of evenly spaced values
  let velArray = linspace_fun(storyTotal, 0, dateLength);
  theChart.config.data.datasets[1]['data'] = velArray;
  theChart.update();
}

/**
 * Function gets total number of story points in sprint
 * @returns Total number of story points accumulated from each task in a sprint
 */
function findTotalStoryP(){
  loadlistOfSprints();
  let storyTotal = 0;
  // Adds story points from tasks that have not been started
  if (listOfSprints[sprintIndex.index]['notStarted'].length > 0){
    for (let i = 0; i < listOfSprints[sprintIndex.index]['notStarted'].length; i++){
      card = listOfSprints[sprintIndex.index]['notStarted'][i]['card'];
      storyTotal += parseInt(card['_storyPoints']);
    } 
  }
  // Adds story points from tasks that are in progress
  if (listOfSprints[sprintIndex.index]['inProgress'].length > 0){
    for (let i = 0; i < listOfSprints[sprintIndex.index]['inProgress'].length; i++){
      card = listOfSprints[sprintIndex.index]['inProgress'][i]['card'];
      storyTotal += parseInt(card['_storyPoints']);
    } 
  }
  // Adds story points from tasks that are completed
  if (listOfSprints[sprintIndex.index]['complete'].length > 0){
    for (let i = 0; i < listOfSprints[sprintIndex.index]['complete'].length; i++){
      card = listOfSprints[sprintIndex.index]['complete'][i]['card'];
      storyTotal += parseInt(card['_storyPoints']);
    } 
  }
  return storyTotal;
}

/**
 * Creates an array of evenly spaced values
 * @param {*} start starting element
 * @param {*} stop ending element
 * @param {*} cardinality Number of elements in the array
 * @returns 
 */
function linspace_fun(start, stop, cardinality){
  let spaced_arr = [];
  // Spacing between each data point
  let step = (stop - start) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) {
    spaced_arr.push(start + (step * i));
  }
  return spaced_arr;
}

/**
 * Logs time through user input and displays relevant lines in the chart 
 * @param {*} time number of hours logged
 * @param {*} date date logged 
 */
function chartTimeLog(time, date){
  loadlistOfSprints()

  let startDate = listOfSprints[sprintIndex.index]["start"];
  let endDate = listOfSprints[sprintIndex.index]["end"];
  let arrayOfDates = getDateArray(startDate, endDate);
  // Checks if the list is empty, if it is, create an array with number of Null values equal to the number of dates 
  if (listOfSprints[sprintIndex.index]['burnHours'].length == 0){

    for (let i = 0; i < arrayOfDates.length; i++){
      // Pushes Null values into burndown hours array
      listOfSprints[sprintIndex.index]['burnHours'].push(NaN);
      // Pushes Null values into cumulative hours array
      listOfSprints[sprintIndex.index]['cumHours'].push(NaN);
      saveListOfSprints();
    }
  }
  // Total number of story points in the sprint 
  let storyTotal = findTotalStoryP();
  
  let dt = new Date(date);
  dt.setHours(0,0,0,0);
  let cumVal = 0;
  let burnVal = storyTotal;
  // Checks if date input is equal to the date being looked for 
  for (let i = 0; i < arrayOfDates.length; i++){
    if (dt.getTime() == arrayOfDates[i].getTime()){
      let burnArr = listOfSprints[sprintIndex.index]['burnHours'];
      let cumArr = listOfSprints[sprintIndex.index]['cumHours'];
      // Checks for smallest value in array to decrement the time logged by user 
      for (let j = 0; j < burnArr.length; j++){
        if ((burnArr[j] < burnVal) && (burnArr[j] != null)){
          burnVal = burnArr[j];
        }
      }
      // Checks for largest value in array to increment the time logged by user 
      for (let k = 0; k < cumArr.length; k++){
        if ((cumArr[k] > cumVal) && (cumArr[k] != null)){
          cumVal = cumArr[k];
        }
      }

      burnVal = burnVal - time;
      cumVal = cumVal + time;
      // Checks if value is already in the date, if so, decrement the date
      if (listOfSprints[sprintIndex.index]['burnHours'][i] != null){
        listOfSprints[sprintIndex.index]['burnHours'][i] -= time;
      }
      // Replace null with the new value 
      else{

        listOfSprints[sprintIndex.index]['burnHours'][i] = burnVal;
      }
      // Checks if value is already in the date, if so, increment the date
      if(listOfSprints[sprintIndex.index]['cumHours'][i] != null){

        listOfSprints[sprintIndex.index]['cumHours'][i] += time; 
      }
      // Replace null with the new value 
      else{

        listOfSprints[sprintIndex.index]['cumHours'][i] = cumVal;

      }
      
    }

  }
  // Configures the data sets 

  theChart.config.data.datasets[0]['data'] = listOfSprints[sprintIndex.index]['burnHours'];
  theChart.config.data.datasets[2]['data'] = listOfSprints[sprintIndex.index]['cumHours'];
  theChart.update();

  saveListOfSprints();
}

/**
 * Displays data when loaded 
 */
function displayDataOnload(){
  loadlistOfSprints()
  theChart.config.data.datasets[0]['data'] = listOfSprints[sprintIndex.index]['burnHours'];
  theChart.config.data.datasets[2]['data'] = listOfSprints[sprintIndex.index]['cumHours'];
}