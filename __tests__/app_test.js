jest.dontMock('../src/app');
var React = require('react');
var ReactDOM = require ('react-dom');
var TestUtils = require('react-addons-test-utils');
const App = require('../src/app'); 

describe('App', function(){
  it('render', function(){

    var myComponent = TestUtils.renderIntoDocument(
      // This is the line referenced in the test error
      <App  />
    )
    var myComponentNode = ReactDOM.findDOMNode(myComponent);

    expect(myComponentNode.textContent).toEqual("Upload CSVAlbums");
  });
});