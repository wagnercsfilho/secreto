var React = require("react");
var CommentService = require("../../services/comment");
var CommentStore = require("../../stores/CommentStore");
var CommentActions = require("../../actions/CommentActions");
var CommentItem = require("./CommentItem");

function getCommentState() {
    return {
        comments: CommentStore.getAll(this.props.post._id)
    }
}

var CommentBox = React.createClass({

    getInitialState: function() {
        return getCommentState.call(this);
    },

    _onChange: function() {
        this.setState(getCommentState.call(this));
    },

    _onSocketChange: function(data) {
        CommentActions.create(data);
    },

    componentDidMount: function() {
        CommentStore.addChangeListener(this._onChange);
        CommentService.getCommentByPost(this.props.post);

        CommentService.on('newComment_' + this.props.post._id, this._onSocketChange);
    },

    componentWillUnmount: function() {
        CommentStore.removeChangeListener(this._onChange);
        CommentService.removeListener('newComment_' + this.props.post._id, this._onSocketChange);
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