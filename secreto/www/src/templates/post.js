var PostService = require("../services/post");

function PostTemplate(context, post, CommentsCtrl, isPublic) {
    var html = '<blockquote class="quote-card ' + post.quotebg + '">' +
        '<p> ' + post.text + ' </p>' +
        '<div class="quote_bottom">' +
        '<div class="row">' +
        '<div class="cell">' +
        '<button class="button ripple button--icon like ' + isLiked() + '"><i class="icon mdi mdi-heart-outline"></i> </button> <span>' + post.likes.length + '</span>  ' +
        '<button class="button ripple button--icon comment"><i class="icon mdi mdi-comment-outline"></i> </button> <span>' + post.comments + '</span> ' +
        '</div>' +
        '<div class="cell">' +
        '<cite>' + ((isPublic === true && post.location) ? post.location.city : 'Amigo') + '</cite>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</blockquote>';
    var $el = $(html);
    var $elComment = $el.find('.comment');
    var $elLike = $el.find('.like');
    var $elShared = $el.find('.shared');
    var $elLikes = $elLike.next();
    var $elComments = $elComment.next();

    $elComment.on('click', function(e) {
        navigation.pushPage('/views/comments.html', post, CommentsCtrl);
    });

    $elLike.on('click', function(e) {
        
    });

    PostService.on('newLike_' + post._id, function(data) {
        post = data;
        $elLikes.html(data.likes.length);
    });

    PostService.on('dislike_' + post._id, function(data) {
        post = data;
        $elLikes.html(data.likes.length);
    });

    PostService.on('updateCommentCount_' + post._id, function(data) {
        post = data;
        $elComments.html(data.comments);
    });

    function isLiked() {
        if (post.likes.indexOf(currentUser.facebook_id) > -1) {
            return 'text-red';
        }
    }

    context.prepend($el);
}

module.exports = PostTemplate;