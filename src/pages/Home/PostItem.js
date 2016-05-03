import React from "react"
import Container from '../../redux/Container'
import classNames from 'classnames'
import { Navigation } from '../../phonepack'
import actions from "../../redux/actions"

class PostItem extends Container {

    openCommentsPage(e) {
        Navigation.push('mainNav', 'Comments', {
            post: this.props.post 
        });
    }
    
    likePost() {
        this.dispatch(actions.likePost(this.props.post, () => {} ));
    }

    render() {
        let post = this.props.post;
        let btnClass = classNames({
            'button': true,
            'ripple': true,
            'button--icon': true,
            'like': true,
            'text-red': post.likes.indexOf(window.currentUser._id) > -1
        });

        return (
            <li className={post.quotebg}> 
                <p>   {post.text}   </p> 
                <div className="quote_bottom"> 
                    <div className="row"> 
                        <div className="cell"> 
                            <button className={btnClass} onClick={this.likePost.bind(this)}>
                                <i className="icon mdi mdi-heart-outline"></i> 
                           </button>
                            <span>  {post.likes.length}  </span>   
                            <button className="button ripple button--icon comment" onClick={this.openCommentsPage.bind(this)}>
                                <i className="icon mdi mdi-comment-outline"></i> 
                            </button> 
                            <span>  {post.comments}  </span>  
                        </div> 
                        <div className="cell"> 
                            <cite> Amigo </cite> 
                        </div> 
                    </div>
                </div> 
            </li>
        );
    }

}

export default PostItem;