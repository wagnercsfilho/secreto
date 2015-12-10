/*global socket*/
var PostModel = require("../models/post");

module.exports = {
    getAllPost: function(friends, cb) {
        socket.emit('getAllPost', friends, function(err, posts) {
            cb(posts);
        });
    },

    getFriendPosts: function(friends, cb) {
        socket.emit('getFriendPosts', friends, function(err, posts) {
            PostModel.set(posts);
            if (cb) cb(posts);
        });
    },

    likePost: function(data, cb) {
        socket.emit('likePost', {
            post: data,
            facebook_id: currentUser.facebook_id
        }, function(err, post) {
            PostModel.updateById(post);
            if (cb) cb(post);
        });
    },

    dislikePost: function(data, cb) {
        socket.emit('dislikePost', {
            post: data,
            facebook_id: currentUser.facebook_id
        }, function(err, post) {
            PostModel.updateById(post);
            if (cb) cb(post);
        });
    },

    on: function(event, fn) {
        socket.on(event, fn);
    }
}