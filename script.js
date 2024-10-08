const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "Art. 19-22" },
  { minDegree: 31, maxDegree: 90, value: "Art. 14-18" },
  { minDegree: 91, maxDegree: 150, value: "Art. 32-35" },
  { minDegree: 151, maxDegree: 210, value: "Art. 29-30" },
  { minDegree: 211, maxDegree: 270, value: "Art. 25-28" },
  { minDegree: 271, maxDegree: 330, value: "Art. 23-24" },
  { minDegree: 331, maxDegree: 360, value: "Art. 19-22" },
];
//Size of each piece
const data = [25, 25, 25, 25, 25, 25];
//background color for each piece
var pieColors = [
  "rgba(240, 240, 240, 0.5)",
  "rgba(230, 230, 230, 0.5)",
  "rgba(204, 204, 204, 0.5)",
  "rgba(179, 179, 179, 0.5)",
  "rgba(153, 153, 153, 0.5)",
  "rgba(128, 128, 128, 0.5)"
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ["Art. 14-18", "Art. 19-22", "Art. 23-24", "Art. 25-28", "Art. 29-30", "Art. 32-35"],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
        borderColor: "#424242",
        borderWidth: 2,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#424242",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<a href="${i.value}.html" target="_blank"><p>Value: ${i.value}</p></a>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
