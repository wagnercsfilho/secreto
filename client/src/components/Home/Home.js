var React = require("react");
var PostList = require("./PostList");
var ComposeCtrl = require("../../controllers/compose");
var PostService = require("../../services/post");

var Home = React.createClass({
    
    componentDidMount: function(){
        
    },
    
    _addTabPlugin: function(input){
        new phonepack.TabBar(input);
    },
    
    _addPullToRefreshPlugin: function(input){
        var pullToRefresh = new phonepack.PullToRefresh(input, { type: 'snake' }, function(){
            PostService.getFriendPosts(function(){
                pullToRefresh.hide();
            });
        });
    },
    
    _openComposeView: function(){
        navigation.pushPage('views/compose.html', null, ComposeCtrl);
    },
    
    render: function() {
        return (
            <div>
                <header className="header header--shadow" style={ {height: '48px'} }>
                    <div ref={this._addTabPlugin} className="tab-bar bg-white tab-bar--text-black tab-bar--indicator-bottom-black" style={ {top: 0, display: 'block'} }>
                        <div className="tab-bar__item ripple active" style={ {display: 'inline-block', padding: '0 15px'} } data-tab="#tabFriends">
                            <i className="icon mdi mdi-home"></i>
                        </div>
                        <div className="tab-bar__item ripple" id="tabItemNotifications" style={ {display: 'inline-block', padding: '0 15px'}} data-tab="#tabNotifications">
                            <i className="icon mdi mdi-bell-outline"></i>
                            <div className="badge bg-red hide" id="badgeNotification">0</div>
                        </div>
                    </div>
                </header> 
                <section className="content has-header" style={ {paddingTop: '48px'} } id="tabFriends" ref={this.__addPullToRefreshPlugin}>
                    <PostList />
                </section> 
                <section className="content has-header" style={ {paddingTop: '48px'} } id = "tabNotifications">
                    <ul className="list" id="listNotifications">
        
                    </ul> 
                </section> 
                <button className="button bg-blue text-white button--fab button--fab-floating" onClick={this._openComposeView}>
                    <i className="icon mdi mdi-pencil"></i> 
                </button>
            </div>
        )
    }
});

module.exports = Home;