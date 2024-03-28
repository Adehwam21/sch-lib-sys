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
router.post('/books/create', addBook );
router.get('/books', getAllBooks);
router.get('/books/book/:id', getBookByTitle);
router.delete('books/delete-book/:id', deleteBook);


// Book Copy routes
router.post('/books/copy/create', addBookCopy );
router.get('/books/copies', getAllBookCopies);
router.get('/books/copy/:code', getBookCopyByCode);
router.delete('/books/delete-copy/:code', deleteBookCopy);

module.exports = router;