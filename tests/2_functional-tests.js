/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
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
        
        chai.request(server)
          .get('/api/books/5f4f0e3e7e8e0e7c9c4c')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            
            assert.equal(res.body, 'no book exists');
            done()
          });
          
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        
        chai.request(server)
          .get(`/api/books/${booktest._id}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.property(res.body, 'comments');
            done()
          });
          
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        
        chai.request(server)
          .post(`/api/books/${booktest._id}`)
          .send({comment: 'Test Comment'})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'title');
            assert.property(res.body, '_id');
            assert.property(res.body, 'comments');
            assert.include(res.body.comments, 'Test Comment');
            done();
          });
        
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        
        chai.request(server)
          .post('/api/books/5f4f0e3e7e7e8e0e7c9c4c3e')
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
          
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        
        chai.request(server)
          .post('/api/books/5f4f0e3e7e7e8e0e7c9c4c3d')
          .send({comment: 'Test Comment'})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, 'no book exists');
            done();
          });
          
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        
        chai.request(server)
          .delete(`/api/books/${booktest._id}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, 'delete successful');
            done()
          });
          
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        
        chai.request(server)
          .delete('/api/books/5f4f0e3e7e0e7c9c4c3d')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
          
      });

    });

  });


