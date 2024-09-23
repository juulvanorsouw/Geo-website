const xValues1 = [
"8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"
];

const containmentPercentages = [
  0, 5, 20, 25, 30, 35, 40, 50, 55, 60, 
  65, 70, 75, 85, 90, 95, 97, 100
];

const acresBurnedPercentages = [
  0, 15, 50, 60, 70, 75, 80, 85, 90, 92, 
  93, 94, 95, 96, 97, 98, 99, 100
];

new Chart("fireconiumainent", {
  type: "line",
  data: {
    labels: xValues1,
    datasets: [
      {
        label: "Containment (%)",
        fill: false,
        lineTension: 0,
        backgroundColor: "#1A1AFF",
        borderColor: "#1A1AFF",
        data: containmentPercentages
      },
      {
        label: "Acres Burned (%)",
        fill: false,
        lineTension: 0,
        backgroundColor: "#FF4500",
        borderColor: "#FF4500",
        data: acresBurnedPercentages
      }
    ]
  },
  options: {
    legend: {
      display: true,
      labels: {
        fontColor: "#FFFFFF"
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          fontColor: "#FFFFFF"
        },
        scaleLabel: {
          display: true,
          labelString: 'Percentage',
          fontColor: "#FFFFFF"
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: "#FFFFFF"
        },
        scaleLabel: {
          display: true,
          labelString: 'Dates in November',
          fontColor: "#FFFFFF"
        }
      }]
    }
  }
});
