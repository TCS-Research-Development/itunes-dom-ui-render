var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


var App = React.createClass({
  getInitialState: function() {
    return {itunes: []};
  },
componentWillMount() {
      console.log('Component WILL MOUNT!')
   },

   componentDidMount() {
      console.log('Component DID MOUNT!');
      this.loadData();
   },

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   },

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   },
  
loadData: function(){
	
$.ajax('/getItunes').done(function(data) {
      this.setState({itunes: data});
 }.bind(this));
},
  render: function() {

var listAlbum = this.state.itunes.map(function(album) {
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


    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              
              <a className="navbar-brand" href="#">iStore</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            
            </div>
          </div>
        </nav>
        <div className="jumbotron" >
          <div className="container text-center">
            <h1>My Music</h1>
            <p>Listen to all your favourite tracks...</p>
          </div>
        </div>
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

 ReactDOM.render(<App />, document.getElementById("main"));