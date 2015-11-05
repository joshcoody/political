module.exports = function(json) {
  var elem = document.createElement('div');
  elem.className = "pieChart";
  elem.id = 'pieChart_' + json.week;
  graphs.appendChild(elem);
  var colors = [];
  var config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      renderTo: elem.id
    },
    credits: {
      enabled: false
    },
    title: {
      text: json.title,
      style: {
        "color": "#414141",
        "font-family": "'Open Sans', arial, sans-serif",
        "font-size": "30.6667px",
        "font-weight": "800",
        "text-transform": "uppercase"
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      y: 40,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        colors: Highcharts.map(colors, function(color) {
          return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
              [0, color],
              [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
          };
        })
      }
    },
    series: [{
      name: "Voters",
      colorByPoint: true,
      data: []
    }]
  };
  for (var key in json.labels) {
    if (json.labels[key].color) {
      colors.push(json.labels[key].color);
    }
    config.series[0].data.push(
      Object({
        name: json.labels[key].name,
        y: json.labels[key].percent,
        color: json.labels[key].color
      })
    );
  }
  var chart = new Highcharts.Chart(config);
};
