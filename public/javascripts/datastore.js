(function(window) {
  'use strict';

  const SERVER_URL = "http://localhost:3000/api/contacts";

  function DataStore() {
    this.items = [];
  }

  DataStore.prototype.get = function(id) {
    fetch(`${SERVER_URL}/${id}`)
    .then(res => {
      if(!res.ok) {
        throw new Error('Request was not successful');
      } else {
        return res.json();
      }
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  DataStore.prototype.getAll = function(cb) {
    fetch(`${SERVER_URL}`)
    .then(res => {
      if(!res.ok) {
        throw new Error('Request was not successful');
      } else {
        return res.json();
      }
    })
    .then(data => cb(data))
    .catch(error => console.error(error));
  };

  DataStore.prototype.remove = function(id) {
    fetch(`${SERVER_URL}/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if(!res.ok) {
        throw new Error('Contact not found');
      } else {
        console.log(`Contact with id ${id} was successfully removed`);
      }
    }).catch(error => console.log(error));
  };

  DataStore.prototype.add = function(contact) {
    fetch(`${SERVER_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    .then(res => {
     if(!res.ok) {
        throw new Error('Unable to create contact');
      } else {
        res.json();
      }
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };

  DataStore.prototype.update = function(id, contact) {
    fetch(`${SERVER_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    .then(res => {
     if(!res.ok) {
        throw new Error('Unable to update contact');
      } else {
        res.json();
      }
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };

  window.app = window.app || {};
  window.app.DataStore = DataStore;
})(window);