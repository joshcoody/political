module.exports = function(json) {
  var elem = document.createElement('div');
  elem.className = "barChart";
  elem.id = 'barChart_' + json.week;
  graphs.appendChild(elem);
  var config = {
    colors: [],
    chart: {
      type: 'bar',
      renderTo: elem.id,
      width: graphs.clientWidth
    },
    title: {
      text: json.title,
      style: {
        "color": "#414141",
        "font-family": "'Open Sans', arial, sans-serif",
        "font-size": "30.6667px",
        "font-weight": "800",
        "text-transform": "uppercase",
      }
    },
    /*subtitle: {
      text: json.subtitle
    },*/
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
      y: 40,
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
};
