module.exports = {

    getPostComments: function(post, cb) {
        socket.emit('getPostComments', post, function(err, comments) {
            cb(comments);
        });
    },

    createComment: function(data, cb) {
        socket.emit('createComment', data, function(err, comment) {
            cb(comment);
        });
    },

    on: function(event, fn) {
        socket.on(event, fn);
    }
}