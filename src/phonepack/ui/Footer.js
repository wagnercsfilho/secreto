import React from 'react'
import classnames from 'classnames'

class Footer extends React.Component {

    render() {
        let { className, ...other } = this.props;
        let cls = classnames('footer', className);
        
        return (
            <footer className={cls} {...other}>
                { this.props.children }
            </footer>
        )
    }
    
}

class SubFooter extends React.Component {
    render() {
        let { className, ...other } = this.props;
        let cls = classnames('sub-footer', className);
        
        return (
            <div className={cls} {...other}>
                { this.props.children }
            </div>
        )
    }
}


class FooterButton extends React.Component {
    render() {
        return (
            <div className="footer__buttons">
                { this.props.children }
            </div>
        )
    }
}

class FooterTitle extends React.Component {
    render() {
        return (
            <div className="footer__title">
                { this.props.children }
            </div>
        )
    }
}

export { Footer as Footer, SubFooter as SubFooter, FooterButton as FooterButton, FooterTitle as FooterTitle };