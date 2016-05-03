import React from "react";
import PostItem from "./PostItem.js";


class PostList extends React.Component{

    render() {
        var items = this.props.posts.map((post, index) => {
            return <PostItem key={post._id} post={post} />
        });

        return <ul className="quote-card"> {items} </ul>;
    }
    
};

module.exports = PostList;