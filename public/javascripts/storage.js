class Storage {
  constructor(url) {
    this.url = url;
  }

  getAll() {
    return fetch(`${this.url}`)
      .then((res) => res.json());
  }

  get(id) {
   return fetch(`${this.url}/${id}`)
      .then((res) => res.json()); 
  }

  create(contactData) {
    return fetch(`${this.url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contactData) })
      .then(res => res.json());
  }

  delete(id) {
    return fetch(`${this.url}/${id}`, { method: 'DELETE' })
      .then(res => console.log(`Contact with id ${id} was successfully removed`));
  }

  update(id, data) {
    return fetch(`${this.url}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)})
      .then(res => res.json());
  }
}