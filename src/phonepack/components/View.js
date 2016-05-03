import React from 'react'

class View extends React.Component {
    
    constructor(props) {
        super();
        this.loading = null;
        this.state = { loading: props.loading }
    }
    
    componentDidMount() {
        if (this.state.loading != null) {
            this.loading = new phonepack.Loading({
                spinner: true,
                overlay: true,
                title: 'Loading'
            });
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.loading
        });
    }
    
    render() {
        if (this.loading !== null) {
            if (this.state.loading) {
                this.loading.show();
            } else {
                this.loading.hide();
            }
        }
        return (
                <div className="pages">
                    { this.props.children }
                </div>
            )
    }
    
}

export default View