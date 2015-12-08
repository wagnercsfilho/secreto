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
    createdAt: { type: Date, default: Date.now }
});
var Comment = mongoose.model('Comment', {
    text: String,
    _post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
}); 

io.on('connection', function(socket) {
    socket.on('createPost', function(data, cb) {
        Post.create(data, function(err, post) {
 
            socket.emit('newPost', post);

            cb(err, post);
        }); 
    });

    socket.on('likePost', function(data, cb) {
        Post.findById(data.post._id, function(err, post) {

            if (post.likes === undefined) post.likes = [];
            post.likes.push(data.facebook_id);
 
            post.save(function(err, data) {
                socket.emit('newLike_' + data._id, data);
                cb(err, data);
            });

        });
    });

    socket.on('getFriendPosts', function(data, cb) {
        Post.find({
            'user.facebook_id': {
                $in: data
            }
        }).exec(function(err, data) {
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
                post.save(function(err, data) {
                    io.sockets.emit('newComment_' + data._id, data);
                    cb(err, data);
                });
            });

        });
    })

    socket.on('getPostComments', function(data, cb) {
        Comment.find({
            _post: data._id
        }).exec(function(err, comment) {
            console.log(err, comment)
            cb(err, comment);
        });
    });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
