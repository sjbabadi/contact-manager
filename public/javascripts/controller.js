class Controller {
  constructor(contacts, view, tags) {
    this.contacts = contacts;
    this.view = view;
    this.tags = tags;
    this.bindEvents();
    this.showAll();
    this.generateTags();
  }

  showAll() {
    this.contacts.getAllContacts().then( data => {
      this.view.render(data) 
    });
  }

  generateTags() {
    this.contacts.getAllContacts().then( data => {
      this.tags.init(data);
      this.view.renderTags(this.tags.tagged);
    });
  }

  updateTags() {
    this.contacts.getAllContacts().then( data => {
      this.tags.buildTags(data);
      this.view.renderTags(this.tags.tagged);
    }); 
  }

  displayForm(e, options) {
    if(options.action === "Edit Contact") {
      options.id = e.target.closest('li').dataset.id;
      this.contacts.getContact(options.id).then( (data) => {
        this.view.prePopulateForm(data);
        this.view.renderForm(options);
      });
    } else {
      this.view.renderForm(options);
    }
  }

  confirmDelete(e) {
    let del = confirm("Do you really want to delete this contact?");
    if(del) {
      let id = e.target.closest('li').dataset.id;
      this.contacts.removeContact(id).then(() => {
        this.showAll();
        this.updateTags();
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    let contactData = this.buildJSON(new FormData(e.target));
    let editing = e.target.closest('.modal').firstElementChild.textContent === "Edit Contact";

    if(editing) {
      let id = e.target.dataset.id;
      this.editContact(id, contactData);
    } else {
      this.addContact(contactData);
    }
  }

  cancelForm() {
    this.view.hideForm(); 
  }

  editContact(id, data) {
    this.contacts.updateContact(id, data)
        .then(() => {
          this.view.hideForm();
          this.showAll();
          this.updateTags();
        });
  }

  addContact(data) {
   this.contacts.addContact(data).then(() => {
    this.view.hideForm();
    this.showAll()
    this.updateTags();
  });
  }

  buildJSON(formData) {
    const json = {};
    for(const [key, value] of formData.entries()) {
      json[key] = value;
    }
    return json;
  }

  filterTags(e) {
    let tag = e.target.textContent.split(' ')[0];
    let ids = this.tags.getIDsByTag(tag);
    this.contacts.getAllContacts().then((data) => {
    this.view.renderFilteredContacts(ids, data);
    });
  }

  bindEvents() {
    this.view.bind('confirm delete', this.confirmDelete.bind(this));
    this.view.bind('add contact', this.displayForm.bind(this));
    this.view.bind('edit contact', this.displayForm.bind(this));
    this.view.bind('submit form', this.submitForm.bind(this));
    this.view.bind('cancel form', this.cancelForm.bind(this));
    this.view.bind('search', this.debounce(this.getSearchResults.bind(this), 300));
    this.view.bind('filter', this.filterTags.bind(this));
  }

  getSearchResults(e) {
    let query = e.target.value;
    this.contacts.getFilteredContacts({"full_name": query})
      .then(data => this.view.render(data));
  }


 debounce(func, delay) {
    let timeout;
    return function(...args) {
      if(timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    }
  }


}