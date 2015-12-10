/*global phonepack*/
/*global navigation*/
/*global openFB*/

var ComposeCtrl = require("./compose");
var PostTemplate = require("../templates/post");
var NotificationTemplate = require("../templates/notification");
var CommentsCtrl = require("./comments");
var PostService = require("../services/post");
var NotificationService = require("../services/notification");

var React = require("react");
var ReactDOM = require('react-dom');
var PostList = require("../components/Post/PostList");

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
    var getAllNotification = function() {
        NotificationService.getAllNotification(currentUser, function(notifications) {
            console.log(notifications)
            notifications.forEach(function(notification) {
                NotificationTemplate($contentNotifications, notification);
            });
        });
    }

    template = $(template);
    var contentFriends = template.find('#tabFriends');
    var contentWorld = template.find('#tabWorld');
    var $contentNotifications = template.find('#tabNotifications');
    var $badge_notification = template.find('#badgeNotification');
    var $tabBar = template.find('#tab');
    var $tabItemNotifications = template.find('#tabItemNotifications');

    var tabBar = new phonepack.TabBar($tabBar[0]);
    /*var pullToRefresh = new phonepack.PullToRefresh(contentFriends[0], {
        type: 'snake'
    }, function() {
        PostService.getFriendPosts(friends, function(posts) {
            posts.forEach(function(post) {
                PostTemplate(contentFriends, post, CommentsCtrl, false);
            });
            pullToRefresh.hide();
        });
    });
    $tabItemNotifications.on('click', function() {
        NotificationService.readAllNotifications(currentUser, function(err, notification) {
            console.log(err, notification)
            $badge_notification.html('0').addClass('hide');
        });
    });
    template.on('click', '.compose', function(e) {
        navigation.pushPage('views/compose.html', {}, ComposeCtrl);
    });
    PostService.on('newPost', function(post) {
        PostTemplate(contentFriends, post, CommentsCtrl);
    });
    NotificationService.on('newNotification_' + currentUser.facebook_id, function(notification) {
        NotificationService.getUnreadNotification(currentUser, function(data) {
            $badge_notification.html(data.length).removeClass('hide');
        });
        getAllNotification();
    });
    getAllNotification();
    NotificationService.getUnreadNotification(currentUser, function(data) {
        if (data.length) {
            $badge_notification.html(data.length).removeClass('hide');
        }
    });
    */
    
    ReactDOM.render(<PostList />, contentFriends[0]);

}

module.exports = HomeCtrl;