import React from "react"
import Container from '../../redux/Container'
import actions from "../../redux/actions"


class Notifications extends Container {
    
    constructor() {
        super();
        
        this.getState = function() {
            return {
                notifications: this.store.getState().notifications
            }
        }
    }
    
    componentDidMount() {
        super.componentDidMount();
        this.dispatch(actions.readNotifications());
    }
    
    render() {
        return (
            <div className="pages"> 
                <header className="header header--shadow">
                        <div className="header__buttons">
                            <button className="button button--icon ripple" onClick={this.closeCurrentPage.bind(this, 'mainNav')}>
                                <i className="icon mdi mdi-arrow-left"></i>
                            </button>
                        </div>
                        <div className="header__title">Lists with caption</div>
                </header>
                <section className="content has-header">
                    <ul className="list">
                    {
                        this.state.notifications.map((notification) => {
                           return  <li className="list__item ripple" key={notification._id}> 
                        	        	<div className="list__content"> 
                        	        	    {
                        	        	        notification.type === 'COMMENT' ? 'Comentaram seu segredo' : 'Curtiram seu segredo'
                        	        	    }
                            	        	<div className="list__caption">
                            				    { notification._post.text }
                            				</div> 
                        				</div>
                        	        </li>
                        })
                       
                    }
                    </ul>
                </section>
            </div>
            )
    }
    
}

export default Notifications