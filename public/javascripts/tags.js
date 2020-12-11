class Tags {
  constructor() {
    this.tagged = {};
    
  }

  init(contacts) {
    this.buildTags(contacts);
    console.log(this.tagged);
  }

  buildTags(contacts) {
    this.tagged = {};
    contacts.forEach((contact) => {
      let tags = contact.tags;
      if(tags) {
        tags.split(',').forEach((tag) => {
          tag = tag.trim();
          if(!this.tagged[tag]) {
            this.tagged[tag] = [];
          }
          this.tagged[tag].push(contact.id);
        });
      } 
    });
  }

  getIDsByTag(tag) {
    return this.tagged[tag];
  }

}