var AppDispatcher = require('../dispatcher/AppDispatcher');
var CommentConstants = require('../constants/CommentConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _data = [];

/**
 * Create a POST item.
 * @param {object} post item
 */

function initial(data) {
    _data = data;
}

function create(data) {
    _data.unshift(data);
}

/**
 * Delete a POST item.
 * @param {string} id
 */
function destroy(id) {
    delete _data[id];
}

/**
 * Update a POST item.
 * @param {object} data
 */
function updateById(data) {
    _data = _data.map(function(post) {
        return post._id === data._id ? data : post
    });
}

/**
 * Find a POST item by ID.
 * @param {string} id
 */

var CommentStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of POSTs.
     * @return {object}
     */
    getAll: function() {
        return _data;
    },

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
            case CommentConstants.COMMENT_INITIAL:
                initial(action.data);
                CommentStore.emitChange();
                break;

            case CommentConstants.COMMENT_CREATE:
                create(action.data);
                CommentStore.emitChange();
                break;

            case CommentConstants.COMMENT_DESTROY:
                destroy(action.id);
                CommentStore.emitChange();
                break;
                
            case CommentConstants.COMMENT_LIKE:
                updateById(action.data);
                CommentStore.emitChange();
        }

        return true;
    })

});

module.exports = CommentStore;