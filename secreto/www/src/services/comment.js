var CommentActions = require("../actions/CommentActions");
var PostActions = require("../actions/PostActions");

module.exports = {

    getCommentByPost: function(post, cb) {
        socket.emit('getCommentByPost', post, function(err, comments) {
            CommentActions.initial(comments);
            if (cb) cb(comments);
        });
    },

    create: function(data, cb) {
        socket.emit('createComment', {
            _post: data.post._id,
            text: data.text,
            user: data.user
        }, function(err, comment) {
            CommentActions.create(comment);
            if (cb) cb(comment);
        });
    },

    like: function(comment, cb) {
        var data = {
            comment: comment,
            user: currentUser
        };

        socket.emit('likeComment', data, function(err, comment) {
            CommentActions.like(comment);
            if (cb) cb();
        });
    },
    
    dislike: function(comment, cb) {
        var data = {
            comment: comment,
            user: currentUser
        };

        socket.emit('dislikeComment', data, function(err, comment) {
            CommentActions.like(comment);
            if (cb) cb();
        });
    },

    on: function(event, fn) {
        socket.on(event, fn);
    },

    removeListener: function(event, fn) {
        socket.removeListener(event, fn);
    }
}