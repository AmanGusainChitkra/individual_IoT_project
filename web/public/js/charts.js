$(function () {
    $("#navbar-placeholder").load("navbar.html");
  });
  
fetch('https://mqttsmartindi.onrender.com/sensorData')
    .then(response => response.json())
    .then(data => {
        const chartData = data.map(item => [item.timestamp, item.value]);
        console.log(chartData);

        Highcharts.chart('container', {
            title: {
                text: 'Sensor Data'
            },
            xAxis: {
                type: 'datetime'
            },
            series: [{
                name: 'Value',
                data: chartData
            }]
        });
    });