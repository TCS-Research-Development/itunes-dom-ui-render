var express = require('express');
var app = express();
var Converter = require("csvtojson").Converter;
var fs = require("fs");
var csv = require("csv");
var bodyParser = require('body-parser');
var multer  = require('multer'); 
  
app.use(express.static('static'));


//function to set destination and filename to the uploaded file.
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     var dir = './temp';
     if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      console.log("directory doesn't exist");
      }
     else{
      console.log("directory exist");
      }
     cb(null, './temp')
   },
  filename: function (req, file, cb) {
     cb(null, Math.floor(Date.now()/1000) + '.csv')
   }
})
var upload = multer({ storage: storage });

 
//function to convert csv to json and send the response object.
var convertTheCsvToJson = function(req, res, fileName){
  var converter = new Converter({});
  fileName = "./temp/"+ fileName;
  converter.fromFile(fileName, function(err,result){
       
        if(err){
           var resObj = {status:"failure", errorCode:"100", errorDesc:"something went wrong while reading the data"};
            res.json(resObj);
            res.end();
         }
         if (!result || result.length === 0) {
            var resObj = {status:"info", infoCode:"101", infoDesc:"No Records found"};
            res.json(resObj);
            res.end();
        }
        else{
         var resObj = {status:"success", data:result};
         res.json(resObj);
         }
      })
 };

 
 //get service to get the csv file from the temp directory. 
  app.get('/getItunes',function(req,res){
    try{
    var path="./temp/";
    var filesArry = fs.readdirSync(path);
    var csvFile = fs.readdirSync(path).slice(-1)[0];
    console.log(csvFile);
    convertTheCsvToJson(req, res, csvFile);
    }
    catch(err){
        var resObj = {status:"failure", errorCode:"102", errorDesc:"something went wrong while reading the data"};
        res.json(resObj);
  };  

});  


//post method to upload the csv file into the temp deirectory.
app.post("/upload/data",upload.any(), function(req, res) {
       console.log(req.files);
      res.redirect("http://localhost:8080/");
        
    }); 

var server=app.listen(8080, function(){
      console.log('itune app listening on port 8080');
});
module.exports = server;