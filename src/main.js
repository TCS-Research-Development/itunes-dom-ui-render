var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var BrowserHistory = require('react-router').browserHistory;
var App = require('./app.js');

ReactDOM.render((
    <Router history = {BrowserHistory}>
        <Route path = "/" component = {App} />
      
    </Router> 
   ),document.getElementById('main'));