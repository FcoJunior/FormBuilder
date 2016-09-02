'use strict';

var httpFactory = {
  getProvider: function() {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    return xhr;
  },

  get: function(url, callback) {
    var xhr = httpFactory.getProvider();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == "200") {
        var json = JSON.parse(xhr.responseText)
        callback(json);
      }
    };
    xhr.send(null);
  }

};
