var express = require('express');
var router = express.Router();




// var Book = require('../models').Book;
/* GET home page. */

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
router.get('/',(req, res) => {
  res.redirect('/books');
});

module.exports = router;
