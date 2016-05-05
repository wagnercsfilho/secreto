import React from "react"
import CommentItem from "./CommentItem"
import Container from '../../../redux/Container'

class CommentBox extends Container {
    
    constructor() {
        super();
    }

    render() {
        var comments = [];

        if (this.props.post.listComments) {
            var comments = this.props.post.listComments.map((comment) => {
                return <CommentItem key={comment._id} comment={comment} />
            });
        }


        return (<ul className="list" id="comments">
                    <li className="list__subheader">Comentários</li>
                    {comments}
                </ul>);
    }

};

export default CommentBox;