import express from 'express';
const router = express.Router();

import {addAuthor, delAuthor, getAllAuthors, getAuthorByEmail, getAuthorByFirstName, getAuthorById, getAuthorByLastName, updateAuthor} from '../controllers/authorControllers';

router.post('/author', addAuthor);
router.get('/author/:id', getAuthorById);
router.get('/authors', getAllAuthors);
router.get('/author/?email;', getAuthorByEmail);
router.get('/author/?fname;', getAuthorByFirstName);
router.get('/author/?lname;', getAuthorByLastName);
router.put('/update-author/:id', updateAuthor);
router.delete('/author/:id', delAuthor)

module.exports = router
