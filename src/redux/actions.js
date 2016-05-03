export default {
    
    getPosts: function(cb) {
        return function(dispatch) {
            openFB.api({
                path: '/me/friends',
                success: (results) => {
                    let friendsIds = results.data.map((f) => f.id).concat(window.currentUser.facebook_id);
                    socket.emit('getPosts', friendsIds, (err, posts) => {
                        dispatch({
                            type: 'GET_POSTS',
                            posts: posts
                        });
                        if (cb) cb(posts);
                    });
                }
            });
        }
    },

    createPost: function(post, cb) {
        return (dispatch) => {
            socket.emit('createPost', post, (err, newPost) => {
                dispatch({
                    type: 'CREATE_POST',
                    post: newPost
                });
                cb(newPost);
            });
        }
    },

    likePost: function(post, cb) {
        return (dispatch) => {
            
            var methodName = 'likePost';
            
            if (post.likes.indexOf(window.currentUser._id) > -1) {
                methodName = 'dislikePost';
            }
            
            socket.emit(methodName, {
                post: post,
                _user: window.currentUser._id
            }, (err, newPost) => {
                dispatch({
                    type: 'LIKE_POST',
                    post: newPost
                });
                if (cb) cb(newPost);
            });
        }
    },

    getComments: function(post) {
        return (dispatch) => {
            socket.emit('getCommentByPost', post, (err, comments) => {
                dispatch({
                    type: 'GET_COMMENTS',
                    post: post.listComments = comments
                });
            });
        }
    },

    createComment: function(post, text) {
        return (dispatch) => {
            socket.emit('createComment', {
                _user: window.currentUser._id,
                _post: post._id,
                text: text
            }, (err, comment) => {
                dispatch({
                    type: 'CREATE_COMMENT',
                    comment: comment,
                    post: post
                });
            });
        }
    },

    getNotifications: function() {
        return (dispatch) => {
            socket.emit('getNotifications', window.currentUser._id, function(err, notifications) {
                dispatch({
                    type: 'GET_NOTIFICATIONS',
                    notifications: notifications
                });
            });
        }
    },
    
    readNotifications: function() {
        return (dispatch) => {
            socket.emit('readNotifications', window.currentUser._id, function(err, notifications) {
                dispatch({
                    type: 'READ_NOTIFICATIONS'
                });
            });
        }
    }
    
}