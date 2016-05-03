import React from 'react'
import classnames from 'classnames'

class Icon extends React.Component {
    
    render() {
        var {className, name, ...other} = this.props;
        
        let cls = classnames('icon', 'mdi', className, {
            [`mdi-${name}`]: name
        });
        
        return (
            <i className={cls} {...other}></i>  
        )
    }
     
}

export default Icon