import React from "react"
import Container from './redux/Container'
import { Navigation, Pages } from './phonepack'
import Home from './pages/Home/Home.js'
import Compose from './pages/Compose/Compose.js'
import FindImage from './pages/FindImage/FindImage.js'
import Comments from './pages/Comments/Comments.js'
import Login from './pages/Login/Login.js'
import Notifications from './pages/Notifications/Notifications.js'

import './App.scss'

class App extends Container {

    beforePage(next) {
        openFB.getLoginStatus((data) => {
            if (data.status === 'connected') {
                openFB.api({
                    path: '/me',
                    success: (data) => {
                        let user = data;
                        user.facebook_id = data.id;
                        socket.emit('createUpdateUser', user, (newUser) => {
                            window.currentUser = newUser;
                            Navigation.changePage('mainNav', 'Home');
                        });
                    }, error: (err) => {
                        window.currentUser = null;
                        openFB.logout();
                        next();
                    }
                });
            }
            else {
                next();
            }
        })
    }
    
    render() {
        return (
            <Navigation default='Login' name="mainNav" beforePage={this.beforePage.bind(this)}>
                <Pages name='Home' component={Home} />
                <Pages name='Compose' component={Compose} />
                <Pages name='FindImage' component={FindImage} />
                <Pages name='Comments' component={Comments} />
                <Pages name='Notifications' component={Notifications} />
                <Pages name='Login' component={Login} />
            </Navigation>
        )
    }

}

export default App