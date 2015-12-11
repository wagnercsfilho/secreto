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

    on: function(event, fn) {
        socket.on(event, fn);
    },

    removeListener: function(event, fn) {
        socket.removeListener(event, fn);
    }
}