const xValues2 = [10,20,30,40,50,60,70,80,90,100];
const yValues2 = [200,100,150,120,180,130,170,140,190,160];

new Chart("Chart2", {
  type: "line",
  data: {
    labels: xValues2,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "#0000FF",
      borderColor: "#1A1AFF", 
      data: yValues2
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 100, max:200}}],
    }
  }
});
