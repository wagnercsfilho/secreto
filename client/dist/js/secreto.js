/**
 * client - 
 * @version v1.0.0
 * @link 
 * @license ISC
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.secreto = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global io*/
/*global navigation*/
/*global socket*/
/*global phonepack*/
window.socket = io.connect('https://secreto-wagnercsfilho.c9users.io/');
window.navigation;

var LoginCtrl = require("./controllers/login");
var HomeCtrl = require("./controllers/home");

openFB.init({
    appId: '1707024216207772'
});

$(function () {

    if (window.localStorage.getItem('token')) {
        openFB.api({
            path: '/me',
            success: function (data) {
                window.currentUser = data;
                window.currentUser.avatarUrl = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                window.currentUser.facebook_id = data.id;

                navigation = new phonepack.Navigation(document.querySelector('.navigation'), {
                    page: 'views/home.html'
                }, HomeCtrl);
            },
            error: function (e) {
                navigation = new phonepack.Navigation(document.querySelector('.navigation'), {
                    page: 'views/login.html'
                }, LoginCtrl);
            }
        });
    } else {
        navigation = new phonepack.Navigation(document.querySelector('.navigation'), {
            page: 'views/login.html'
        }, LoginCtrl);
    }

    /*navigation.on('beforePush', function(template, next) {
           if (!window.localStorage.getItem('token')) {
               navigation.changePage('views/login.html', {}, LoginCtrl);
           }
           else {
               next();
           }
       });*/
});

},{"./controllers/home":4,"./controllers/login":5}],2:[function(require,module,exports){
var PostDetailsTemplate = require("../templates/postDetails");
var CommentTemplate = require("../templates/comment");
var CommentService = require("../services/comment");

function CommentsCtrl(template) {
    var post = navigation.params;

    template = $(template);
    var elContent = template.find('.content');
    var elComments = template.find('#comments');
    var elCreateComment = template.find('#createComment');
    var elText = template.find('input');

    PostDetailsTemplate(elContent, post, false);

    CommentService.getPostComments(post, function (comments) {
        if (comments) {
            comments.forEach(function (comment) {
                CommentTemplate(elComments, comment);
            });
        }
    });

    CommentService.on('newComment_' + post._id, function (comment) {
        elContent.animate({
            scrollTop: elContent[0].scrollHeight
        }, 800);

        CommentTemplate(elComments, comment);
    });

    elCreateComment.on('click', function (e) {
        CommentService.createComment({
            _post: post._id,
            text: elText.val(),
            user: window.currentUser
        }, function (comment) {
            var notification = new phonepack.Notification();
            notification.success('Successfully');

            elText.val('');
        });
    });
}

module.exports = CommentsCtrl;

},{"../services/comment":6,"../templates/comment":8,"../templates/postDetails":10}],3:[function(require,module,exports){
function getLocation(cb) {
    function displayLocation(latitude, longitude, cb) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                if (data.results[0]) {
                    var add = data.results[data.results.length - 3].formatted_address;
                    console.log(add);
                    var value = add.split(",");

                    var count = value.length;
                    var country = value[count - 1];
                    var city = value[count - 2];
                    cb({
                        city: city,
                        country: country
                    });
                } else {
                    alert("address not found");
                }
            }
        };
        request.send();
    };
    navigator.geolocation.getCurrentPosition(function (position) {
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        displayLocation(x, y, cb);
    }, function (error) {
        var errorMessage = 'Unknown error';
        switch (error.code) {
            case 1:
                errorMessage = 'Permission denied';
                break;
            case 2:
                errorMessage = 'Position unavailable';
                break;
            case 3:
                errorMessage = 'Timeout';
                break;
        }
        alert(errorMessage);
    }, {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
    });
}

function ComposeCtrl(template) {

    var data = {
        text: null,
        quotebg: 'white',
        user: window.currentUser
    };

    var text = $(template).find('textarea');
    var postTexture = $(template).find('.postTexture');
    var blockquote = $(template).find('blockquote');

    var textures = ['white', 'blue', 'red', 'gray', 'green', 'black', 'pink', 'purple', 'orange', 'teal'];
    var textureIndex = 0;

    text.elastic();
    text.focus();

    postTexture.on('click', function (e) {
        var bg = $(this);

        if (textureIndex === textures.length - 1) textureIndex = -1;
        textureIndex++;

        blockquote.removeClass();
        blockquote.addClass('quote-card ' + textures[textureIndex]);

        data.quotebg = textures[textureIndex];
    });

    $(template).on('click', '.new-compose', function () {
        getLocation(function (location) {
            data.text = text.val();
            data.location = location;
            socket.emit('createPost', data, function () {
                var notification = new phonepack.Notification();
                notification.success('Successfully');

                navigation.closeCurrentPage();
            });
        });
    });
}

