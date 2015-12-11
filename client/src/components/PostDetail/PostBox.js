var React = require("react");
var PostService = require("../../services/post");
var PostStore = require("../../stores/PostStore");
var LikeButton = require("../LikeButton");

var getPostState = function(posts) {
    return {
        post: PostStore.getById(this.props.post._id)
    };
}

var PostBox = React.createClass({
    
    getInitialState: function() {
        console.log(this.props)
        return getPostState.call(this);
    },
    
    componentDidMount: function() {
        PostStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
        PostStore.removeChangeListener(this._onChange);
    },
    
    _closePage: function() {
        navigation.closeCurrentPage();
    },
    
    render: function() {
        console.log(this.state);
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
    },
    
    _onChange: function() {
        this.setState(getPostState.call(this));
    }
    
});

module.exports = PostBox;