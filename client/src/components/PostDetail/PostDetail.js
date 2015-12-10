var React = require("react");
var PostModel = require("../../models/post");
var PostBox = require("./PostBox");
var CommentBox = require("./CommentBox");

var PostDetail = React.createClass({
    render: function() {
        return (<div>
                    <PostBox post={this.props.post} />
                    <CommentBox post={this.props.post} />
                </div>);
    }
});

module.exports = PostDetail;