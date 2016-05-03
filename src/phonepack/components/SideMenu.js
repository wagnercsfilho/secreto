import React from 'react'
import classnames from 'classnames'

class SideMenu extends React.Component {
    
    constructor() {
        super();
        
        this.sideMenu = null;
    }
    
    toggle() {
         this.sideMenu.toggle();
    }
    
    componentDidMount() {
        this.sideMenu = new phonepack.SideMenu(this.refs.sideMenu);
    }
    
    render() {
        
        let cls = classnames({
            'side-menu': true
        })
        
        return (
            <div className={cls} ref="sideMenu">
                { this.props.children }
            </div>
        )
    }
    
}

export default SideMenu