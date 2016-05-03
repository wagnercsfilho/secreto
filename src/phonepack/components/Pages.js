import React from 'react'
import {
    render,
    unmountComponentAtNode
}
from 'react-dom'

class Navigation extends React.Component {

        constructor() {
            super();
            this.components = {};
        }

        componentDidMount() {
            React.Children.map(this.props.children, (e) => {
                this.components[e.props.name] = e.props.component;
            });
            
            Navigation.instances[this.props.name] = this;

            if (this.props.default) {
                if (this.props.beforePage) {
                    this.props.beforePage(() => {
                        this.changePage.call(this, this.props.default);
                    })
                }
                else {
                    this.changePage.call(this, this.props.default);
                }
            }
        }

        push(name, params, animation = 'pages--normal') {
            let element = document.createElement('div');
            element.style.display = 'none';
            
            let Component = this.components[name];
            
            this.prevPage = this.currentPage;
            
            this.currentPage = {
                animation: animation,
                element: element,
                component: Component
            };
            
            this.refs.navigation.appendChild(element);
            render(<Component {...this.props.props} {...params}/>, element);
            
            let pages = element.querySelector('.pages');
            pages.classList.add(animation);
            
            
            element.style.display = 'block';
            setTimeout(() => {
                pages.classList.add(animation+'-show');
            }, 40);
        }

        changePage(name, params, animation = 'pages--normal') {
            let element = document.createElement('div');
            let Component = this.components[name];
            
            while (this.currentPage) {
                this.closeCurrentPage();
            }
            
            this.prevPage = this.currentPage;
            
            this.currentPage = {
                animation: animation,
                element: element,
                component: Component
            };
            
            this.refs.navigation.appendChild(element);
            render(<Component {...this.props.props}/>, element);
        }

        closeCurrentPage() {
            var pages = this.currentPage.element.querySelector('.pages');
            var removeDomPage = () => {
    			pages.removeEventListener('webkitTransitionEnd', removeDomPage);
    			pages.removeEventListener('transitionend', removeDomPage);
    			
    			unmountComponentAtNode(this.currentPage.element);
                this.currentPage.element.remove();
    
    			this.currentPage = this.prevPage;
    		};
            
            if (this.prevPage) {
    			if (this.currentPage.animation == 'pages--normal') {
    				removeDomPage();
    			} else {
    				pages.addEventListener('webkitTransitionEnd', removeDomPage);
    				pages.addEventListener('transitionend', removeDomPage);
    				pages.classList.remove(this.currentPage.animation + '-show');
    			}
    		}
    		else {
    		    this.currentPage = null;
    			return;
    		}
        }

        render() {
            return <div className="navigation" ref="navigation"></div>
        }
    }

    Navigation.instances = {};
    Navigation.push = function(name, component, params, animation) {
        Navigation.instances[name].push(component, params, animation);
    }

    Navigation.changePage = function(name, component) {
        Navigation.instances[name].changePage(component);
    }

    Navigation.closeCurrentPage = function(name) {
        Navigation.instances[name].closeCurrentPage();
    }

    class Pages extends React.Component {

            constructor() {
                super();
                
                this.animation = 'pages--normal';
            }

            components() {}

            config(name, component) {
                this.components[name] = component;
            }

            push(name) {
                let page = document.createElement('div');
                page.classList.add()
                render(this.components[name], page);
            }
        }

        export {
            Navigation as Navigation,
            Pages as Pages
        };