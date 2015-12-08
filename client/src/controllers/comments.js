var PostDetailsTemplate = require("../templates/postDetails");
var CommentTemplate = require("../templates/comment");
var CommentService = require("../services/comment");

function CommentsCtrl(template) {
    var post = navigation.params;
    
    template = $(template);
    var elContent = template.find('.content');
    var elComments = template.find('#comments');
    var elCreateComment = template.find('#createComment');
    var elText = template.find('input');

    PostDetailsTemplate(elContent, post, false);

    CommentService.getPostComments(post, function(comments) {
        if (comments) {
            comments.forEach(function(comment) {
                CommentTemplate(elComments, comment);
            });
        }
    });

    CommentService.on('newComment_' + post._id, function(comment) {
        elContent.animate({
            scrollTop: elContent[0].scrollHeight
        }, 800);
        
        CommentTemplate(elComments, comment);
    });

    elCreateComment.on('click', function(e) {
        CommentService.createComment({
            _post: post._id,
            text: elText.val(),
            user: window.currentUser
        }, function(comment) {
            var notification = new phonepack.Notification();
            notification.success('Successfully');

            elText.val('');
        });
    });
}

module.exports = CommentsCtrl;