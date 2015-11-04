var PoliticalBeat = function() {
  "use strict";
  var self = this;
  var archive = document.getElementById('archive-dropdown');
  var viewButton = archive.parentElement.getElementsByTagName('button')[0];
  var date = document.querySelector('#survey-results .headline span');
  var graphs = document.getElementById('graphs');

  self.load = function(file) {
    return new Promise(function(resolve, reject) {
      if (localStorage[file]) resolve(JSON.parse(localStorage[file]));
      fetch('./data/' + file + '.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        var tmp = localStorage[file];
        localStorage[file] = JSON.stringify(json);
        resolve(json);
        if (tmp !== JSON.stringify(json)) {
          update(json);
        }
      }).catch(function(error) {
        reject(Error(error));
      });
    });
  };

  self.barChart = function(json) {
    var elem = document.createElement('div');
    elem.className = "barChart";
    elem.id = 'barChart_' + archive.value;
    graphs.appendChild(elem);
    var config = {
      colors: [],
      chart: {
        type: 'bar',
        renderTo: 'barChart_' + archive.value,
        width: graphs.clientWidth
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
    var chart = new Highcharts.Chart(config);
  };

  self.leadingPolls = function(json) {

  };

  self.updateDate = function() {
    date.innerHTML = archive.selectedOptions[0].innerHTML;
    graphs.innerHTML = "";
  };

  viewButton.addEventListener('click', function() {
    self.load(archive.value + '/config').then(function(data) {
      self.updateDate();
      for (var i = 0, len = data.types.length; i < len; i++) {
        self.load(archive.value + '/' + data.types[i]).then(function(response) {
          self[response.type](response);
        }).catch(function(error) {
          console.warn("File Not Found", error);
        });
      }
    }).catch(function(error) {
      console.warn("File Not Found", error);
    })
  });

  var event = document.createEvent('Event');
  event.initEvent('click', true, true);
  viewButton.dispatchEvent(event);
};
var app = new PoliticalBeat();
