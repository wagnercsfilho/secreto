var PostService = require("../services/post");

function evalInContext(source, context) {
    source = '(function(' + Object.keys(context).join(', ') + ') {return ' + source + '})';
    var compiled = eval(source);
    return compiled.apply(context, values());

    function values() {
        var result = [];
        for (var property in context)
            if (context.hasOwnProperty(property))
                result.push(context[property]);
        result.push(context.$params);
        return result;
    }
}

function compile(element) {
    var that = this;
    $(element).find('[data-directive]').each((function(e) {

        var fn = $(this).attr('data-directive');
        var args = /\(\s*([^)]+?)\s*\)/.exec(fn);
        if (args[1]) {
            args = args[1].split(/\s*,\s*/);
        }

        var params = {};
        args.forEach(function(arg) {
            params[arg] = that[arg];
        });
        $(this).append(evalInContext(fn, params));
    }));
}

function quote_bottom(post, isPublic) {
    var $el = $('<div class="row">' +
        '<div class="cell">' +
        '<button class="button ripple button--icon like ' + isLiked() + '"><i class="icon mdi mdi-heart-outline"></i> </button> <span>' + post.likes.length + '</span>  ' +
        '<button class="button ripple button--icon comment"><i class="icon mdi mdi-comment-outline"></i> </button> <span>' + post.comments + '</span> ' +
        '</div>' +
        '<div class="cell">' +
        '<cite>' + ((isPublic === true && post.location) ? post.location.city : 'Amigo') + '</cite>' +
        '</div>');

    var $elComment = $el.find('.comment');
    var $elLike = $el.find('.like');
    var $elLikes = $elLike.next();
    var $elComments = $elComment.next();

    $elLike.on('click', function(e) {
        if (post.likes.indexOf(currentUser.facebook_id) === -1) {
            PostService.likePost({
                post: post,
                facebook_id: currentUser.facebook_id
            }, function(data) {
                post = data;
                $elLike.addClass('text-red');
            });
        }
        else {
            PostService.dislikePost({
                post: post,
                facebook_id: currentUser.facebook_id
            }, function(data) {
                post = data;
                $elLike.removeClass('text-red');
            });
        }
    });

    PostService.on('updateCommentCount_' + post._id, function(data) {
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
    
    PostService.on('dislike_' + post._id, function(data) {
        post = data;
        $elLikes.html(data.likes.length);
    });

    function isLiked() {
        if (post.likes.indexOf(currentUser.facebook_id) > -1) {
            return 'text-red';
        }
    }

    return $el;

}

function PostDetailsTemplate(context, post, isPublic) {
    var html = '<blockquote class="quote-card ' + post.quotebg + '">' +
        '<div class="quote_top">' +
        '<button class="button button--icon ripple" onclick="navigation.closeCurrentPage()">' +
        '  <i class="icon mdi mdi-arrow-left"></i>' +
        '</button>' +
        '<button class="button ripple button--icon shared" style="float: right"><i class="icon mdi mdi-share-variant"></i> </button>' +
        '</div>' +
        '<p> ' + post.text + ' </p>' +
        '<div class="quote_bottom" data-directive="quote_bottom(post, isPublic)"></div>' +
        '</div>' +
        '</blockquote>';

    var $el = $(html);
    compile.call({
        post: post,
        isPublic: isPublic
    }, $el);
    var $elShared = $el.find('.shared');
    $elShared.on('click', function(e) {
        html2canvas($(this).closest('blockquote'), {
            onrendered: function(canvas) {
                $('body').html(canvas);
            }
        });
    });

    context.prepend($el);
}

module.exports = PostDetailsTemplate;