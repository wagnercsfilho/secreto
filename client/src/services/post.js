/*global socket*/

module.exports = {
    getAllPost: function(friends, cb) {
        socket.emit('getAllPost', friends, function(err, posts) {
            cb(posts);
        });

    },

    getFriendPosts: function(friends, cb) {
        socket.emit('getFriendPosts', friends, function(err, posts) {
            cb(posts);
        });
    },
    
    likePost: function(data, cb){
        socket.emit('likePost', data, function(err, post){
            cb(post);
        });
    },

    on: function(event, fn) {
        socket.on(event, fn);
    }
}