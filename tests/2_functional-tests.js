/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const server = require('../server');
const Book = require('../routes/Modal/Book');
const { mongoose } = require('mongoose');

chai.use(chaiHttp);
require('dotenv').config()
let booktest;


suite('Functional Tests', function() {

  test('#example Test GET /api/books', function(done){
    chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    
      
      test('Test POST /api/books with title', function(done) {
          
          
        
      });
      
      test('Test POST /api/books with no title given', function(done) {
        
      
          
      })
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        
        
          
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        
        
          
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        
        
          
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        
        
        
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        
        
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        
        
          
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        
        
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        
        
          
      });

    });

  });


