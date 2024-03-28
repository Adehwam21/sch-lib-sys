import express from 'express';
const router = express.Router();

import {
    addBook, 
    addBookCopy, 
    deleteBookByID, 
    deleteBookCopy, 
    getAllBookCopies, 
    getAllBooks, 
    getBookById, 
    getBookByTitle, 
    getBookCopyByCode
} from '../controllers/bookControllers';

// Books routes
router.post('/books/create', addBook );
router.get('/books', getAllBooks);
router.get('/books/book/title', getBookByTitle);
router.get('/books/book/:id', getBookById);
router.delete('/books/delete/:id', deleteBookByID);


// Book Copy routes
router.post('/books/copy/create', addBookCopy );
router.get('/books/copies', getAllBookCopies);
router.get('/books/copy/:copyCode', getBookCopyByCode);
router.delete('/books/copy/delete/:copyCode', deleteBookCopy);

module.exports = router;