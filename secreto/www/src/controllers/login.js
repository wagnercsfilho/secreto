/* global openFB*/

var HomeCtrl = require("./home");

function LoginCtrl(template) {

    openFB.init({
        appId: '1707024216207772'
    });

    $(template).find('.loginfb').on('click', function() {
        openFB.login(function(data) {
            window.localStorage.setItem('token', data.authResponse.accessToken);

            openFB.api({
                path: '/me',
                success: function(data) {
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