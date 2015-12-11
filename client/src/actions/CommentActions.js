/**
 * CommentActions
 */
 
var AppDispatcher = require("../dispatcher/AppDispatcher");
var CommentConstants = require('../constants/CommentConstants');
var PostActions = require("../actions/PostActions");

 
var CommentActions = {
    
    /**
     * @param {object} data
     */
    initial: function(data){
        AppDispatcher.handleViewAction({
            actionType: CommentConstants.COMMENT_INITIAL,
            data: data
        });
    },
    
    /**
     * @param {object} data
     */ 
    create: function(comment){
        AppDispatcher.handleViewAction({
            actionType: CommentConstants.COMMENT_CREATE,
            data: comment
        });
        
        PostActions.incrementCommentCount(comment._post);
    },
    
    /**
     * @param {string} id
     */
    destroy: function(id){
        AppDispatcher.handleViewAction({
            actionType: CommentConstants.COMMENT_DESTROY,
            id: id
        });
    },
    
    like: function(comment){
        AppDispatcher.handleViewAction({
           actionType: CommentConstants.COMMENT_LIKE,
           data: comment
        });
    }
    
};

module.exports = CommentActions;