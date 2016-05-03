import React from "react"
import Container from '../../redux/Container'
import PostBox from "./PostBox"
import CommentBox from "./CommentBox"
import actions from "../../redux/actions"

class Comments extends Container {
    
    constructor(props) {
        super();

        this.getState = () => {
            return {
                post: this.store.getState().posts.filter((post) => post._id == props.post._id)[0]
            }
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.dispatch(actions.getComments(this.state.post));
    }
    
    createComment() {
        this.dispatch(actions.createComment(this.props.post, this.refs.comment.value));
    }

    render() {
        return (<div className="pages">
                    <section className="content has-footer">
                        <PostBox post={this.state.post} />
                        <CommentBox post={this.state.post} />
                    </section>
                    <footer className="footer">
                        <div className="text-field" style={ {width: '100%', 'marginLeft': '16px'} }>
                            <input type="text" className="text-field__input" placeholder="Escreva seu comentário" ref="comment" />
                            <div className="text-field__border"></div>
                        </div>
                        <div className="footer_buttons">
                            <button className="button ripple button--icon" onClick={this.createComment.bind(this)}>
                                <i className="icon mdi mdi-send"></i>
                            </button>
                        </div>
                    </footer>
                </div>);
    }

}

export default Comments