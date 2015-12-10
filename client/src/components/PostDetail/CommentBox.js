var React = require("react");
var CommentService = require("../../services/comment");
var CommentModel = require("../../models/comment");
var CommentItem = require("./CommentItem");

var addComment = function(comment) {
    CommentModel.add(comment);
}

var CommentBox = React.createClass({
    setComments: function() {
        this.setState({
            comments: CommentModel.all()
        });
    },
    getInitialState: function() {
        return {
            comments: CommentModel.all()
        }
    },
    componentDidMount: function() {
        CommentModel.subscribe(this.setComments);
        CommentService.getPostComments(this.props.post);

        CommentService.on('newComment_' + this.props.post._id, addComment);
    },
    componentWillUnmount: function() {
        CommentModel.unsubscribe(this.setComments);
        CommentService.removeListener('newComment_' + this.props.post._id, addComment);
    },
    render: function() {
        var comments = this.state.comments.map(function(comment, index) {
            return <CommentItem key={index} comment={comment} />
        });

        return (<ul className="list" id="comments">
                    <li className="list__subheader">Comentários</li>
                    {comments}
                </ul>);
    }
});

module.exports = CommentBox;