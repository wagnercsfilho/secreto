import React from 'react'
import classnames from 'classnames'

class Input extends React.Component {
    
    render() {
        let {className, ...other} = this.props;
        let cls = classnames('text-field__input', className);
        
        return <input className={cls} {...other} />
    }
    
}

export { Input as Input }