var React = require("react");
var classNames = require('classnames');
var PostService = require("../services/post");

var LikeButton = React.createClass({
    _likePost: function() {
        var post = this.props.post;
        
        if (post.likes.indexOf(currentUser.facebook_id) === -1) {
            PostService.likePost(post);
        }
        else {
            PostService.dislikePost(post);
        }

    },
    render: function() {
        var post = this.props.post;

        var btnClass = classNames({
            'button': true,
            'ripple': true,
            'button--icon': true,
            'like': true,
            'text-red': post.likes.indexOf(currentUser.facebook_id) > -1
        });

        return (<button className={btnClass} onClick={this._likePost}>
                    <i className="icon mdi mdi-heart-outline"></i> 
               </button>);
    }
});

module.exports = LikeButton;