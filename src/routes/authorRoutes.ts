import express from 'express';
const router = express.Router();

import {
    addAuthor, 
    delAuthor, 
    getAllAuthors, 
    getAuthorByEmail, 
    getAuthorByFirstName, 
    getAuthorById, 
    getAuthorByLastName, 
    updateAuthor
} from '../controllers/authorControllers';

router.post('/author', addAuthor); // Route for creating author profile.
router.get('/author/:id', getAuthorById); // Route for fetching Author data using their ID.
router.get('/authors', getAllAuthors); // Route for fetching all Author's in the database.
router.get('/author?email;', getAuthorByEmail); // Route for fetching Author info with their email.
router.get('/author?fname;', getAuthorByFirstName); // Route for fetching Author data with their first name.
router.get('/author?lname;', getAuthorByLastName); // Route for fetching Author data with their last name.
router.put('/update-author/:id', updateAuthor); // Route for updating Author data with their ID.
router.delete('/author/:id', delAuthor); // Route for deleting Author data using their ID.

module.exports = router;
