var React = require('react');
var Rb = require('react-bootstrap');
var Button = require('react-bootstrap').Button;
var LoggerMixin = require('react-logger');
var App = require('./app.js');

var NotFound = React.createClass({
  mixins: [LoggerMixin],  
  render: function() {
  return(<div>
  <h2>Page NOT FOUND 404</h2>
  <a href="http://localhost:8080">
  <Button className="btn-primary" > Home </Button>
  </a>
  </div>
  )
  }
  });

module.exports = NotFound;