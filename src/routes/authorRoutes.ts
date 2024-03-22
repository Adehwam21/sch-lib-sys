import express from 'express';
const router = express.Router();

import {addAuthor, editAuthor} from '../controllers/authorControllers';

router.post('/add-author', addAuthor);
router.put('/edit-author/:id', editAuthor)

module.exports = router