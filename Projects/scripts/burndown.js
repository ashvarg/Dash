var lineData = {
    labels: ['2022-09-30', '2022-10-01', '2022-10-02', '2022-10-03', '2022-10-04', '2022-10-05', '2022-10-06'],
    datasets: [{
      label: 'Actual Hours',
      data: [8, 7, 5, 7, 6, 5, 5],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
      ],
      tasks: [0,0,-1,2,0,0,0],
    }, {
      label: 'Ideal Hours',
      data: [8, 7, 6, 5, 4, 3, 3],
      backgroundColor:'rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 0,
      fill: true,
      pointRadius: 0,
      hitRadius: 0
    }]
  };
var lineOptions = {
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

var Stuff = document.getElementById('myChart').getContext('2D')
var theChart = new Chart(Stuff, {type:'line', data: lineData, options: lineOptions})