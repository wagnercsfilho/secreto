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

function CommentTemplate(context, comment) {

    var avatar = {
        icon: avatarsIcons[getRandomInt(0, avatarsIcons.length - 1)],
        color: avatarColors[getRandomInt(0, avatarColors.length - 1)]
    }

    context.append('<li class="list__item">' +
        '<div class="list__primary"><i class="icon icon--circled ' + avatar.color + ' text-white mdi mdi-' + avatar.icon + '"></i></div>' +
        '<div class="list__content">' + comment.text + '</div>' +
        '<div class="list__secondary"><button class="button button--icon ripple"><i class="icon mdi mdi-heart-outline"></button></div>' +
        '</li>');
}

module.exports = CommentTemplate;