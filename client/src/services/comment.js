var CommentModel = require("../models/comment");
var PostModel = require("../models/post");

module.exports = {

    getPostComments: function(post, cb) {
        socket.emit('getPostComments', post, function(err, comments) {
            CommentModel.set(comments);
            if (cb) cb(comments);
        });
    },

    createComment: function(data, cb) {
        socket.emit('createComment', {
            _post: data.post._id,
            text: data.text,
            user: data.user
        }, function(err, comment) {
            CommentModel.add(comment);
            var post = data.post;
            post.comments += 1;
            PostModel.updateById(post);
            if (cb) cb(comment);
        });
    },

    on: function(event, fn) {
        socket.on(event, fn);
    },
    
    removeListener: function(event, fn){
        socket.removeListener(event, fn);
    }
}