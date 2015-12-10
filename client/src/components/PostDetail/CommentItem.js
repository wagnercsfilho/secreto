var React = require("react");
var classNames = require('classnames');

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

        return (<li className="list__item">
                        <div className="list__primary">
                            <i className={btnClass}></i>
                        </div>
                        <div className="list__content"> { comment.text } </div>
                        <div className="list__secondary">
                            <button className="button button--icon ripple">
                                <i className="icon mdi mdi-heart-outline" />
                            </button>
                        </div>
                    </li>)
    }
});

module.exports = CommentItem;