(function(window) {
  'use strict';
  window.app = window.app || {};
  const Contact = window.app.Contact;

  function Controller(contacts, view) {
    this.view = view;
    this.contacts = contacts;

    this.view.bindHandler('addContactClick', this.displayForm.bind(this));
    this.view.bindHandler('editContactClick', this.displayForm.bind(this));
    this.view.bindHandler('cancelForm', this.cancelForm.bind(this));
    this.view.bindHandler('formSubmit', this.formSubmit.bind(this));
    this._populateContacts();
    
  }

  Controller.prototype._populateContacts = function() {
    const self = this;
    self.contacts.read((data) => {
      self.view.render('showList', { data: data});
    });
  }

  Controller.prototype.formSubmit = function(form) {

  }

  Controller.prototype.displayForm = function(params) {
    this.view.render('toggleModal', params);
  }

  Controller.prototype.cancelForm = function() {
    this.view.render('toggleModal', {cancel: true});
  }

  window.app.Controller = Controller;
})(window);