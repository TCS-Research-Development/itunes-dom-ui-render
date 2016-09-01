
/** 
 * Include all npms to render server compomnent 
 * along with custome Modules
 */

var express = require('express');
var app = express();
var Converter = require("csvtojson").Converter;
var fs = require("fs");
var csv = require("csv");
var bodyParser = require('body-parser');
var multer  = require('multer'); 
var log4js = require("log4js");
log4js.configure({
  appenders: [
	            {
	            	type: "console"
	            },
	            {
	            	type: "file",
	            	filename: "test.log",
	            	category: "my_project"
	            }
	]
});

var logger = log4js.getLogger("my_project");
logger.setLevel("DEBUG");

logger.debug("log test!!!!");

/* Registering express middleware to expose server data as JSON */  
app.use(express.static('static'));



/**
 * Name: storage 
 * Description: It sets destination file(upload CSV) path , creates temp directory and rename 
 *              CSV file name with UnixTime Stamp(Eg: 1450787121.csv) with "filename" Callback function: 
 * Arguments : file ,
 */
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     /* Application Path to store uploaded CSC in ".temp " directory  */
     var dir = './temp';

     /* Filesystem to handle the temp directory availability in app path  */
     if (!fs.existsSync(dir)){
         fs.mkdirSync(dir);
          logger.debug("directory doesn't exist");
      }else{
         logger.debug("directory exist");
       
      }
     cb(null, './temp')
   },
     /* returns UnixTime Stamp String */
     filename: function (req, file, cb) {
     cb(null, Math.floor(Date.now()/1000) + '.csv')
   }
})

/* Passing storage object to multer , for more refer : https://www.npmjs.com/package/multer  */
var upload = multer({ storage: storage});

 

/**
 *  Name: convertTheCsvToJson
 *  Description:This function is to convert csv file into json and send the response object.
 *  Arguments:name of the file.
 */

var convertTheCsvToJson = function(req, res, fileName){
  var converter = new Converter({});
  fileName = "./temp/"+ fileName;
  converter.fromFile(fileName, function(err,result){
       
        if(err){
           var resObj = {status:"failure", errorCode:"100", errorDesc:"something went wrong while reading the data"};
            res.json(resObj);
            logger.debug("something went wrong while reading the data");
          
         }
         if (result.length === 0 || result[0].field1=="") {
            var resObj = {status:"info", infoCode:"101", infoDesc:"No Records found"};
            res.json(resObj);
            logger.debug(resObj);  
         
        }
        else{
        
         var resObj = {status:"success", data:result};
         res.json(resObj);
         logger.debug("success");  

         }
      })
 };



 /*
 * Name: get method.
 * Description:This method is to get the csv file from the temp directory and sends the response to the UI.
 * Arguments: request and response objects.
 
 */ 
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
       logger.debug(resObj);
  };  

});  



/*
*Name:post method.
*Description:This method is to upload the csv file into the temp directory.
*Arguments:
*/ 
app.post("/upload/data",upload.any(), function(req, res) {
      
       res.redirect("http://localhost:8080/");
        
    }); 

var server=app.listen(8080, function(){
      console.log('itune app listening on port 8080');
});


module.exports = server;