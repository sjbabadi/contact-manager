(function(window) {
  'use strict';
  window.app = window.app || {};

  function View() {
    this.listContainer = document.querySelector('div.contact-list__container');
    this.modalContainer = document.querySelector('.modal-container');
    this.modal = this.modalContainer.querySelector('.modal');
    this.form = this.modal.querySelector('.modal-form');
    this.modalHeader = this.modalContainer.querySelector('.modal-header');
    this.searchResultContainer = document.querySelector('div.search-results');
    this.menu = document.querySelector('div.menu');
    this.addBtn = document.querySelector('#addContactBtn');
    this.cancelFormBtn = document.querySelector('.cancel-btn');
    
    //this.contactPartial = Handlebars.compile(document.querySelector('#contactPartial').innerHTML);
    this.listTemplate = Handlebars.compile(document.querySelector('#contactListTemplate').innerHTML, { noEscape: true });
    Handlebars.registerPartial('contactPartial', document.querySelector('#contactPartial').innerHTML, { noEscape: true });

  }

  View.prototype.bindHandler = function(event, handler) {
    if(event === 'addContactClick') {
      $('#addContactBtn').on('click', () => handler({action: 'Add Contact'}) );
    } else if(event === 'editContactClick') {
      $('.contact-list__container').on('click', '.edit-contact', () => handler({action: 'Edit Contact'}) );
    } else if(event === 'cancelForm') {
      $('.cancel-btn').on('click', () => handler() );
    } else if(event === 'formSubmit', () => handler(e.target));
  };

  View.prototype.render = function(cmd, params) {
    const self = this;

    const cmdTable = {
      'showList': function() {
        self.listContainer.insertAdjacentHTML('afterbegin', self.listTemplate({contacts: params.data}));
      },
      'toggleModal': function() {
        self.modalHeader.textContent = params.action || '';
        if(params.cancel) self.form.reset();
        self.modalContainer.classList.toggle('hidden');
      },
    };

    cmdTable[cmd]();
  };

  window.app.View = View;
})(window);