module.exports = function (json) {
  "use strict";

  var elem = document.createElement('div');
  elem.className = "leadingPolls";
  elem.id = 'leadingPolls_' + json.title.replace(/\s/g, '-') + '_' + json.week;
  graphs.appendChild(elem);
  var chart = "\n    <div class=\"title\">" + json.title + "</div>\n    <div class=\"columns\">\n  ";
  var categories = json.categories;
  for (var category in categories) {
    chart += "\n      <div class=\"column\" id=\"" + category + "\">\n        <div class=\"header\">\n          <div class=\"icon\"><img src=\"" + categories[category].icon + "\" width=\"32\" height=\"32\"></div>\n          <div class=\"text\">" + categories[category].header + "</div>\n        </div>";
    var candidates = categories[category].candidates;
    for (var candidate in candidates) {
      var change = candidates[candidate].change;
      chart += "\n        <div class=\"candidate " + (candidates[candidate].dropped ? 'dropped' : '') + "\">\n          <div class=\"picture\">\n            <img src=\"" + candidates[candidate].picture + "\" width=\"54\" height=\"54\" >\n          </div>\n          <div class=\"name\">" + candidates[candidate].name + "</div>\n          <div class=\"percent\">\n            " + candidates[candidate].percent + "%\n          </div>";
      if (change !== undefined) {
        chart += "\n          <div class=\"change " + (change > 0 ? 'green' : change < 0 ? 'red' : '') + "\">\n            <div class=\"arrow\">";
        if (change === 0) {
          chart += "\n            <?xml version=\"1.0\" encoding=\"utf-8\"?>\n            <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 133.7 133.7\" xml:space=\"preserve\">\n              <style type=\"text/css\">\n                .st0{fill:#494849;}\n                .st1{fill:#FFFFFF;}\n              </style>\n              <circle class=\"st0\" cx=\"66.8\" cy=\"66.8\" r=\"66.8\"/>\n              <g>\n                <path class=\"st1\" d=\"M114.8,66c0,6.6-5.4,12-12,12H30.7c-6.6,0-12-5.4-12-12v-0.5c0-6.6,5.4-12,12-12h72.1c6.6,0,12,5.4,12,12V66z\"/>\n              </g>\n            </svg>\n          ";
        } else {
          chart += "\n            <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -256 1792 1792\" id=\"svg2989\" version=\"1.1\">\n              <metadata id=\"metadata2999\">\n                <rdf:RDF>\n                  <cc:Work rdf:about=\"\">\n                    <dc:format>image/svg+xml</dc:format>\n                    <dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\n                  </cc:Work>\n                </rdf:RDF>\n              </metadata>\n              <defs id=\"defs2997\" />\n              <sodipodi:namedview pagecolor=\"#ffffff\" bordercolor=\"#666666\" borderopacity=\"1\" objecttolerance=\"10\" gridtolerance=\"10\" guidetolerance=\"10\" inkscape:pageopacity=\"0\" inkscape:pageshadow=\"2\" inkscape:window-width=\"640\" inkscape:window-height=\"480\" id=\"namedview2995\" showgrid=\"false\" inkscape:zoom=\"0.13169643\" inkscape:cx=\"896\" inkscape:cy=\"896\" inkscape:window-x=\"0\" inkscape:window-y=\"25\" inkscape:window-maximized=\"0\" inkscape:current-layer=\"svg2989\" />\n              <g transform=\"matrix(1,0,0,-1,129.08475,1277.8305)\" id=\"g2991\">\n                <path d=\"m 1280,576 v 128 q 0,26 -19,45 -19,19 -45,19 H 714 l 189,189 q 19,19 19,45 0,26 -19,45 l -91,91 q -18,18 -45,18 -27,0 -45,-18 L 360,776 269,685 q -18,-18 -18,-45 0,-27 18,-45 l 91,-91 362,-362 q 18,-18 45,-18 27,0 45,18 l 91,91 q 18,18 18,45 0,27 -18,45 L 714,512 h 502 q 26,0 45,19 19,19 19,45 z m 256,64 Q 1536,431 1433,254.5 1330,78 1153.5,-25 977,-128 768,-128 559,-128 382.5,-25 206,78 103,254.5 0,431 0,640 0,849 103,1025.5 206,1202 382.5,1305 559,1408 768,1408 977,1408 1153.5,1305 1330,1202 1433,1025.5 1536,849 1536,640 z\" id=\"path2993\" inkscape:connector-curvature=\"0\" style=\"fill:currentColor\" />\n              </g>\n            </svg>\n          ";
        }
        chart += "\n            </div>\n            <div class=\"change-percent\">" + String(change).replace('-', '') + "%</div>\n          </div>\n        ";
      }
      chart += "\n        </div>\n      ";
    }

    if (json.independent && category === 'Democratic') {
      chart += "\n        <div class=\"independent\">\n          <span class=\"independent-percent\">" + json.independent + "%</span>\n          <span class=\"independent-text\">Independent Respondents<br>Selected Undecided</span>\n        </div>\n      ";
    }

    chart += "\n      </div>\n    ";
  }
  chart += "\n    </div>\n  ";
  elem.innerHTML = chart;
  if (!vwSupport()) {
    setTimeout(function () {
      var candidates = document.querySelectorAll('.candidate');
      Array.prototype.forEach.call(candidates, function (candidate) {
        var picture = candidate.querySelector('.picture');
        var pstyle = window.getComputedStyle(picture);
        picture = picture.clientWidth + parseFloat(pstyle.marginLeft) + parseFloat(pstyle.marginRight);
        var percent = candidate.querySelector('.percent').clientWidth;
        var change = candidate.querySelector('.change');
        if (change) {
          var cstyle = window.getComputedStyle(change);
          change = change.clientWidth + parseFloat(cstyle.marginLeft) + parseFloat(cstyle.marginRight);
        } else {
          change = 0;
        }
        var text = candidate.querySelector('.name');
        text.style.width = candidate.clientWidth - 10 - (picture + percent + change) + 'px';
      });
    }, 300);
  }
};