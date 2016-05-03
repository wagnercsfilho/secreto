import React from 'react'
import classnames from 'classnames'

class Header extends React.Component {
    
    componentDidMount() {
        if (this.props.shrinkHeader) {
            phonepack.shrinkHeader(this.refs.header);
        }
    }
    
    render() {
        let cls = classnames({
            header: true,
            'header--shadow': this.props.headerShadow
        });
        
        return (
            <header className={cls} ref="header">
                { this.props.children }
            </header>
        )
    }
    
}

class HeaderButton extends React.Component {
    render() {
        return (
            <div className="header__buttons">
                { this.props.children }
            </div>
        )
    }
}

class HeaderTitle extends React.Component {
    render() {
        return (
            <div className="header__title">
                { this.props.children }
            </div>
        )
    }
}

export { Header as Header, HeaderButton as HeaderButton, HeaderTitle as HeaderTitle };