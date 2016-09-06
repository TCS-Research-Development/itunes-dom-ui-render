var React = require('react');
//var LoggerMixin = require('react-logger');

var NotFound = React.createClass({
  // Add mixin 
 render: function() {
  return(<div>
  <h2>Page NOT FOUND 404</h2>
  </div>)

  }
  });

module.exports = NotFound;