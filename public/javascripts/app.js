(function(){
  'use strict';

  let app = window.app;

  function ContactManager() {
    this.storage = new app.DataStore();
  }

  const cm = new ContactManager();

  cm.storage.getAll();
})();