import React from 'react'
import store from './store.js'
import { Navigation } from '../phonepack'

class Container extends React.Component {
    
    constructor() {
        super();
        this.store = store;
        this.unsubscribe = null;
        this.getState = null;
    }
    
    componentWillMount() {
        if (this.getState) this.setState(this.getState.call(this));
    }
    
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          if (this.getState) this.setState(this.getState.call(this));
        });
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
   
    dispatch(action) {
        this.store.dispatch(action);
    }
    
    changePage(navigation, component, params) {
        Navigation.changePage(navigation, component, params);
    }
    
    pushPage(navigation, component, params, animation) {
        Navigation.push(navigation, component, params, animation);
    }
    
    closeCurrentPage(navigation) {
        Navigation.closeCurrentPage(navigation);
    }
    
}

export default Container;