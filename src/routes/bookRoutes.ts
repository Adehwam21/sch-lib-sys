import express from 'express';
const router = express.Router();

import {addBook, addBookCopy} from '../controllers/bookControllers';

router.post('/add-book', addBook);
router.post('/add-book-copy', addBookCopy )

module.exports = router