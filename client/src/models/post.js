var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var _posts = [];

var Post = assign({}, EventEmitter.prototype, {
    all: function() {
        return _posts
    },
    set: function(data) {
        _posts = data;
        this.emit('CHANGE');
    },
    updateById: function(data) {
        _posts = _posts.map(function(post) {
            return post._id === data._id ? data : post
        });
        this.emit('CHANGE');
    },
    getById: function(id) {
        return _posts.filter(function(post) {
            return post._id === id
        })[0];
    },
    subscribe: function(fn) {
        this.on('CHANGE', fn);
    },
    unsubscribe: function(fn) {
        this.removeListener('CHANGE', fn);
    }
});

module.exports = Post;