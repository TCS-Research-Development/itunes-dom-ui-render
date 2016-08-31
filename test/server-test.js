var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var request= require("request");
var should = chai.should();



chai.use(chaiHttp);

describe("Itune Application API Testing", function() {

    describe("Get Itunes Method", function() {

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
   it('No records found on  /getItunes GET ', function(done) {
          chai.request(server)
         .get('/getItunes')
         .end(function(err, res){
         res.body.should.be.a('object');
         res.body.status.should.not.equal("info");
        
         done();
     });
 });
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