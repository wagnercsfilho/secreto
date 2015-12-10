var React = require("react");
var PostService = require("../../services/post");
var PostModel = require("../../models/post");
var LikeButton = require("../LikeButton");

var initialState = function() {
    this.setState({
        post: PostModel.getById(this.props.post._id)
    });
}

var PostBox = React.createClass({
    getInitialState: function(){
        return {
            post: PostModel.getById(this.props.post._id)
        }
    },
    componentDidMount: function() {
        PostModel.subscribe(initialState.bind(this));
    },
    componentWillUnmount: function() {
        PostModel.unsubscribe(initialState);
    },
    _closePage: function() {
        navigation.closeCurrentPage();
    },
    render: function() {
        var post = this.state.post;

        return (
            <ul className="quote-card">
                <li className={post.quotebg}> 
                <div className="quote_top"> 
                    <button className="button button--icon ripple" onClick={this._closePage}> 
                      <i className="icon mdi mdi-arrow-left"></i> 
                    </button> 
                    <button className="button ripple button--icon shared" style={ {float: 'right'} }>
                        <i className="icon mdi mdi-share-variant"></i> 
                    </button> 
                </div> 
                <p>   {post.text}   </p> 
                <div className="quote_bottom"> 
                    <div className="row"> 
                        <div className="cell"> 
                            <LikeButton post={post} />
                            <span>  {post.likes.length}  </span>   
                            <button className="button ripple button--icon comment">
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
            </ul>
        );
    }
});

module.exports = PostBox;