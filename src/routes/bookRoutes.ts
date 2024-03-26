import express from 'express';
const router = express.Router();

import {
    addBook, 
    addBookCopy, 
    deleteBook, 
    deleteBookCopy, 
    getAllBookCopies, 
    getAllBooks, 
    getBookByTitle, 
    getBookCopyByCode
} from '../controllers/bookControllers';

// Books routes
router.post('/book', addBook );
router.get('/books', getAllBooks);
router.get('/books/?title', getBookByTitle);
router.delete('/books/:id', deleteBook);


// Book Copy routes
router.post('/book-copy', addBookCopy );
router.get('/books-copies', getAllBookCopies);
router.get('/book-copy/:code', getBookCopyByCode);
router.delete('/books/:code', deleteBookCopy);

module.exports = router;