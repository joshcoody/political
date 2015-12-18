module.exports = function(json) {
  var elem = document.createElement('div');
  elem.className = "pieChart";
  var title = document.createElement('div');
  title.className = 'title';
  title.innerHTML = json.title;
  if (json.header) {
    var header = document.createElement('div');
    header.className = 'header';
    if (json.header.image) {
      var image = document.createElement('div');
      image.className = 'image';
      image.innerHTML = '<img src="' + json.header.image + '">';
      header.appendChild(image);
    }
    elem.appendChild(header);
  }
  var chartWrapper = document.createElement('div');
  chartWrapper.className = 'chart_wrapper';
  chartWrapper.id = 'pieChart_' + json.title.replace(/\s/g,'-') + '_' + json.week;
  elem.appendChild(title);
  elem.appendChild(chartWrapper);
  graphs.appendChild(elem);
  var colors = [];
  var config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      renderTo: chartWrapper.id
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      itemStyle: {
        color: '#414141',
        fontFamily: 'Open Sans',
        fontSize: '15px',
        fontWeight: '800'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f}%',
          style: {
            color: '#414141',
            fontFamily: 'Open Sans',
            fontSize: '20px',
            fontWeight: '800'
          }
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
  setTimeout(function() {
    chart.reflow();
  }, 100);
};
