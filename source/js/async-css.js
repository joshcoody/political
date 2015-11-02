var urls = [
  'https://fonts.googleapis.com/css?family=Archivo+Black&text=POLITICAL BEAT',
  'https://fonts.googleapis.com/css?family=Lato:300,700,900&text=BY Q INTERACTIVE',
  'https://fonts.googleapis.com/css?family=Open+Sans:800,700,600,400',
  'css/main.min.css'
];
document.addEventListener('DOMContentLoaded', function() {
  urls.forEach(function(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    document.querySelector('head').appendChild(link);
  });
});
