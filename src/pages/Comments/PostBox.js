import React from "react"
import classNames from 'classnames'
import { Navigation } from '../../phonepack'
import Container from '../../redux/Container'
import actions from "../../redux/actions"

class PostBox extends Container {
    
    constructor() {
        super();
    }
    
    closePage() {
        Navigation.closeCurrentPage('mainNav');
    }
    
    likePost() {
        this.dispatch(actions.likePost(this.props.post, () => {} ));
    }

    render() {
        var post = this.props.post;
        let btnClass = classNames({
            'button': true,
            'ripple': true,
            'button--icon': true,
            'like': true,
            'text-red': post.likes.indexOf(window.currentUser._id) > -1
        });

        return (
            <ul className="quote-card">
                <li className={post.quotebg}> 
                <div className="quote_top"> 
                    <button className="button button--icon ripple" onClick={this.closePage.bind(this)}> 
                      <i className="icon mdi mdi-arrow-left"></i> 
                    </button> 
                    <button className="button ripple button--icon shared" style={ {float: 'right'} }>
                        <i className="icon mdi mdi-share-variant"></i> 
                    </button> 
                </div> 
                <p>   {post.text}   </p> 
                <div className="quote_bottom"> 
                    <div className="row"> 
                        <div className="cell">
                            <button className={btnClass} onClick={this.likePost.bind(this)}>
                                <i className="icon mdi mdi-heart-outline"></i> 
                            </button>
                            <span>  {post.likes.length}  </span>   
                            <button className="button ripple button--icon comment">
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
            </ul>
        );
    }

};

export default PostBox;