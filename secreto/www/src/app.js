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

$(function() {

    if (window.localStorage.getItem('token')) {
        openFB.api({
            path: '/me',
            success: function(data) {
                window.currentUser = data;
                window.currentUser.avatarUrl = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                window.currentUser.facebook_id = data.id;
                
                navigation = new phonepack.Navigation(document.querySelector('.navigation'), {
                    page: 'views/home.html'
                }, HomeCtrl);
            },
            error: function(e) {
                navigation = new phonepack.Navigation(document.querySelector('.navigation'), {
                    page: 'views/login.html'
                }, LoginCtrl);
            }
        });
    }
    else {
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