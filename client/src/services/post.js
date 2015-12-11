/*global socket*/

var PostActions = require("../actions/PostActions");

module.exports = {

    create: function(data, cb) {
        socket.emit('createPost', data, function(err, post) {
            PostActions.create(post);
            if (cb) cb();
        });
    },

    getFriendPosts: function(friends, cb) {
        socket.emit('getFriendPosts', friends, function(err, posts) {
            PostActions.initial(posts);
            
            if (cb) cb();
        });
    },

    likePost: function(data, cb) {
        socket.emit('likePost', {
            post: data,
            facebook_id: currentUser.facebook_id
        }, function(err, post) {
            PostActions.updateById(post);
            
            if (cb) cb(post);
        });
    },

    dislikePost: function(data, cb) {
        socket.emit('dislikePost', {
            post: data,
            facebook_id: currentUser.facebook_id
        }, function(err, post) {
            PostActions.updateById(post);
            
            if (cb) cb(post);
        });
    },

    on: function(event, fn) {
        socket.on(event, fn);
    },

    removeListener: function(event, fn) {
        socket.removeListener(event, fn);
    }
}