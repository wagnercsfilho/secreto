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

class SubHeader extends React.Component {
    render() {
        let { className, headerShadow, ...other } = this.props;
        let cls = classnames('sub-header', {
            'header--shadow': headerShadow
        }, className);
        
        return (
            <div className={cls} {...other}>
                { this.props.children }
            </div>
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

export { Header as Header, SubHeader as SubHeader, HeaderButton as HeaderButton, HeaderTitle as HeaderTitle };