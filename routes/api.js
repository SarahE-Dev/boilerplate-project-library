/*
*
*
*       Complete the API routing below
*       
*       
*/



const { default: mongoose } = require('mongoose');
const Book = require('./Modal/Book');



module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      try {
        const allBooks = await Book.find({});
        const bookArray = allBooks.map(book => {
          return {
            _id: book._id,
            title: book.title,
            commentcount: book.comments.length
          }
        });
        res.json(bookArray);
      } catch (error) {
        res.json({error: error.message});
      }
    })
    
    .post(async function (req, res){
      const {title} = req.body;
      if(!title) {
        res.send('missing required field title');
        return
      }
      const newBook = new Book({
        title,
        comments: []
      });
      try {
        await newBook.save();
        res.json(newBook);
      } catch (error) {
        res.json({error: error.message});
      }
      
    })
    
    .delete(async function(req, res){
        try {
          await Book.deleteMany({});
          res.send('complete delete successful');
        } catch (error) {
          res.send('error')
        }
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookId = req.params.id;
      try {
        const bookto = await Book.findById(bookId);
        if(!bookto)(
          res.send('no book exists')
        )
        res.send(bookto);
      } catch (error) {
        res.send('no book exists')
      }

    })
    
    .post(async function(req, res){
        try {
          const {comment} = req.body;
          const {id} = req.params;
          
          if(!comment) {
            res.send('missing required field comment');
            return
          }
          const foundBook = await Book.findById(id);
          if(!foundBook) {
            res.send('no book exists');
            return
          }
          foundBook.comments.push(comment);
          
          await foundBook.save();
          res.send(foundBook);
        } catch (error) {
          res.send('no book exists');
        }
    })
    
    .delete(async function(req, res){
      try {
        const {id} = req.params.id;
        const bookToDelete = await Book.findByIdAndDelete(id);
        if(!bookToDelete){
          res.send('no book exists');
          return
        }
        res.send('delete successful');
        
      } catch (error) {
        res.send('no book exists');
      }
    });
  
};
