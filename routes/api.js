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
      try {
        const newBook = new Book({title});
        await newBook.save();
        res.json(newBook);
      } catch (error) {
        res.json({error: error.message});
      }
      
    })
    
    .delete(async function(req, res){
        try {
          db.collection('books').deleteMany({});
          res.json('complete delete successful');
        } catch (error) {
          res.json({error: error.message});
        }
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
          return res.json('no book exists')
        }
        const bookToFind = await Book.findById({_id: req.params.id})
        if(!bookToFind) {
          return res.json('no book exists');
        }else{
          res.json(bookToFind);
        }
        
      } catch (error) {
        res.json({error: error.message});
      }
    })
    
    .post(async function(req, res){
        try {
          const {comment} = req.body;
          if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.json('no book exists')
          }
          const foundBook = await Book.findOne({_id: req.params.id});
          if(!comment) {
            return res.json('missing required field comment');
          }
          if(!foundBook) {
            return res.json('no book exists');
          }
          
          foundBook.comments.push(comment);
          
          await foundBook.save();
          res.json(foundBook);
        } catch (error) {
          res.json({error: error.message});
        }
    })
    
    .delete(async function(req, res){
      try {
        const {id} = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
          return res.json('no book exists')
        }
        const bookToDelete = await Book.findOne({_id: id});
        if(!bookToDelete._id) {
          return res.json('no book exists');
        }else{
          const deleteB = await bookToDelete.findOneAndDelete({_id: id});
          return res.json('delete successful');
        }
      } catch (error) {
        res.json({error: error.message});
      }
    });
  
};
