(function(window) {
  'use strict';

  function View() {
    this.listContainer = document.querySelector('div.contact-list');
    this.searchResultContainer = document.querySelector('div.search-results');
    this.menu = document.querySelector('div.menu');
    
    //this.contactPartial = Handlebars.compile(document.querySelector('#contactPartial').innerHTML);
    this.listTemplate = Handlebars.compile(document.querySelector('#contactListTemplate').innerHTML);
    Handlebars.registerPartial('contactPartial', document.querySelector('#contactPartial').innerHTML);

    

  }

  View.prototype.render = function() {

  }

})(window);