var PoliticalBeat = function() {
  "use strict";
  var self = this;
  var archive = document.getElementById('archive-dropdown');
  var viewButton = archive.parentElement.getElementsByTagName('button')[0];
  var date = document.querySelector('#survey-results .headline span');
  var graphs = document.getElementById('graphs');

  self.load = require('./load.js');

  self.barChart = require('./barChart.js');

  self.pieChart = require('./pieChart.js');

  self.columnChart = require('./columnChart.js');

  self.leadingPolls = require('./leadingPolls.js');

  self.updateDate = function() {
    date.innerHTML = archive.options[archive.selectedIndex].innerHTML;
    graphs.innerHTML = "";
  };

  viewButton.addEventListener('click', function() {
    self.load(archive.value + '/config').then(function(data) {
      self.updateDate();
      var count = 0;
      for (var i = 0, len = data.types.length; i < len; i++) {
        self.load(archive.value + '/' + data.types[i]).then(function(response) {
          var html = '';
          if(count === 0) {
            html = '<div class="divider highlight"><img src="images/divider_icon_highlight.min.png"></div>';
            html += '<div class="headline">Spotlight <span class="blue">Survey Poll</span></div>';
          } else {
            html = '<div class="divider"><img src="images/divider_icon.min.png"></div>';
          }
          graphs.insertAdjacentHTML( 'beforeend', html);
          self[response.type](response);
          count++;
        }).catch(function(error) {
          //console.warn("File Not Found", error);
          console.error(error);
        });
      }
    }).catch(function(error) {
      //console.warn("File Not Found", error);
      console.error(error);
    })
  });

  var event = document.createEvent('Event');
  event.initEvent('click', true, true);
  viewButton.dispatchEvent(event);
};
var app = new PoliticalBeat();
