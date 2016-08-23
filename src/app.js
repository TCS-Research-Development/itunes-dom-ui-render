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
var NewOneComp = React.createClass({
   render: function() {
  return(<div>
  <h2>New one </h2>
  </div>)

  }
  });

var CsvUploadComp = React.createClass({

  uploadFile: function () {
        var fd = new FormData();    
        fd.append('file', this.refs.file.getDOMNode().files[0]);

        $.ajax({
            url: '/upload',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                alert(data);
            } 
        });
    },
  render: function() {
    return(<div>
  <section id="upload-data-panel">
    <form id="upload-form"  action={this.uploadFile} method="post" enctype="multipart/form-data">
        
           
           
              
                <input type="file" name="csvdata" accept="text/cvs" />
            
           
                <input type="submit" value="Submit" onClick={this.uploadFile}/>
            
       
    </form>
  </section>
    </div>)
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
        <div className="col-sm-5">
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
          
          <ul>
          <li><Link to={'csvUpload'}>Upload Csv</Link></li>
          <li><Link to={'newOne'}>new one</Link></li>
          </ul>
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



  ReactDOM.render((
    <Router history = {BrowserHistory}>
        <Route path = "/" component = {App} />
         <Route path = "csvUpload" component = {CsvUploadComp} />
         <Route path = "newOne" component = {NewOneComp} />
         <Route path = "*" component = {notFound}/>
      
   </Router> 
   ),document.getElementById('main'));