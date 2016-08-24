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

app.listen(8082, function(){
      console.log('itune app listening on port 8082');
});
