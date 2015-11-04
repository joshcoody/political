var ww = window.innerWidth;
function vwSupport() {
  "use strict";
  var tmp = document.createElement('div');
  tmp.style.width = '12vw';
  document.getElementsByTagName('body')[0].appendChild(tmp);
  var result = (tmp.offsetWidth === Math.round(ww * 0.12));
  tmp.parentElement.removeChild(tmp);
  return result;
}
function vwResize() {
  "use strict";
  document.getElementById("htmlFontSize").innerText = "html { font-size: " + ww + "px!important; }";
}
if (!vwSupport()) {
  if (!document.getElementById("htmlFontSize")) {
    var style = document.createElement("style");
    style.id = "htmlFontSize";
    document.getElementsByTagName("head")[0].appendChild(style);
  }
  window.onresize = vwResize;
  vwResize();
}
