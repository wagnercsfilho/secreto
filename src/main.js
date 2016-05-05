import React from 'react'
import { render } from 'react-dom'
import App from './App.js'

window.socket = io.connect('https://weezer.herokuapp.com/');

openFB.init({
    appId: '1707024216207772'
});

render(
    <App/>, 
    document.querySelector('#navigation'));
