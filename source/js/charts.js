$(function() {
  fetch('/barchart.json')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      var config = {
        colors: [],
        chart: {
          type: 'bar'
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
          y: window.innerWidth < 640 ? 100: 60,
        },
        credits: {
          enabled: false
        },
        series: []
      };
      for(var key in json.labels) {
        if(json.labels[key].color) {
          config.colors.push(json.labels[key].color);
        }
        config.series.push(
          Object({
            name: key,
            data: json.labels[key].data
          })
        );
      }
      $('#container').highcharts(config);
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
});
