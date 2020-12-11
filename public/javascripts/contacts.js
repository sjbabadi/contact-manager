class Contacts {
  constructor(storage) {
    this.storage = storage;
  }

  getContact(id) {
    return this.storage.get(id);
  }

  getAllContacts() {
    return this.storage.getAll();
  }

  removeContact(id) {
    return this.storage.delete(id);
  }

  addContact(contactData) {
    return this.storage.create(contactData);
  }

  updateContact(id, data) {
    return this.storage.update(id, data);
  }

  _matchesQuery(contact, query) {
    for(let k in query) {
      if(!contact[k].toLowerCase().includes(query[k].toLowerCase())) {
        return false;
      }
     }
     return true;
  }
  // query examples
    // { full_name: 'Sam' }
    // { tags: 'work' }
  getFilteredContacts(query) {
    return this.storage.getAll().then((data) => {
        return data.filter((contact) => this._matchesQuery(contact, query));
      });
  }
}