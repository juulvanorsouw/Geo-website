const xValues1 = [50,60,70,80,90,100,110,120,130,140,150];
const yValues1 = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("Chart1", {
  type: "line",
  data: {
    labels: xValues1,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "#0000FF",
      borderColor: "#1A1AFF",      
      data: yValues1
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});
