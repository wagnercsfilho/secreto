var PostService = require("../services/post");

function PostDetailsTemplate(context, post, isPublic) {
    var html = '<blockquote class="quote-card ' + post.quotebg + '">' +
        '<div class="quote_top">' +
        '<button class="button button--icon ripple" onclick="navigation.closeCurrentPage()">' +
        '  <i class="icon mdi mdi-arrow-left"></i>' +
        '</button>' +
        '<button class="button ripple button--icon" style="float: right"><i class="icon mdi mdi-share-variant"></i> </button>' +
        '</div>' +
        '<p> ' + post.text + ' </p>' +
        '<div class="quote_bottom">' +
        '<div class="row">' +
        '<div class="cell">' +
        '<button class="button ripple button--icon like"><i class="icon mdi mdi-heart-outline"></i> </button> <span>' + post.likes.length + '</span>  ' +
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

    $elLike.on('click', function(e) {
        PostService.likePost(post, function(data) {
            post = data;
        });
    });

    PostService.on('newComment_' + post._id, function(data) {
        post = data;
        $elComments.html(data.comments);
    });

    PostService.on('newLike_' + post._id, function(data) {
        post = data;
        $elLikes.html(data.likes.length);

        if (post.likes.indexOf(currentUser.facebook_id) > -1) {
            $elLike.addClass('text-red');
        }
    });

    context.prepend($el);
}

module.exports = PostDetailsTemplate;