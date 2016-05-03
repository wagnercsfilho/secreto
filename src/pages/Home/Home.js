import React from "react"
import Container from '../../redux/Container'
import PostList from "./PostList.js"
import actions from "../../redux/actions"
import { Content, SideMenu, Header, HeaderButton, HeaderTitle, View, List, ListItem, Button, Icon  } from '../../phonepack'

class Home extends Container {

    constructor() {
        super();
        
        this.getState = function() {
            return {
                posts: this.store.getState().posts,
                notifications: this.store.getState().notifications.filter((notification) => !notification.read),
                loading: !this.store.getState().posts.length
            }
        }
    }

    componentDidMount() {
        super.componentDidMount();
        
        socket.on(`newNotification/${window.currentUser._id}`, (err, data) => {
            this.dispatch(actions.getNotifications());
        });
        
        this.dispatch(actions.getNotifications());
        this.dispatch(actions.getPosts(() => {
           this.setState({ loading: false });
        }));
    }
    
    toggleMenu() {
        this.refs.sideMenu.toggle();
    }
    
    hidePullToRefresh() {
        this.refs.content.hidePullToRefresh();
    }
    
    hideInfinitScroll() {
        this.refs.content.hideInfinitScroll();
    }

    render() {
        return (
            <div>
                <SideMenu ref="sideMenu">
                        <Header>
                            <HeaderTitle>Settings</HeaderTitle>
                        </Header>
                        <List>
                            <ListItem> About </ListItem>
                            <ListItem> Log out </ListItem>
                        </List>
                </SideMenu>
                <View loading={this.state.loading}>
                    <Header headerShadow shrinkHeader>
                        <HeaderButton>
                		    <Button icon ripple onClick={this.toggleMenu.bind(this)}>
                		      <Icon name="menu" />
                		    </Button>
                	    </HeaderButton>
                        <HeaderTitle>Secreto</HeaderTitle>
                        <HeaderButton>
                			<Button icon ripple onClick={this.pushPage.bind(this, 'mainNav', 'Notifications', null, 'pages--slide-left')}>
                        	    <Icon name="bell-outline" />
                        	    <div className={ { badge: true, 'bg-red': true, hide: this.state.notifications.length == 0 } }>{this.state.notifications.length}</div>
                        	</Button>
                		</HeaderButton>
                    </Header> 
                    <Content 
                        ref="content" 
                        hasHeader 
                        pullToRefresh={ () => this.dispatch(actions.getPosts(() => this.hidePullToRefresh() )) }
                        infiniteScroll={ () => this.dispatch(actions.getPosts(() => this.hideInfinitScroll() )) }
                    >
                        <PostList posts={this.state.posts} />
                    </Content> 
                    <Button fab fabFloating className="bg-blue text-white" onClick={this.pushPage.bind(this, 'mainNav', 'Compose', null, 'pages--slide-up')}>
                        <Icon name="pencil" /> 
                    </Button>
                </View>
            </div>
        )
    }

}

export default Home;