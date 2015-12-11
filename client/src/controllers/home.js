/*global phonepack*/
/*global navigation*/
/*global openFB*/

var React = require("react");
var ReactDOM = require('react-dom');
var Home = require("../components/Home/Home");

function HomeCtrl(template) {
    ReactDOM.render(<Home />, template);
}

module.exports = HomeCtrl;