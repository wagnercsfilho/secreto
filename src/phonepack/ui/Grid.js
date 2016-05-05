import React from 'react'
import classnames from 'classnames'

class Row extends React.Component {
    
    render() {
        var {className, children, ...other} = this.props;
        
        let cls = classnames('row', className);
        
        return (
            <div className={cls} {...other}>{children}</div>  
        )
    }
     
}

class Cell extends React.Component {
    
    render() {
        var {className, children, ...other} = this.props;
        
        let cls = classnames('cell', className);
        
        return (
            <div className={cls} {...other}>{children}</div>  
        )
    }
     
}

export { Row as Row, Cell as Cell }