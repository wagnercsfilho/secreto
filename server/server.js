var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var mongoose = require('mongoose');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

app.use(express.static(path.normalize(__dirname + '/../client')));

mongoose.connect('mongodb://localhost/secreto');

var User = mongoose.model('User', {
    friends: [{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }]
});
var Post = mongoose.model('Post', {
    text: String,
    quotebg: String,
    user: mongoose.Schema.Types.Mixed,
    location: mongoose.Schema.Types.Mixed,
    likes: [String],
    comments: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
var Comment = mongoose.model('Comment', {
    text: String,
    _post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: mongoose.Schema.Types.Mixed,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
var Notification = mongoose.model('Notification', {
    type: String,
    _post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: mongoose.Schema.Types.Mixed,
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

io.on('connection', function(socket) {
    socket.on('createPost', function(data, cb) {
        Post.create(data, function(err, post) {

            socket.broadcast.emit('newPost', post);

            cb(err, post);
        });
    });

    socket.on('likePost', function(data, cb) {
        Post.findById(data.post._id, function(err, post) {

            if (post.likes === undefined) post.likes = [];
            post.likes.push(data.facebook_id);

            post.save(function(err, post) {
                socket.broadcast.emit('newLike_' + post._id, post);

                if (data.facebook_id !== post.user.facebook_id) {
                    Notification.remove({
                        '_post': post._id
                    }, function(err) {
                        Notification.create({
                            type: 'LIKE',
                            user: post.user,
                            _post: post._id,
                            read: false
                        }, function(err, notification) {
                            io.sockets.emit('newNotification_' + post.user.facebook_id, notification);

                            cb(err, post);
                        });
                    });
                }
                else {
                    cb(err, post);
                }

            });



        });
    });

    socket.on('dislikePost', function(data, cb) {
        Post.findById(data.post._id, function(err, post) {

            post.likes.splice(post.likes.indexOf(data.facebook_id), 1);
            post.save(function(err, data) {
                socket.broadcast.emit('dislike_' + data._id, data);
                cb(err, data);
            });

        });
    });

    socket.on('getFriendPosts', function(data, cb) {
        Post.find({
            'user.facebook_id': {
                $in: data
            }
        })
        .sort({ _id: -1 })
        .exec(function(err, data) {
            cb(err, data);
        });
    });

    socket.on('getAllPost', function(data, cb) {
        Post.find({
            'user.facebook_id': {
                $nin: data
            }
        }).exec(function(err, data) {
            cb(err, data);
        });
    });

    socket.on('createComment', function(data, cb) {
        Comment.create(data, function(err, comment) {
            Post.findById(data._post, function(err, post) {
                if (post.comments === undefined) post.comments = 0;
                post.comments += 1;
                post.save(function(err, post) {
                    socket.broadcast.emit('newComment_' + post._id, comment);
                    socket.broadcast.emit('updateCommentCount_' + post._id, post);

                    if (data.user.facebook_id !== post.user.facebook_id) {
                        Notification.remove({
                            '_post': post._id
                        }, function(err) {
                            Notification.create({
                                type: 'COMMENT',
                                user: post.user,
                                _post: post._id,
                                read: false
                            }, function(err, notification) {
                                socket.broadcast.emit('newNotification_' + post.user.facebook_id, notification);

                                cb(err, comment);
                            });
                        });

                    }
                    else {
                        cb(err, comment);
                    }

                });


            });

        });
    })

    socket.on('getCommentByPost', function(data, cb) {
        Comment.find({
            _post: data._id
        }).exec(function(err, comment) {
            cb(err, comment);
        });
    });

    socket.on('getUnreadNotification', function(data, cb) {
        Notification.find({
                'user.facebook_id': data.facebook_id,
                read: false
            })
            .populate('_post')
            .exec(function(err, notification) {
                cb(err, notification);
            });
    });

    socket.on('getAllNotification', function(data, cb) {
        Notification.find({
                'user.facebook_id': data.facebook_id,
            })
            .populate('_post')
            .exec(function(err, notification) {
                cb(err, notification);
            });
    });

    socket.on('readAllNotifications', function(data, cb) {
        Notification.update({
                'user.facebook_id': data.facebook_id,
                read: false
            }, {
                $set: {
                    read: true
                }
            }, {
                multi: true
            },
            function(err, notification) {
                cb(err, notification);
            });
    });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
