
const charData = {
  labels: [],
  datasets: [{
    label: 'Remaining Hours',
    data: [],
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
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
      'rgba(80, 51, 213, 0.8)',
    ],
    borderColor: [
      'rgba(80, 51, 213, 0.8)',
    ],  
  }]
};

// config 
const config = {
  type: 'line',
  data: charData,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: ''
        },
        type: 'time',
        time: {
          unit: 'day'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Hours'
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


var myChart = document.getElementById('myChart').getContext('2d');
var theChart = new Chart(myChart, config);


function getDateArray(start, end) {
  let arr = [];
  for(let dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
    dt.setHours(0,0,0,0);
    arr.push(new Date(dt));
  }
  return arr;
}


function changeChart(){
  loadlistOfSprints();
  let startDate = listOfSprints[sprintIndex.index]["start"];
  let endDate = listOfSprints[sprintIndex.index]["end"];
  arrayOfDates = getDateArray(startDate, endDate);
  theChart.config.data.labels = arrayOfDates;
  setAvgVelocity();
  theChart.update();
}

function setAvgVelocity(){
  loadlistOfSprints();
  let storyTotal = findTotalStoryP();
  let startDate = listOfSprints[sprintIndex.index]["start"];
  let endDate = listOfSprints[sprintIndex.index]["end"];
  let arrayOfDates = getDateArray(startDate, endDate);

  let dateLength = arrayOfDates.length;
  let velArray = linspace_fun(storyTotal, 0, dateLength);
  theChart.config.data.datasets[1]['data'] = velArray;
  theChart.update();
}

function findTotalStoryP(){
  loadlistOfSprints();
  let storyTotal = 0;
  if (listOfSprints[sprintIndex.index]['notStarted'].length > 0){
    for (let i = 0; i < listOfSprints[sprintIndex.index]['notStarted'].length; i++){
      card = listOfSprints[sprintIndex.index]['notStarted'][i]['card'];
      storyTotal += parseInt(card['_storyPoints']);
    } 
  }

  if (listOfSprints[sprintIndex.index]['inProgress'].length > 0){
    for (let i = 0; i < listOfSprints[sprintIndex.index]['inProgress'].length; i++){
      card = listOfSprints[sprintIndex.index]['inProgress'][i]['card'];
      storyTotal += parseInt(card['_storyPoints']);
    } 
  }

  if (listOfSprints[sprintIndex.index]['complete'].length > 0){
    for (let i = 0; i < listOfSprints[sprintIndex.index]['complete'].length; i++){
      card = listOfSprints[sprintIndex.index]['complete'][i]['card'];
      storyTotal += parseInt(card['_storyPoints']);
    } 
  }
  return storyTotal;
}


function linspace_fun(start, stop, cardinality){
  let spaced_arr = [];
  let step = (stop - start) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) {
    spaced_arr.push(start + (step * i));
  }
  return spaced_arr;
}

// Logs the time in the chart 
function chartTimeLog(time, date){
  loadlistOfSprints()

  let startDate = listOfSprints[sprintIndex.index]["start"];
  let endDate = listOfSprints[sprintIndex.index]["end"];
  let arrayOfDates = getDateArray(startDate, endDate);
  
  if (listOfSprints[sprintIndex.index]['burnHours'].length == 0){

    for (let i = 0; i < arrayOfDates.length; i++){
      listOfSprints[sprintIndex.index]['burnHours'].push(NaN);
      listOfSprints[sprintIndex.index]['cumHours'].push(NaN);
      saveListOfSprints();
    }
  }
  
  let storyTotal = findTotalStoryP();
  
  let dt = new Date(date);
  dt.setHours(0,0,0,0);
  let cumVal = 0;
  let burnVal = storyTotal;

  for (let i = 0; i < arrayOfDates.length; i++){
    if (dt.getTime() == arrayOfDates[i].getTime()){
      let burnArr = listOfSprints[sprintIndex.index]['burnHours'];
      let cumArr = listOfSprints[sprintIndex.index]['cumHours'];
      for (let j = 0; j < burnArr.length; j++){
        if ((burnArr[j] < burnVal) && (burnArr[j] != null)){
          burnVal = burnArr[j];
        }
      }

      for (let k = 0; k < cumArr.length; k++){
        if ((cumArr[k] > cumVal) && (cumArr[k] != null)){
          cumVal = cumArr[k];
        }
      }

      burnVal = burnVal - time;
      cumVal = cumVal + time;

      if (listOfSprints[sprintIndex.index]['burnHours'][i] != null){
        listOfSprints[sprintIndex.index]['burnHours'][i] -= time;
      }
      else{

        listOfSprints[sprintIndex.index]['burnHours'][i] = burnVal;
      }

      if(listOfSprints[sprintIndex.index]['cumHours'][i] != null){

        listOfSprints[sprintIndex.index]['cumHours'][i] += time; 
      }
      else{

        listOfSprints[sprintIndex.index]['cumHours'][i] = cumVal;

      }
      
    }

  }

  theChart.config.data.datasets[0]['data'] = listOfSprints[sprintIndex.index]['burnHours'];
  theChart.config.data.datasets[2]['data'] = listOfSprints[sprintIndex.index]['cumHours'];
  theChart.update();

  saveListOfSprints();
}

function displayDataOnload(){
  loadlistOfSprints()
  theChart.config.data.datasets[0]['data'] = listOfSprints[sprintIndex.index]['burnHours'];
  theChart.config.data.datasets[2]['data'] = listOfSprints[sprintIndex.index]['cumHours'];
}