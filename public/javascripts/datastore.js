(function(window) {
  'use strict';

  const SERVER_URL = "http://localhost:3000/api/contacts";

  function DataStore() {
    this.items = [];
  }

  DataStore.prototype.get = function(id) {

  };

  DataStore.prototype.getAll = function() {
    fetch(SERVER_URL)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  window.app = window.app || {};
  window.app.DataStore = DataStore;
})(window);