(function(window) {
  'use strict';

  function TagList(tagString = '') {
    this.list = this._parseTagString(tagString);
  }

  TagList.prototype.getAll = function() {
    return [...this.list];
  }

  TagList.prototype.hasTag = function(tag) {
    return this.list.includes(tag);
  }

  TagList.prototype._parseTagString = function(tagString) {
    const items = tagString.split(',');
    return items[0] === "" ? [] : items;
  }

  
  window.app = window.app || {};
  window.app.TagList = TagList;
})(window);