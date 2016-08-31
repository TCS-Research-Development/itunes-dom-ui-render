var React = require('react');
var ReactDOM = require('react-dom');
var LoggerMixin = require('react-logger');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;
var $ = require('jquery');

var notFound = React.createClass({
   render: function() {
  return(<div>
  <h2>Page NOT FOUND 404</h2>
  </div>)

  }
  });



var Album = React.createClass({
render: function()
 {
   return(
      <div className="col-sm-2 col-md-2 col-half-offset">
              <a href={this.props.album.previewUrl}>

              <img id="" src={this.props.album.artworkUrl100} className="img-responsive" alt="Image" />
              </a>
              <p className="wrap"><b>{this.props.album.trackName}</b></p>
              <p className="artist">{this.props.album.artistName}</p>
     </div>
   );
 }
});




var App = React.createClass({
  displayName: 'AppComponent',
  // Add mixin 
  mixins: [LoggerMixin],
  getInitialState: function() {
    return {"status":{},"data":[]};
  },
   
   componentDidMount() {
      this.log('Component DID MOUNT!');
      this.loadData();
   },

   //For future reference
   /*componentWillMount() {
      this.log('Component WILL MOUNT!')
   },

   componentWillUpdate(nextProps, nextState) {
      this.log('Component WILL UPDATE!');
   },

   componentDidUpdate(prevProps, prevState) {
      this.log('Component DID UPDATE!')
   },*/
  
  loadData: function(){
	
  $.ajax({
     type: "get", url: "/getItunes",
     success: function (data, text) {
      console.log(data);
      this.setState(data);
     }.bind(this),
     error: function (request, status, error) {
      this.log(request.responseText);
    }
 });
  },
  render: function() {
    try{

  var listAlbum = this.state.data.map(function(album) {
      return (
       <Album  album={album} />
      );
    });
  }catch(err){
     console.log(err);

  }


    return (
      <div>
          
        
        <div className="container-fluid bg-3 text-center">
          <h3 className="col-half-offset">Albums</h3><br />
          <div className="row" >
            {listAlbum}
            </div>
        </div><br />
        <div className="container-fluid bg-3 text-center">
          
        </div><br /><br />
      </div>
    );
  }
  });



  ReactDOM.render((
    <Router history = {BrowserHistory}>
        <Route path = "/" component = {App} />
         <Route path = "*" status="404" component = {notFound}/>
         </Router> 
   ),document.getElementById('main'));
