function updateChart(hours, date){
  console.log(hours);
  console.log(date);
}

var getDateArray = function(start, end) {
  for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
  }
  return arr;
}

const charData = {
  labels: [],
  datasets: [{
    label: 'Actual Hours',
    data: [],
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
    ],  
  }, {
    label: 'Ideal Hours',
    data: [8, 7, 6, 5, 4, 3, 3],
    backgroundColor:'rgba(0, 0, 0, 0.2)',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 0,
    fill: true,
    pointRadius: 0,
    hitRadius: 0,
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

