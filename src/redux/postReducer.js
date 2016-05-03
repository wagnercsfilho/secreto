export default function postReducer(posts = [], action) {
    switch (action.type) {
        case 'GET_POSTS':
            return action.posts
        case 'CREATE_POST':
            return [ action.post, ...posts ]
        case 'LIKE_POST':
            return posts.map((post) => {
                    if (post._id == action.post._id) {
                        return action.post;
                    }
                    return post;
            });
        case 'CREATE_COMMENT':
            return posts.map((post) => {
                    if (post._id == action.post._id) {
                        post.comments += 1;
                        post.listComments.unshift(action.comment);
                        return post;
                    }
                    return post;
            });
        case 'GET_COMMENTS':
            let newPosts = posts.map((post) => {
                    return post._id == action.post._id ? Object.assign({}, post, action.post) : post 
            });
            return newPosts
            
        case 'COMPLETE_TODO':
            return posts.map((todo) => {
                return todo.id === action.id ? Object.assign({}, todo, {
                    completed: !todo.completed
                }) : todo
            })
        case 'DELETE_TODO':
            return posts.filter((todo) => {
                return todo.id !== action.id
            })
        default:
            return posts;
    }
}