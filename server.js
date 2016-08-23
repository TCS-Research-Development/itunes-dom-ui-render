var express = require('express');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var fs = require('formidable');       
var app = express();
app.use(busboy());
  var Converter = require("csvtojson").Converter;
  var csv = require("csv");

  app.use(express.static('static'));
  
  app.get('/getItunes',function(req,res){
    var converter = new Converter({});
    try{
        converter.fromFile("./itunes.csv",function(err,result){
         //console.log(result);
        if(err){
           var resObj = {status:"failure", errorCode:"100", errorDesc:"something went wrong while reading the data"};
            res.json(resObj);
            res.end();
         }
         if (result.length === 0) {
            var resObj = {status:"info", infoCode:"101", infoDesc:"No Records found"};
            res.json(resObj);
            res.end();
        }
        else{
         var resObj = {status:"success", data:result};
         res.json(resObj);
         }
      })
  }
    catch(err){
        var resObj = {status:"failure", errorCode:"102", errorDesc:"something went wrong while reading the data"};
       res.json(resObj);
  };  

      
});  

/*app.post('/upload', function(req, res) {
        // the name under "files" must correspond to the name of the
        // file input field in the submitted form (here: "csvdata")
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname +'/static/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
            });
        });
   

       res.json("data submitted");
    }); */



app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/static');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});



app.listen(8082, function(){
      console.log('itune app listening on port 8082');
});
