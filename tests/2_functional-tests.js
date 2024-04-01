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


describe('Library API', ()=>{
  beforeEach(async()=>{
    await Book.deleteMany({})
  })

  after(async()=>{
    await mongoose.connection.close()
  })

  describe('POST /api/books with title => create book object/expect book object', ()=>{
    it('should create a new book', (done)=>{
      chai.request(server)
        .post('/api/books')
        .send({title: 'Test Book'})
        .end((err, res)=>{
          res.should.have.status(200);
          res.body.should.have.property('title').eql('Test Book');
          res.body.should.have.property('_id');
          booktest = res.body;
          done();
        })
    })
  })
})