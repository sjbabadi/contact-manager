class View {
  constructor() {
    this.cacheReferences();
    this.cacheTemplates();
    this.registerPartials();
  }

  cacheReferences() {
    this.elements = [];
    this.elements['searchResults'] = document.querySelector('.empty-search');
    this.elements['menu'] = document.querySelector('.menu');
    this.elements['listContainer'] = document.querySelector('.contact-list__container');
    this.elements['modal'] = document.querySelector('.modal');
    this.elements['addBtn'] = document.querySelector('#addContactBtn');
    this.elements['modalContainer'] = document.querySelector('.modal-container');
    this.elements['form'] = document.querySelector('.modal-form');
    this.elements['cancelFormBtn'] = document.querySelector('.cancel-btn');
    this.elements['modalHeader'] = document.querySelector('.modal-header');
    this.elements['searchBar'] = document.querySelector('#searchBar');
    this.elements['tagContainer'] = document.querySelector('.tag-container');
  }

  registerPartials() {
    Handlebars.registerPartial('contactPartial', this.templates['contactPartial']);
  }

  cacheTemplates() {
    this.templates = [];
    const templateList = document.querySelectorAll("script[type='text/x-handlebars']");
    templateList.forEach((template) => {
      this.templates[template.id] = Handlebars.compile(template.innerHTML);
    });
  }

  render(data = {}) {
    this.renderContactList(data);
    //this.renderSearchResults(data);
  }

  renderTags(tagObject) {
    this.elements.tagContainer.innerHTML = '';
    this.elements.tagContainer.insertAdjacentHTML('afterbegin', this.templates['tagTemplate']({tagged: tagObject}));
    let showAll = this.elements.tagContainer.lastElementChild;
    showAll.textContent = "Show All";
  }

  renderContactList(data) {
    this.elements.listContainer.innerHTML = '';
    this.elements.listContainer.insertAdjacentHTML('afterbegin', this.templates['contactListTemplate']({contacts: data}));
  }

  renderForm(options) {
    this.elements.modalHeader.textContent = options.action || '';
    if(options.id) {
      this.elements.form.dataset.id = options.id;
    }
    $(this.elements.modalContainer).show(500);
  }

  hideForm() {
    this.elements.form.reset();
    $(this.elements.modalContainer).hide(500);
  }

  prePopulateForm(data) {
    for(let key in data) {
      if(key !== "id") {
        this.elements.form[key].value = data[key];
      } else {
        this.elements.form.dataset.id = data[key];
      }
    }
  }

  renderFilteredContacts(ids, data) {
    $('ul.contact-list').children().show();
    if(!ids) return;
    $('ul.contact-list').children().filter((index, contact) => {
      return !ids.includes(+contact.dataset.id);
    }).hide();
  }

  bind(event, handler) {
    const self = this;
    const events = {
      'confirm delete': function() {
        $(self.elements.listContainer).on('click', '.delete-contact', (e) => handler(e));
      },
      'add contact': function() {
        $(self.elements.addBtn).on('click', (e) => handler(e, {action: 'Add Contact'}));
      },
      'edit contact': function() {
        $(self.elements.listContainer).on('click', '.edit-contact', (e) => handler(e, {action: 'Edit Contact'}));
      },
      'submit form': function() {
        $(self.elements.form).on('submit', (e) => handler(e));
      },
      'cancel form': function() {
        $(self.elements.form).on('click', '.cancel-btn', () => handler());
      },
      'search': function() {
        $(self.elements.searchBar).on('input', (e) => handler(e));
      },
      'filter': function() {
        $(self.elements.tagContainer).on('click', 'button', (e) => handler(e));
      }
    };

    events[event]();
  }



}