(function(){
  'use strict';

  let app = window.app;

  function ContactManager() {
    this.storage = new app.DataStore();
    this.view = new app.View();
    this.contacts = new app.Contacts(this.storage);
    this.controller = new app.Controller(this.contacts, this.view);
  }

  const cm = new ContactManager();


})();