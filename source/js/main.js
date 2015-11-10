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
          console.warn("File Not Found");
        });
      }
    }).catch(function(error) {
      console.warn("File Not Found");
    })
  });

  var event = document.createEvent('Event');
  event.initEvent('click', true, true);
  viewButton.dispatchEvent(event);

  var emailSubmits = document.querySelectorAll('.email-optin button');
  Array.prototype.forEach.call(emailSubmits, function(emailSubmit) {
    emailSubmit.addEventListener('click', function(e) {
      e.preventDefault();
      var form = this.parentElement.parentElement;

      if(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(form.querySelector('.email').value)) {
        fetch('https://visitor2.constantcontact.com/api/signup', {
        //fetch('http://laura-cowboy.codio.io:3000/', {
          method: 'post',
          body: new FormData(form)
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          if(data.success) {
            var tmp = form.querySelectorAll('.label, .field-wrap');
            Array.prototype.forEach.call(tmp, function(elem) {
              elem.style.opacity = 0;
              elem.style.zIndex = -1;
            });
            form.querySelector('.thanks').classList.add('success');
          } else {
            alert('Invalid Email, please try again.');
          }
        });
      } else {
        alert('Invalid Email, please try again.');
      }
    })
  })

};
var app = new PoliticalBeat();
