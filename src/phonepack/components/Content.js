import React from 'react'
import classnames from 'classnames'

class Content extends React.Component {
    
    constructor(){
        super();
        
        this.pullToRefresh = null;
        this.infiniteScroll = null;
    }
    
    hidePullToRefresh() {
        this.pullToRefresh.hide();
    }
    
    hideInfinitScroll() {
        this.infiniteScroll.hide();
    }
    
    componentDidMount() {
        if (this.props.pullToRefresh) {
            this.pullToRefresh = new phonepack.PullToRefresh(this.refs.content, {}, () => {
                this.props.pullToRefresh();
            });
        }
        
        if (this.props.infiniteScroll) {
            this.infiniteScroll = new phonepack.InfiniteScroll(this.refs.content, {}, () => {
                    this.props.infiniteScroll();
            });
        }
    
    }

    render() {
        
        let { className, contentPadding, hasSubHeader, hasHeader, hasFooter , headerShadow, ...other } = this.props;
        
        let cls = classnames('content', className, {
            'content-padding': contentPadding,
            'has-header': hasHeader,
            'has-footer': hasFooter,
            'header-shadow': headerShadow,
            'has-sub-header': hasSubHeader
        });
        
        return (
                <section className={cls} {...other} ref="content">
                    { this.props.children }
                </section>
            )
    }
    
}

export default Content