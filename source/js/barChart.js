module.exports = function(json) {
  var elem = document.createElement('div');
  elem.className = "barChart";
  var title = document.createElement('div');
  title.className = 'title';
  title.innerHTML = json.title;
  var chartWrapper = document.createElement('div');
  chartWrapper.className = 'chart_wrapper';
  chartWrapper.id = 'barChart_' + json.title.replace(/\s/g,'-') + '_' + json.week;
  elem.appendChild(title);
  elem.appendChild(chartWrapper);
  graphs.appendChild(elem);
  var config = {
    colors: [],
    chart: {
      type: 'bar',
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
      itemStyle: {
        color: '#414141',
        fontFamily: 'Open Sans',
        fontSize: '15px',
        fontWeight: '800'
      }
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
