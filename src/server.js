var express = require('express');
var app = express();
//var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;
app.use(express.static('static'));

app.get('/getItunes',function(req,res){
	var converter = new Converter({});
    converter.fromFile("./itunes.csv",function(err,result){
    if(err){
           console.log(err);
           res.json({error:"error in reading csv"});
           
       }
       //console.log(result);
      else{
        res.json(result);
      }
    });
});   
app.listen(8081, function(){
    console.log('itune app listening on port 8081');
});
