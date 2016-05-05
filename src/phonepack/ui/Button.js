import React from 'react'
import classnames from 'classnames'

class Button extends React.Component {
    
    render() {
        
        var {className, fab, fabFloating, children, icon, ripple, ...other} = this.props;
        
        let cls = classnames('button', className, {
            'button--fab': fab,
            'button--fab-floating': fabFloating,
            'button--icon': icon,
            'ripple': ripple
        });
        
        return (
            <button className={cls} {...other}>
                { children }
            </button>
        )
    }
    
}

export { Button as Button }