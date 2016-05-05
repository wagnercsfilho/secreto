import React from 'react'

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

        return (
            <div className="pages">
                { this.props.children }
            </div>
        )
    }

}

export default View