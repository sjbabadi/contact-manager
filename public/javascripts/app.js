(function(){
  'use strict';

  let app = window.app;

  function ContactManager() {
    this.storage = new app.DataStore();
  }

  const cm = new ContactManager();

  // cm.storage.get(3);
  // cm.storage.getAll();
  // cm.storage.remove(3);
  // cm.storage.getAll();

  let newContact = {
    "full_name": "Sheila Babadi",
    "email": "sheila.babadi@yahoo.com",
    "phone_number": "123-4567",
    "tags": "personal, family"
  };

  cm.storage.add(newContact);
  cm.storage.getAll();

  let updatedContact = {
    "full_name": "Updated Babadi",
    "email": "sheila.babadi@yahoo.com",
    "phone_number": "123-4567",
    "tags": "personal, family"
  };

  cm.storage.update(3, updatedContact);
  cm.storage.getAll();
})();