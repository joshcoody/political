module.exports = function(json) {
  var config = {
    chartHeight: json.height || '900px',
    colors: [],
    chart: {
      type: 'bar',
      //width: 920
    },
    title: {
      text: json.title
    },
    subtitle: {
      text: json.subtitle
    },
    xAxis: {
      categories: json.categories,
      title: {
        text: null
      }
    },
    yAxis: {
      min: null,
      title: {
        text: null,
        align: 'high'
      },
      labels: {
        overflow: 'justify',
        format: '{value}%'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{y}%'
        }
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      y: window.innerWidth < 640 ? 100 : 60,
    },
    credits: {
      enabled: false
    },
    series: []
  };
  for (var key in json.labels) {
    if (json.labels[key].color) {
      config.colors.push(json.labels[key].color);
    }
    config.series.push(
      Object({
        name: key,
        data: json.labels[key].data
      })
    );
  }
  //$('#graphs').css({'height': config.chartHeight, 'max-width': config.chartWidth});
  $('#graphs').highcharts(config);
};
