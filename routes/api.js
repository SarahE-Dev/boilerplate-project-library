/*
*
*
*       Complete the API routing below
*       
*       
*/

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
        res.send(bookArray);
      } catch (error) {
        res.send([]);
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
        const bookGiven = await newBook.save();
        res.json(bookGiven);
      } catch (error) {
        res.send('there was an error saving')
      }
      
    })
    
    .delete(async function(req, res){
        try {
          const deleteAll = await Book.deleteMany();
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
        res.json({
          _id: bookto._id,
          title: bookto.title,
          comments: bookto.comments
        });
      } catch (error) {
        res.send('no book exists')
      }

    })
    
    .post(async function(req, res){
        try {
          const {comment} = req.body;
          const bookId = req.params.id;
          
          if(!comment) {
            res.send('missing required field comment');
            return
          }
          const foundBook = await Book.findById(bookId);
          if(!foundBook) {
            res.send('no book exists');
            return
          }
          foundBook.comments.push(comment);
          
          let commentBook = await foundBook.save();
          res.json({
            _id: commentBook._id,
            title: commentBook.title,
            comments: commentBook.comments

          })
        } catch (error) {
          res.send('no book exists');
        }
    })
    
    .delete(async function(req, res){
      try {
        const bookID = req.params.id;
        const bookToDelete = await Book.findByIdAndDelete(bookID);
        if(!bookToDelete) throw new Error('no book exists');
        res.send('delete successful');
        
      } catch (error) {
        res.send('no book exists');
      }
    });
  
};
