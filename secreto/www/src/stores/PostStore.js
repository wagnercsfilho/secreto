var AppDispatcher = require('../dispatcher/AppDispatcher');
var PostConstants = require('../constants/PostConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _posts = [];

/**
 * Create a POST item.
 * @param {object} post item
 */

function initial(data) {
    _posts = data;
}

function create(data) {
    _posts.unshift(data);
}

/**
 * Delete a POST item.
 * @param {string} id
 */
function destroy(id) {
    delete _posts[id];
}

/**
 * Update a POST item.
 * @param {object} data
 */
function updateById(data) {
    _posts = _posts.map(function(post) {
        return post._id === data._id ? data : post
    });
}

/**
 * Find a POST item by ID.
 * @param {string} id
 */
function _getById(id) {
    return _posts.filter(function(post) {
        return post._id === id
    })[0];
}


var PostStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of POSTs.
     * @return {object}
     */
    getAll: function() {
        return _posts;
    },
    
    getById: _getById,

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;

        switch (action.actionType) {
            case PostConstants.POST_INITIAL:
                initial(action.data);
                PostStore.emitChange();
                break;

            case PostConstants.POST_CREATE:
                create(action.data);
                PostStore.emitChange();
                break;

            case PostConstants.POST_DESTROY:
                destroy(action.id);
                PostStore.emitChange();
                break;

            case PostConstants.POST_UPDATE_BY_ID:
                updateById(action.data);
                PostStore.emitChange();
                break;
            
            case PostConstants.POST_INCREMENT_COUNT_COMMENT:
                var postId = action.id;
                var post = PostStore.getById(postId)
                post.comments += 1;
                updateById(post);
                PostStore.emitChange();
                break;
            
        }

        return true;
    })

});

module.exports = PostStore;