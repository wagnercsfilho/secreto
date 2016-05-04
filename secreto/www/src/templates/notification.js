var CommentsCtrl = require("../controllers/comments");

function NotificationTemplate(template, notification) {
    var read = (!notification.read ? 'quote-noti-read' : '');
    var $el = $('<blockquote class="quote-card quote-mini ' + read + ' ' + notification._post.quotebg + '">' +
        '<p> ' + notification._post.text + ' </p>' +
        '</blockquote>');

    $el.on('click', function() {
        navigation.pushPage('views/comments.html', notification._post, CommentsCtrl);
    });

    template.find('#listNotifications').prepend($el);
};

module.exports = NotificationTemplate;