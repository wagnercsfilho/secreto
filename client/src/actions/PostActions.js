/**
 * PostActions
 */

var AppDispatcher = require("../dispatcher/AppDispatcher");
var PostConstants = require('../constants/PostConstants');

var PostActions = {

    /**
     * @param {object} data
     */
    initial: function(data) {
        AppDispatcher.handleViewAction({
            actionType: PostConstants.POST_INITIAL,
            data: data
        });
    },

    /**
     * @param {object} data
     */
    create: function(data) {
        AppDispatcher.handleViewAction({
            actionType: PostConstants.POST_CREATE,
            data: data
        });
    },

    /**
     * @param {string} id
     */
    destroy: function(id) {
        AppDispatcher.handleViewAction({
            actionType: PostConstants.POST_DESTROY,
            id: id
        });
    },

    updateById: function(data) {
        AppDispatcher.handleViewAction({
            actionType: PostConstants.POST_UPDATE_BY_ID,
            data: data
        });
    },

    incrementCommentCount: function(id) {
        AppDispatcher.handleViewAction({
            actionType: PostConstants.POST_INCREMENT_COUNT_COMMENT,
            id: id
        });
    }

};

module.exports = PostActions;