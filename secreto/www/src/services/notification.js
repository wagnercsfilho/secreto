module.exports = {
    
    getUnreadNotification: function(user, cb) {
        socket.emit('getUnreadNotification', user, function(err, notifications) {
            cb(notifications);
        });
    },
    
    getAllNotification: function(user, cb) {
        socket.emit('getAllNotification', user, function(err, notifications) {
            cb(notifications);
        });
    },
    
    readAllNotifications: function(user, cb){
        socket.emit('readAllNotifications', user, function(err, notifications) {
            cb(notifications);
        });
    },

    on: function(event, fn) {
        socket.on(event, fn);
    }
    
}