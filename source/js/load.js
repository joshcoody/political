module.exports = function(file) {
  return new Promise(function(resolve, reject) {
    //if (localStorage[file]) resolve(JSON.parse(localStorage[file]));
    fetch('./data/' + file + '.json').then(function(response) {
      return response.json();
    }).then(function(json) {
      /*var tmp = localStorage[file];
      localStorage[file] = JSON.stringify(json);*/
      resolve(json);
      /*if (tmp !== JSON.stringify(json)) {
        update(json);
      }*/
    }).catch(function(error) {
      reject(Error(error));
    });
  });
};
