module.exports = function(json) {
  var elem = document.createElement('div');
  elem.className = "columnChart";
  var title = document.createElement('div');
  title.className = 'title';
  title.innerHTML = json.title;
  var chartWrapper = document.createElement('div');
  chartWrapper.className = 'chart_wrapper';
  chartWrapper.id = 'columnChart_' + json.week;
  elem.appendChild(title);
  elem.appendChild(chartWrapper);
  graphs.appendChild(elem);
  var config = {
    colors: [],
    chart: {
      type: 'column',
      renderTo: chartWrapper.id
    },
    title: {
      text: null
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
        text: 'Party Affiliation %'
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
      verticalAlign: 'top'
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
  var chart = new Highcharts.Chart(config);
  setTimeout(function() {
    chart.reflow();
  }, 100);
};
