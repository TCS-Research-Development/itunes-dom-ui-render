
/** 
 *Include all npms to test the Application API. 
 *along with custom Modules.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var request= require("request");
var should = chai.should();


chai.use(chaiHttp);




describe("Itune Application API Testing", function() {


     //Testing getItune Get method.
    describe("Get Itunes Method", function() {

   /*This will check the response for getting objects or not along with the status
  and if the status is success it will list all the itunes on /getItunes method*/
        it('List ALL itunes on /getItunes GET', function(done) {
          chai.request(server)
         .get('/getItunes')
         .end(function(err, res){
         res.body.should.be.a('object');
         res.body.status.should.equal("success");
         res.should.have.status(200);
         done();
     });
 });
  
  /*This will check the response for getting objects or not along with the status
  and if the status is not info it will give info message */
   it('No records found on  /getItunes GET ', function(done) {
          chai.request(server)
         .get('/getItunes')
         .end(function(err, res){
         res.body.should.be.a('object');
         res.body.status.should.not.equal("info");
        
         done();
     });
 });
  /*This will check the response for getting objects or not along with the status
  and if the status is not info it will give error message*/
 it('Error occured while reading the data on  /getItunes GET ', function(done) {
          chai.request(server)
         .get('/getItunes')
         .end(function(err, res){
         res.body.should.be.a('object');
         res.body.status.should.not.equal("failure");
        
         done();
     });
 });

    


     

    });





});