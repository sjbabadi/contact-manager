(function(window) {
  'use strict';
  window.app = window.app || {};
  const TagList = window.app.TagList;

  function Contacts(storage) {
    this.db = storage;
  }

  Contacts.prototype.create = function(data, cb) {
    let newContact = {
      full_name: data.full_name,
      email: data.email,
      phone_number: data.phone_number,
      id: data.id,
      tags: data.tags,
    };

    this.db.add(newContact);

  }

  Contacts.prototype.read = function(query, cb) {
    let q = typeof query;


    if(q === "function") {
      console.log("hello");
      this.db.getAll(query);
    }
  };

  
  
  window.app.Contacts = Contacts;
})(window);