var React = require('react');
var ReactDOM = require('react-dom');
var LoggerMixin = require('react-logger');
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;
var $ = require('jquery');
var Rb = require('react-bootstrap');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;



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

var CsvUpload = React.createClass({
  displayName: 'AppComponent',
  // Add mixin 
  mixins: [LoggerMixin],
  render: function() {
    return(<div>
      <section id="upload-data-panel">
          <form id="upload-form" action="/upload/data" method="post" encType="multipart/form-data">
        
           
           
              
                <input type="file" name="csvdata" accept="text/cvs" />
            
                <input type="submit" name="submit" value="submit"/>
            
       
            </form>
      </section>
    </div>)
  }

  });

const ModalInstance = React.createClass({
 getInitialState(){
    return { showModal: false };
  },

  closeModal(){
    this.setState({ showModal: false });
  },

  openModal(){
    this.setState({ showModal: true });
  }, 

  render:function(){ 
   return(
  <div className="static-modal">
    <Button className="upload" onClick={this.openModal}>
          Upload CSV
     </Button>

    <Modal show={this.state.showModal} onHide={this.closeModal}>
    
      <Modal.Header closeButton>
        <Modal.Title>Upload CSV File</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="upload-form" action="/upload/data" method="post" encType="multipart/form-data">
           <input type="file" name="csvdata" accept=".csv" />
           <hr/>
           <input className="submit" type="submit" name="submit" value="Submit"/>
           <Button className="shut" onClick={this.closeModal}>Close</Button>
           <br/>
           <br/>
        </form>
      </Modal.Body>
      
    </Modal>
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
      if(data.status == "info")
      alert('No Data Found');	
      if(data.status == "failure")
      alert("Error occured while reading the data..check whether you have proper data in temp folder or not");
      if(data.status == "success")
      {
      
      this.setState(data);
      }
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
          
        <div>
            <ModalInstance />
        </div>

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


  


module.exports = App;