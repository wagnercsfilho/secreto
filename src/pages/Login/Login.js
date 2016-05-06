import React from 'react'
import { Navigation } from '../../phonepack'

import template from './Login.jsx';
import './Login.scss';

class Login extends React.Component {
    
    login() {
        openFB.login((data) => {
            openFB.api({
                path: '/me',
                success: (data) => {
                    let user = data;
                    user.avatarUrl = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                    user.facebook_id = data.id;

                    socket.emit('createUpdateUser', user, (newUser) => {
                        window.currentUser = newUser;
                        Navigation.changePage('mainNav', 'Home');
                    });
                }
            });

        }, {
            scope: 'email,public_profile,user_friends'
        });
    }

    render() {
        return template.call(this);
    }

}

export default Login