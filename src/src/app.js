var React = require('react');
var ReactDOM = require('react-dom');
var LoggerMixin = require('react-logger');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var $ = require('jquery');


var App = React.createClass({
  displayName: 'AppComponent',
  // Add mixin 
  mixins: [LoggerMixin],
  getInitialState: function() {
    return {"status":{},"data":[]};
  },
componentWillMount() {
      this.log('Component WILL MOUNT!')
   },

   componentDidMount() {
      this.log('Component DID MOUNT!');
      this.loadData();
   },

   componentWillUpdate(nextProps, nextState) {
      this.log('Component WILL UPDATE!');
   },

   componentDidUpdate(prevProps, prevState) {
      this.log('Component DID UPDATE!')
   },
  
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
        <div className="col-sm-4">
              <a href={album.previewUrl}>

              <img id="" src={album.artworkUrl100} className="img-responsive" alt="Image" />
              </a>
              <p><b>{album.trackName}</b></p>
              <p>{album.artistName}</p>

            </div>
      );
    });
  }catch(err){
     console.log(err);

  }


    return (
      <div>
          
          <Link to={'/csvUpload/'}>Upload Csv</Link>
        <div className="container-fluid bg-3 text-center">
          <h3>Albums</h3><br />
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

var CsvUpload = React.createClass({
  displayName: 'AppComponent',
  // Add mixin 
  mixins: [LoggerMixin],
  render: function() {
    return(<div>
<section id="upload-data-panel">
    <form id="upload-form" action="/upload/data" method="post" enctype="multipart/form-data">
        
           
            <div>
              
                <input type="file" name="csvdata" accept="text/cvs" />
            </div>
            <div>
                <input type="submit" value="Submit"/>
            </div>
       
    </form>
</section>
    </div>)
  }

  });

ReactDOM.render(
  (
    <Router>
      <Route path="/" component={App} />
      <Route path="/csvUpload" component={CsvUpload} />
     
    </Router>
  ),
  document.getElementById('main')
);
