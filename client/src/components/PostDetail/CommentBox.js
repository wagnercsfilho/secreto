var React = require("react");
var CommentService = require("../../services/comment");
var CommentModel = require("../../models/comment");
var CommentItem = require("./CommentItem");

var initialState = function() {
    this.setState({
        comments: CommentModel.all()
    });
}

var addComment = function(comment) {
    CommentModel.add(comment);
}

var CommentBox = React.createClass({
    getInitialState: function() {
        return {
            comments: CommentModel.all()
        }
    },
    componentDidMount: function() {
        CommentService.getPostComments(this.props.post);
        CommentModel.subscribe(initialState.bind(this));

        CommentService.on('newComment_' + this.props.post._id, addComment);
    },
    componentWillUnmount: function() {
        CommentModel.unsubscribe(initialState);
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