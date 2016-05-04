var React = require("react");
var PostService = require("../../services/post");
var CommentsCtrl = require("../../controllers/comments");
var LikeButton = require("../LikeButton");
var PostActions = require("../../actions/PostActions");

var PostItem = React.createClass({

    propTypes: {
        post: React.PropTypes.object.isRequired
    },

    _onSocketChange: function(data) {
        PostActions.updateById(data);
    },

    componentDidMount: function() {
        PostService.on('newLike_' + this.props.post._id, this._onSocketChange);
        PostService.on('dislike_' + this.props.post._id, this._onSocketChange);
        PostService.on('updateCommentCount_' + this.props.post._id, this._onSocketChange);
    },

    componentWillUnmount: function() {
        PostService.on('newLike_' + this.props.post._id, this._onSocketChange);
        PostService.on('dislike_' + this.props.post._id, this._onSocketChange);
        PostService.on('updateCommentCount_' + this.props.post._id, this._onSocketChange);
    },

    render: function() {
        var post = this.props.post;

        return (
            <li className={post.quotebg}> 
                <p>   {post.text}   </p> 
                <div className="quote_bottom"> 
                    <div className="row"> 
                        <div className="cell"> 
                            <LikeButton post={post} />
                            <span>  {post.likes.length}  </span>   
                            <button className="button ripple button--icon comment" onClick={this._openPageComments}>
                                <i className="icon mdi mdi-comment-outline"></i> 
                            </button> 
                            <span>  {post.comments}  </span>  
                        </div> 
                        <div className="cell"> 
                            <cite> Amigo </cite> 
                        </div> 
                    </div>
                </div> 
            </li>
        );
    },

    _openPageComments: function(e) {
        navigation.pushPage('/views/comments.html', this.props.post, CommentsCtrl);
    }

});

module.exports = PostItem;