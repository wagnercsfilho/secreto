/*global phonepack*/
/*global navigation*/
/*global openFB*/

var ComposeCtrl = require("./compose");
var PostTemplate = require("../templates/post");
var CommentsCtrl = require("./comments");
var PostService = require("../services/post");

function HomeCtrl(template) {
    var friends;
    var getAllPost = function(friends) {
        PostService.getAllPost(friends, function(posts) {
            posts.forEach(function(post) {
                PostTemplate(contentWorld, post, CommentsCtrl, true);
            });
            loading.hide();
        });
    }
    var getFriendPosts = function(friends) {
        PostService.getFriendPosts(friends, function(posts) {
            posts.forEach(function(post) {
                PostTemplate(contentFriends, post, CommentsCtrl, false);
            });
            loading.hide();
        });
    }

    template = $(template);
    var contentFriends = template.find('#tabFriends');
    var contentWorld = template.find('#tabWorld');

    var tabBar = new phonepack.TabBar(template.find('#tab')[0]);
    var pullToRefresh = new phonepack.PullToRefresh(contentFriends[0], {}, function() {
        getFriendPosts(friends);
    });
    var loading = new phonepack.Loading();

    template.on('click', '.compose', function(e) {
        navigation.pushPage('views/compose.html', {}, ComposeCtrl);
    });

    PostService.on('newPost', function(post) {
        PostTemplate(contentFriends, post, CommentsCtrl);
    });

    loading.show();
    openFB.api({
        path: '/me/friends',
        success: function(results) {
            friends = results.data.map(function(f) {
                return f.id;
            }).concat(window.currentUser.facebook_id);

            getFriendPosts(friends);
            getAllPost(friends);
        }
    });
}

module.exports = HomeCtrl;