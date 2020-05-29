var express = require("express");
var router = express.Router();
var Book = require("../models").Book;

// Async handler wrapper
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
}

// Shows the full list of books
router.get(
  "/",
  asyncHandler(async (req, res) => {
    let allBooks = await Book.findAll();
    let books = allBooks.map((book) => book.toJSON());
    res.render("index", { books: books, title: "Books" });
  })
);

// Shows the create new book form.
router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("new-book", { book: {}, errs: {}, title: "New Book" });
  })
);

// Posts a new book to the database.
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    try {
      let book = await Book.create(req.body);
      id = book.id;
      res.redirect(`${id}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        // checking the error
        let book = await Book.build(req.body);
        errs = error.errors.map((err) => err.message);
        res.render("new-book", { book: book, errors: errs, title: "New Book" });
      } else {
        throw error; // error caught in the asyncHandler's catch block
      }
    }
  })
);

// Shows book detail form
router.get(
  "/:id",
  asyncHandler(async (req, res,next) => {
    let book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book: book ,title:book.title});
    } else {
      res.render('page-not-found',{title:"Book not found"});
    }
  })
);

// Updates book info in the database
router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    let book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect(`${book.id}`);
  })
);

//Deletes a book.
router.post("/:id/delete", asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/');
  }));

module.exports = router;
