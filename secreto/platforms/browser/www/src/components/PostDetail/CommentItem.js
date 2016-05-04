var React = require("react");
var classNames = require('classnames');
var CommentService = require("../../services/comment");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var avatarsIcons = ['emoticon', 'emoticon-cool', 'emoticon-devil',
    'emoticon-happy', 'emoticon-neutral', 'emoticon-poop', 'emoticon-tongue',
    'fire', 'fish', 'flower', 'food-apple', 'football', 'motorbike', 'snowman', 'umbrella'
];

var avatarColors = ['bg-red', 'bg-pink', 'bg-purple', 'bg-deep-purple', 'bg-indigo', 'bg-blue', 'bg-light-blue',
    'bg-cyan', 'bg-teal', 'bg-green', 'bg-light-green', 'bg-lime', 'bg-yellow'
];


var CommentItem = React.createClass({

    _likeComment: function() {
        var comment = this.props.comment;
        
        if (comment.likes.indexOf(currentUser.facebook_id) === -1) {
            CommentService.like(this.props.comment);
        }
        else {
            CommentService.dislike(this.props.comment);
        }
    },

    render: function() {
        var comment = this.props.comment;

        var avatar = {
            icon: avatarsIcons[getRandomInt(0, avatarsIcons.length - 1)],
            color: avatarColors[getRandomInt(0, avatarColors.length - 1)]
        }

        var classes = {
            'icon': true,
            'icon--circled': true,
            'text-white': true,
            'mdi': true
        }

        classes['mdi-' + avatar.icon] = true;
        classes[avatar.color] = true;

        var btnClass = classNames(classes);

        var btnLike = classNames({
            'button': true,
            'ripple': true,
            'button--icon': true,
            'text-red': comment.likes.indexOf(currentUser.facebook_id) > -1
        });

        return (<li className="list__item">
                        <div className="list__primary">
                            <i className={btnClass}></i>
                        </div>
                        <div className="list__content"> { comment.text } </div>
                        <div className="list__secondary">
                            <button className={btnLike} onClick={this._likeComment}>
                                <i className="icon mdi mdi-heart-outline" />
                            </button>
                        </div>
                    </li>)
    }
});

module.exports = CommentItem;