var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

// Async handler wrapper
function asyncHandler(cb){
  return async(req,res,next) => {
    try{
      await cb(req,res,next)
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }
}

// Shows the full list of books
router.get('/', asyncHandler(async(req, res)=> {

  let allBooks = await Book.findAll();
  let books = allBooks.map(book => book.toJSON());
  res.render('index',{'books':books,"title":'Books'});
}));


// Shows the create new book form.
router.get('/new', asyncHandler(async(req, res)=> {
  res.render('new-book')
}));

// Posts a new book to the database.
router.post('/new', asyncHandler(async(req, res)=> {
  
const book = await Book.create()

}));

// Shows book detail form
router.get('/books/:id', asyncHandler(async(req, res)=> {
  null
}));

// Updates book info in the database
router.post('/books/:id', asyncHandler(async(req, res)=> {
  null
}));

//Deletes a book.
router.post('/books/:id/delete', asyncHandler(async(req, res)=> {
  null
}));

module.exports = router;
