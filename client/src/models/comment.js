var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var _data = [];

var Comment = assign({}, EventEmitter.prototype, {
    all: function() {
        return _data
    },
    set: function(data) {
        _data = data;
        this.emit('CHANGE');
    },
    add: function(data){
      _data.push(data);  
      this.emit('CHANGE');
    },
    update: function(index, data) {
        _data[index] = data;
        this.emit('CHANGE');
    },
    getById: function(id){
        return _data.filter(function(post){
           return post._id === id 
        });
    },
    subscribe: function(fn) {
        this.on('CHANGE', fn);
    },
    unsubscribe: function(fn) {
        this.removeListener('CHANGE', fn);
    }
});

module.exports = Comment;