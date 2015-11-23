var q = require('q');

var cache = {
  data: {}
}

cache.has = function(key) {
  return typeof cache.data[key] != 'undefined';
}

cache.set = function(key, val) {
  this.data[key] = val;
}

cache.get = function(key) {
  var defer = q.defer();
  defer.resolve(cache.data[key]);
  return defer.promise;
}

cache.remove = function(key) {
  delete data[key];
  return q.resolve();
}

cache.cache = function(key, callback, expiresInMs) {
  var res;
  if(cache.has(key) && expiresInMs !== -1) {
    res = cache.get(key);
  } else {
    res = callback().then(function(data) {
      cache.set(key, data);
      return data;
    });
  }
  if(expiresInMs && expiresInMs > 0) {
    setTimeout(function() {
      cache.remove(key);
    }, expiresInMs);
  }
  return res;
}

module.exports = cache;
