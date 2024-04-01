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

let bookID;

suite('Functional Tests', function() {

  test('#example Test GET /api/books', function(done){
    chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    
      
      test('Test POST /api/books with title', function(done) {
          
          chai.request(server)
            .post('/api/books')
            .send({title: 'Test Book'})
            .end(function(err, res){
              res.should.have.status(200);
              res.body.should.have.property('title');
              bookID = res.body._id;
              res.body.should.have.property('_id');
              booktest = res.body._id;
              done();
            });
          
        
      });
      
      test('Test POST /api/books with no title given', function(done) {
          
          chai.request(server)
            .post('/api/books')
            .send({})
            .end(function(err, res){
              res.should.have.status(200);
              res.text.should.equal('missing required field title');
              done();
            });
          
      })
      
    


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('commentcount');
            res.body[0].should.have.property('_id');
            done();
          });
        });      
      
      })


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/1234567890')
          .end(function(err, res){
            res.should.have.status(200);
            res.text.should.equal('no book exists');
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){

        chai.request(server)
          .get('/api/books/' + bookID)
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('title');
            res.body.should.have.property('comments');
            res.body.should.have.property('_id');
            done();
          });
        
          
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/' + bookID)
          .send({comment: 'Test Comment'})
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('title');
            res.body.should.have.property('comments');
            res.body.should.have.property('_id');
            done();
          });
        
        
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post('/api/books/' + bookID)
          .send({})
          .end(function(err, res){
            res.should.have.status(200);
            res.text.should.equal('missing required field comment');
            done();
          });
        
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post('/api/books/1234567890')
          .send({comment: 'Test Comment'})
          .end(function(err, res){
            res.should.have.status(200);
            res.text.should.equal('no book exists');
            done();
        
          
          })
      
    });
  })

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete('/api/books/' + bookID)
          .end(function(err, res){
            res.should.have.status(200);
            res.text.should.equal('delete successful');
            done();
          });
        
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete('/api/books/1234567890')
          .end(function(err, res){
            res.should.have.status(200);
            res.text.should.equal('no book exists');
            done();
          });
        
          
      });

    });

  });

  })
})

