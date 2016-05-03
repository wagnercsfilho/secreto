import React from 'react'
import {
    Navigation
}
from '../../phonepack'

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
        return (
            <div className="pages" style={ {'backgroundSize': 'cover', 'backgroundImage': 'url(http://39yny21p8fx4asd2a1n4klsx.wpengine.netdna-cdn.com/wp-content/uploads/2014/06/secret1.jpg)'} }>
                <section className="content content--padding">

                    <div className="row row--gutters" style={ {'height': '100%'} }>
                        <div className="cell cell--bottom">
                            <h1 className="text-white" style={ {'textAlign': 'center', 'margin': '0px auto 15px', 'textShadow': '1px 1px #000' } } >Secreto</h1>
                            <button className="button button--large button--block button--raised ripple bg-indigo text-white loginfb" onClick={this.login.bind(this)}>Login</button>
                        </div>
                    </div>
            
                </section>
            </div>
        )
    }

}

export default Login