module.exports = ComposeCtrl;

},{}],4:[function(require,module,exports){
/*global phonepack*/
/*global navigation*/
/*global openFB*/

var ComposeCtrl = require("./compose");
var PostTemplate = require("../templates/post");
var CommentsCtrl = require("./comments");
var PostService = require("../services/post");

function HomeCtrl(template) {
    var friends;
    var getAllPost = function (friends) {
        PostService.getAllPost(friends, function (posts) {
            posts.forEach(function (post) {
                PostTemplate(contentWorld, post, CommentsCtrl, true);
            });
            loading.hide();
        });
    };
    var getFriendPosts = function (friends) {
        PostService.getFriendPosts(friends, function (posts) {
            posts.forEach(function (post) {
                PostTemplate(contentFriends, post, CommentsCtrl, false);
            });
            loading.hide();
        });
    };

    template = $(template);
    var contentFriends = template.find('#tabFriends');
    var contentWorld = template.find('#tabWorld');

    var tabBar = new phonepack.TabBar(template.find('#tab')[0]);
    var pullToRefresh = new phonepack.PullToRefresh(contentFriends[0], {}, function () {
        getFriendPosts(friends);
    });
    var loading = new phonepack.Loading();

    template.on('click', '.compose', function (e) {
        navigation.pushPage('views/compose.html', {}, ComposeCtrl);
    });

    PostService.on('newPost', function (post) {
        PostTemplate(contentFriends, post, CommentsCtrl);
    });

    loading.show();
    openFB.api({
        path: '/me/friends',
        success: function (results) {
            friends = results.data.map(function (f) {
                return f.id;
            }).concat(window.currentUser.facebook_id);

            getFriendPosts(friends);
            getAllPost(friends);
        }
    });
}

module.exports = HomeCtrl;

},{"../services/post":7,"../templates/post":9,"./comments":2,"./compose":3}],5:[function(require,module,exports){
/* global openFB*/

var HomeCtrl = require("./home");

function LoginCtrl(template) {

    openFB.init({
        appId: '1707024216207772'
    });

    $(template).find('.loginfb').on('click', function () {
        openFB.login(function (data) {
            window.localStorage.setItem('token', data.authResponse.accessToken);

            openFB.api({
                path: '/me',
                success: function (data) {
                    window.currentUser = data;
                    window.currentUser.avatarUrl = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                    window.currentUser.facebook_id = data.id;

                    window.navigation.changePage('/views/home.html', {}, HomeCtrl);
                }
            });
        }, {
            scope: 'email,public_profile,user_friends'
        });
    });
}

module.exports = LoginCtrl;

},{"./home":4}],6:[function(require,module,exports){
module.exports = {

    getPostComments: function (post, cb) {
        socket.emit('getPostComments', post, function (err, comments) {
            cb(comments);
        });
    },

    createComment: function (data, cb) {
        socket.emit('createComment', data, function (err, comment) {
            cb(comment);
        });
    },

    on: function (event, fn) {
        socket.on(event, fn);
    }
};

},{}],7:[function(require,module,exports){
/*global socket*/

module.exports = {
    getAllPost: function (friends, cb) {
        socket.emit('getAllPost', friends, function (err, posts) {
            cb(posts);
        });
    },

    getFriendPosts: function (friends, cb) {
        socket.emit('getFriendPosts', friends, function (err, posts) {
            cb(posts);
        });
    },

    likePost: function (data, cb) {
        socket.emit('likePost', data, function (err, post) {
            cb(post);
        });
    },

    on: function (event, fn) {
        socket.on(event, fn);
    }
};

},{}],8:[function(require,module,exports){
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var avatarsIcons = ['emoticon', 'emoticon-cool', 'emoticon-devil', 'emoticon-happy', 'emoticon-neutral', 'emoticon-poop', 'emoticon-tongue', 'fire', 'fish', 'flower', 'food-apple', 'football', 'motorbike', 'snowman', 'umbrella'];
var avatarColors = ['bg-red', 'bg-pink', 'bg-purple', 'bg-deep-purple', 'bg-indigo', 'bg-blue', 'bg-light-blue', 'bg-cyan', 'bg-teal', 'bg-green', 'bg-light-green', 'bg-lime', 'bg-yellow'];

function CommentTemplate(context, comment) {

    var avatar = {
        icon: avatarsIcons[getRandomInt(0, avatarsIcons.length - 1)],
        color: avatarColors[getRandomInt(0, avatarColors.length - 1)]
    };

    context.append('<li class="list__item">' + '<div class="list__primary"><i class="icon icon--circled ' + avatar.color + ' text-white mdi mdi-' + avatar.icon + '"></i></div>' + '<div class="list__content">' + comment.text + '</div>' + '<div class="list__secondary"><button class="button button--icon ripple"><i class="icon mdi mdi-heart-outline"></button></div>' + '</li>');
}

module.exports = CommentTemplate;

},{}],9:[function(require,module,exports){
var PostService = require("../services/post");

function PostTemplate(context, post, CommentsCtrl, isPublic) {
    var html = '<blockquote class="quote-card ' + post.quotebg + '">' + '<div class="quote_top">' + '<button class="button ripple button--icon shared" style="float: right"><i class="icon mdi mdi-share-variant"></i> </button>' + '</div>' + '<p> ' + post.text + ' </p>' + '<div class="quote_bottom">' + '<div class="row">' + '<div class="cell">' + '<button class="button ripple button--icon like ' + isLiked() + '"><i class="icon mdi mdi-heart-outline"></i> </button> <span>' + post.likes.length + '</span>  ' + '<button class="button ripple button--icon comment"><i class="icon mdi mdi-comment-outline"></i> </button> <span>' + post.comments + '</span> ' + '</div>' + '<div class="cell">' + '<cite>' + (isPublic === true && post.location ? post.location.city : 'Amigo') + '</cite>' + '</div>' + '</div>' + '</div>' + '</blockquote>';
    var $el = $(html);
    var $elComment = $el.find('.comment');
    var $elLike = $el.find('.like');
    var $elShared = $el.find('.shared');
    var $elLikes = $elLike.next();
    var $elComments = $elComment.next();

    $elComment.on('click', function (e) {
        navigation.pushPage('/views/comments.html', post, CommentsCtrl);
    });

    $elLike.on('click', function (e) {
        if (post.likes.indexOf(currentUser.facebook_id) === -1) {
            PostService.likePost({
                post: post,
                facebook_id: currentUser.facebook_id
            }, function (data) {
                post = data;
            });
        }
    });

    $elShared.on('click', function (e) {
        html2canvas($(this).closest('blockquote'), {
            onrendered: function (canvas) {
                $('body').html(canvas);
            }
        });
    });

    PostService.on('newLike_' + post._id, function (data) {
        post = data;
        if (data.likes.indexOf(currentUser.facebook_id) > -1) {
            $elLike.addClass('text-red');
        }
        $elLikes.html(data.likes.length);
    });

    PostService.on('newComment_' + post._id, function (data) {
        post = data;
        $elComments.html(data.comments);
    });

    function isLiked() {
        if (post.likes.indexOf(currentUser.facebook_id) > -1) {
            return 'text-red';
        }
    }

    context.prepend($el);
}

module.exports = PostTemplate;

},{"../services/post":7}],10:[function(require,module,exports){
var PostService = require("../services/post");

function PostDetailsTemplate(context, post, isPublic) {
    var html = '<blockquote class="quote-card ' + post.quotebg + '">' + '<div class="quote_top">' + '<button class="button button--icon ripple" onclick="navigation.closeCurrentPage()">' + '  <i class="icon mdi mdi-arrow-left"></i>' + '</button>' + '<button class="button ripple button--icon" style="float: right"><i class="icon mdi mdi-share-variant"></i> </button>' + '</div>' + '<p> ' + post.text + ' </p>' + '<div class="quote_bottom">' + '<div class="row">' + '<div class="cell">' + '<button class="button ripple button--icon like"><i class="icon mdi mdi-heart-outline"></i> </button> <span>' + post.likes.length + '</span>  ' + '<button class="button ripple button--icon comment"><i class="icon mdi mdi-comment-outline"></i> </button> <span>' + post.comments + '</span> ' + '</div>' + '<div class="cell">' + '<cite>' + (isPublic === true && post.location ? post.location.city : 'Amigo') + '</cite>' + '</div>' + '</div>' + '</div>' + '</blockquote>';
    var $el = $(html);
    var $elComment = $el.find('.comment');
    var $elLike = $el.find('.like');
    var $elShared = $el.find('.shared');
    var $elLikes = $elLike.next();
    var $elComments = $elComment.next();

    $elLike.on('click', function (e) {
        PostService.likePost(post, function (data) {
            post = data;
        });
    });

    PostService.on('newComment_' + post._id, function (data) {
        post = data;
        $elComments.html(data.comments);
    });

    PostService.on('newLike_' + post._id, function (data) {
        post = data;
        $elLikes.html(data.likes.length);

        if (post.likes.indexOf(currentUser.facebook_id) > -1) {
            $elLike.addClass('text-red');
        }
    });

    context.prepend($el);
}

module.exports = PostDetailsTemplate;

},{"../services/post":7}]},{},[1])(1)
});