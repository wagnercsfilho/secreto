var React = require("react");
var PostService = require("../../services/post");
var PostItem = require("./PostItem");
var PostModel = require("../../models/post");

var initialState = function(posts) {
    this.setState({
        posts: PostModel.all()
    });
}

var PostList = React.createClass({
    getInitialState: function() {
        return {
            posts: PostModel.all()
        }
    },
    componentDidMount: function() {
        //var loading = new phonepack.Loading();
        PostModel.subscribe(initialState.bind(this));

        openFB.api({
            path: '/me/friends',
            success: function(results) {
                var friends = results.data.map(function(f) {
                    return f.id;
                }).concat(window.currentUser.facebook_id);

                PostService.getFriendPosts(friends);

            }.bind(this)
        });
    },
    componentWillUnmount: function() {
        PostModel.unsubscribe(initialState.bind(this));
    },
    render: function() {
        var items = this.state.posts.map(function(post, index) {
            return <PostItem key={index} post={post} />
        }.bind(this));

        return <ul className="quote-card"> {items} </ul>;
    }
});

module.exports = PostList;