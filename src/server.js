  var express = require('express');
  var app = express();
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
            return res.json(resObj);
            res.end();
         }
         if (result.length === 0) {
            var resObj = {status:"info", infoCode:"101", infoDesc:"No Records found"};
            return res.json(resObj);
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
        return res.json(resObj);
  };  

      
});  

app.post("/upload/data", function(req, res) {
        // the name under "files" must correspond to the name of the
        // file input field in the submitted form (here: "csvdata")
       res.json("data submitted");
    }); 

app.listen(8081, function(){
      console.log('itune app listening on port 8081');
});
