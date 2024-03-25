import express from 'express';
const router = express.Router();

import {addBook, addBookCopy, deleteBook, deleteBookCopy, getAllBookCopies, getAllBooks, getBookByTitle, getBookCopyByCode} from '../controllers/bookControllers';

// Books routes
router.post('/book-copy', addBook );
router.get('/books', getAllBooks);
router.get('/books/?title', getBookByTitle);
router.get('/books/:id', deleteBook);


// Book Copy routes
router.post('/book-copy', addBookCopy );
router.get('/books', getAllBookCopies);
router.get('/book-copy/:code', getBookCopyByCode);
router.get('/books/:code', deleteBookCopy);

module.exports = router;