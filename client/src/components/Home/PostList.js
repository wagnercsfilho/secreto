var React = require("react");
var PostService = require("../../services/post");
var PostItem = require("./PostItem");
var PostStore = require("../../stores/PostStore");

var getPostState = function(posts) {
    return {
        posts: PostStore.getAll()
    };
}

var PostList = React.createClass({

    getInitialState: function() {
        return getPostState();
    },

    componentDidMount: function() {
        PostStore.addChangeListener(this._onChange);

        var loading = new phonepack.Loading({
            spinner: true,
            overlay: true,
            title: 'Loading'
        }).show();

        PostService.getFriendPosts(function() {
            loading.hide();
        });
        
    },

    componentWillUnmount: function() {
        PostStore.removeChangeListener(this._onChange);
    },

    render: function() {

        var items = this.state.posts.map(function(post, index) {
            return <PostItem key={post._id} post={post} />
        });

        return <ul className="quote-card"> {items} </ul>;
    },

    _onChange: function() {
        this.setState(getPostState());
    }
});

module.exports = PostList;