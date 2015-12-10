var PostDetailsTemplate = require("../templates/postDetails");
var CommentTemplate = require("../templates/comment");
var CommentService = require("../services/comment");

var React = require("react");
var ReactDOM = require('react-dom');
var PostDetail = require("../components/PostDetail/PostDetail");

function CommentsCtrl(template) {
    var post = navigation.params;

    template = $(template);
    var $content = template.find('.content');
    ReactDOM.render(<PostDetail post={post} />, $content[0]);
    
    var elCreateComment = template.find('#createComment');
    elCreateComment.on('click', function(e) {
        CommentService.createComment({
            post: post,
            text: template.find('input').val(),
            user: window.currentUser
        }, function(comment) {
            var notification = new phonepack.Notification();
            notification.success('Successfully');
            template.find('input').val('');
        });
    });
    /*var elCreateComment = template.find('#createComment');
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
    });*/


}

module.exports = CommentsCtrl;