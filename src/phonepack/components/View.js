import React from 'react'
import classnames from 'classnames'

class View extends React.Component {

    constructor(props) {
        super();
        this.loading = null;
    }

    showLoadingPlugin() {
        this.loading = new phonepack.Loading({
            spinner: true,
            overlay: false
        });
        this.loading.show();
    }

    hideLoadingPlugin() {
        this.loading.hide();
        this.loading = null;
    }

    render() {
        if (this.props.loading && !this.loading) {
            this.showLoadingPlugin();
        }
        else if (!this.props.loading && this.loading) {
            this.hideLoadingPlugin();
        }
        
        let {className, ...other} = this.props;
        let cls = classnames('pages', className);

        return (
            
            <div className={cls} {...other}>
                { this.props.children }
            </div>
        )
    }

}

export default View