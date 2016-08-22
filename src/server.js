  var express = require('express');
  var app = express();
  var Converter = require("csvtojson").Converter;

  app.use(express.static('static'));
  
  app.get('/getItunes',function(req,res){
    var converter = new Converter({});
    try{
        converter.fromFile("./itunes.csv",function(err,result){
         //console.log(result);
        if(err){
          res.json(err);
         }
        else{

         res.json(result);
         }
      })
  }
    catch(err){
      console.log(err);
  };  

      
});   

app.listen(8081, function(){
      console.log('itune app listening on port 8081');
});
