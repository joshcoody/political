module.exports = function (json) {
  "use strict";

  var elem = document.createElement('div');
  elem.className = "leadingPolls";
  elem.id = 'leadingPolls_' + json.week;
  graphs.appendChild(elem);
  var chart = "\n    <div class=\"title\">" + json.title + "</div>\n    <div class=\"columns\">\n  ";
  var categories = json.categories;
  for (var category in categories) {
    chart += "\n      <div class=\"column\" id=\"" + category + "\">\n        <div class=\"header\">\n          <div class=\"icon\"><img src=\"" + categories[category].icon + "\"></div>\n          <div class=\"text\">" + categories[category].header + "</div>\n        </div>";
    var candidates = categories[category].candidates;
    for (var candidate in candidates) {
      var change = candidates[candidate].change;
      chart += "\n            <div class=\"candidate " + (candidates[candidate].dropped ? 'dropped' : '') + "\">\n              <div class=\"picture\">\n                <img src=\"" + candidates[candidate].picture + "\">\n              </div>\n              <div class=\"name\">" + candidates[candidate].name + "</div>\n              <div class=\"percent\">\n                " + candidates[candidate].percent + "%\n              </div>\n              <div class=\"change " + (change > 0 ? 'green' : change < 0 ? 'red' : '') + "\">\n                <div class=\"arrow\">";
      if (change === 0) {
        chart += "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n                    <!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n                    <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                          viewBox=\"0 0 133.7 133.7\" xml:space=\"preserve\">\n                    <style type=\"text/css\">\n                         .st0{fill:#494849;}\n                         .st1{fill:#FFFFFF;}\n                    </style>\n                    <circle class=\"st0\" cx=\"66.8\" cy=\"66.8\" r=\"66.8\"/> \n                    <g>\n                         <path class=\"st1\" d=\"M114.8,66c0,6.6-5.4,12-12,12H30.7c-6.6,0-12-5.4-12-12v-0.5c0-6.6,5.4-12,12-12h72.1c6.6,0,12,5.4,12,12V66z\"\n                              />\n                    </g>\n                    </svg>";
      } else {
        chart += "\n                    <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n                    <svg\n                     xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n                     xmlns:cc=\"http://creativecommons.org/ns#\"\n                     xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n                     xmlns:svg=\"http://www.w3.org/2000/svg\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                     xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\n                     xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\n                     viewBox=\"0 -256 1792 1792\"\n                     id=\"svg2989\"\n                     version=\"1.1\"\n                     inkscape:version=\"0.48.3.1 r9886\"\n                     width=\"100%\"\n                     height=\"100%\"\n                     sodipodi:docname=\"circle_arrow_left_font_awesome.svg\">\n                    <metadata\n                       id=\"metadata2999\">\n                      <rdf:RDF>\n                        <cc:Work\n                           rdf:about=\"\">\n                          <dc:format>image/svg+xml</dc:format>\n                          <dc:type\n                             rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\n                        </cc:Work>\n                      </rdf:RDF>\n                    </metadata>\n                    <defs\n                       id=\"defs2997\" />\n                    <sodipodi:namedview\n                       pagecolor=\"#ffffff\"\n                       bordercolor=\"#666666\"\n                       borderopacity=\"1\"\n                       objecttolerance=\"10\"\n                       gridtolerance=\"10\"\n                       guidetolerance=\"10\"\n                       inkscape:pageopacity=\"0\"\n                       inkscape:pageshadow=\"2\"\n                       inkscape:window-width=\"640\"\n                       inkscape:window-height=\"480\"\n                       id=\"namedview2995\"\n                       showgrid=\"false\"\n                       inkscape:zoom=\"0.13169643\"\n                       inkscape:cx=\"896\"\n                       inkscape:cy=\"896\"\n                       inkscape:window-x=\"0\"\n                       inkscape:window-y=\"25\"\n                       inkscape:window-maximized=\"0\"\n                       inkscape:current-layer=\"svg2989\" />\n                    <g\n                       transform=\"matrix(1,0,0,-1,129.08475,1277.8305)\"\n                       id=\"g2991\">\n                      <path\n                         d=\"m 1280,576 v 128 q 0,26 -19,45 -19,19 -45,19 H 714 l 189,189 q 19,19 19,45 0,26 -19,45 l -91,91 q -18,18 -45,18 -27,0 -45,-18 L 360,776 269,685 q -18,-18 -18,-45 0,-27 18,-45 l 91,-91 362,-362 q 18,-18 45,-18 27,0 45,18 l 91,91 q 18,18 18,45 0,27 -18,45 L 714,512 h 502 q 26,0 45,19 19,19 19,45 z m 256,64 Q 1536,431 1433,254.5 1330,78 1153.5,-25 977,-128 768,-128 559,-128 382.5,-25 206,78 103,254.5 0,431 0,640 0,849 103,1025.5 206,1202 382.5,1305 559,1408 768,1408 977,1408 1153.5,1305 1330,1202 1433,1025.5 1536,849 1536,640 z\"\n                         id=\"path2993\"\n                         inkscape:connector-curvature=\"0\"\n                         style=\"fill:currentColor\" />\n                    </g>\n                    </svg>";
      }
      chart += "\n                </div>\n                <div class=\"change-percent\">" + String(change).replace('-', '') + "%</div>\n              </div>\n            </div>\n          ";
    }
    chart += "\n      </div>\n      ";
  }
  chart += "\n    </div>\n  ";
  elem.innerHTML = chart;
  setTimeout(function () {
    var percents = document.querySelectorAll('.percent');
    Array.prototype.forEach.call(percents, function (percent) {
      percent.style.width = percent.parentElement.querySelector('.picture').clientWidth + 'px';
      percent.style.height = percent.parentElement.querySelector('.picture').clientHeight + 'px';
      percent.style.lineHeight = percent.parentElement.querySelector('.picture').clientHeight + 'px';
    });
  }, 300);
};