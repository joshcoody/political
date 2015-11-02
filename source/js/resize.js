var optin = document.getElementById('optin');
var banner = document.getElementById('banner');
var header = document.getElementById('header');
var resize = function() {
  if(window.innerWidth >= 769) {
    if(optin.parentElement !== banner) {
      banner.appendChild(optin);
    }
  } else {
    if(optin.parentElement !== header) {
      header.appendChild(optin);
    }
  }
}
window.addEventListener('resize', resize);
var resize_event = document.createEvent('Event');
resize_event.initEvent('resize', false, false);
window.dispatchEvent(resize_event);
