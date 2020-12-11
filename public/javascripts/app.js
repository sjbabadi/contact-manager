class App {
  constructor() {
    this.storage = new Storage('/api/contacts');
    this.view = new View();
    this.tags = new Tags();
    this.contacts = new Contacts(this.storage);

    this.controller = new Controller(this.contacts, this.view, this.tags);
  }
}

(function(){
  new App();
})();
