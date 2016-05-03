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
    name: String,
    facebook_id: String
});
var Post = mongoose.model('Post', {
    text: String,
    quotebg: String,
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: mongoose.Schema.Types.Mixed,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    socket.on('createUpdateUser', function(data, cb) {
        User.update({
            facebook_id: data.facebook_id
        }, data, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }, () => {
            User.findOne({
                facebook_id: data.facebook_id
            }, (err, user) => {
                cb(user);
            })
        });
    });
    socket.on('getPosts', function(data, cb) {
        User.find({
            facebook_id: {
                $in: data
            }
        }).exec(function(err, users) {
            Post.find({
                    '_user': {
                        $in: users
                    }
                })
                .populate('_user')
                .sort({
                    _id: -1
                })
                .exec(function(err, data) {
                    cb(err, data);
                });
        })
    });
    socket.on('createPost', function(data, cb) {
        Post.create(data, function(err, post) {
            cb(err, post);
        });
    });
    socket.on('likePost', function(data, cb) {
        Post.findById(data.post._id, function(err, post) {
            post.likes.push(data._user);
            post.save(function(err, post) {

                if (data._user !== post._user) {
                    Notification.create({
                        type: 'LIKE',
                        _user: post._user,
                        _post: post._id,
                        read: false
                    }, function(err, notification) {
                        socket.broadcast.emit('newNotification/' + post._user, notification);
                        cb(err, post);
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

            post.likes.splice(post.likes.indexOf(data._user), 1);
            post.save(function(err, data) {
                cb(err, data);
            });

        });
    });
    socket.on('createComment', function(data, cb) {
        Comment.create(data, function(err, comment) {
            Post.findById(data._post, function(err, post) {
                post.comments += 1;
                post.save(function(err, post) {

                    if (data.user !== post._user) {
                        Notification.create({
                            type: 'COMMENT',
                            _user: post._user,
                            _post: post._id,
                            read: false
                        }, function(err, notification) {
                            socket.broadcast.emit('newNotification/' + post._user, notification);
                            cb(err, comment);
                        });
                    }
                    else {
                        cb(err, comment);
                    }

                });

            });

        });
    })
    socket.on('getCommentByPost', function(post, cb) {
        Comment.find({
            _post: post._id
        }).exec(function(err, comment) {
            cb(err, comment);
        });
    });
    socket.on('getNotifications', function(userId, cb) {
        Notification.find({
                '_user': userId,
                read: false
            })
            .sort({
                _id: -1
            })
            .populate('_post')
            .exec(function(err, notifications) {
                console.log(err, notifications)
                cb(err, notifications);
            });
    });
    socket.on('readNotifications', function(userId, cb) {
        Notification.update({
                '_user': userId,
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
