import express from 'express';
const router = express.Router();

import {addBook, addBookCopy, getAllBookCopies, getAllBooks, getBookCopyByCode} from '../controllers/bookControllers';

// Books routes
router.post('/book-copy', addBook );
router.get('/books', getAllBooks);

// Book Copy routes
router.post('/book-copy', addBookCopy );
router.get('/books', getAllBookCopies);
router.get('/book-copy:code', getBookCopyByCode);

module.exports = router;