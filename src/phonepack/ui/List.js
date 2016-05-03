import React from 'react'
import classnames from 'classnames'

class List extends React.Component {

    render() {

        var { className, children, ...other  } = this.props;

        let cls = classnames('list', className);

        return (
            <ul className={cls} {...other} >
                { children }
            </ul>
        )
    }

}

class ListItem extends React.Component {

    render() {
        let {
            className, ripple, children, ...other
        } = this.props;

        let cls = classnames('list__item', className, {
            'ripple': ripple
        });

        return <li className={cls} {...other}> {children} </li>
    }

}

export { List as List, ListItem as ListItem };