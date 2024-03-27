import express from 'express';
const router = express.Router();

import {
    getAllUsers,
    getUserById,
    getUserByMail,
    getUserByRole,
    getUserByUsername,
    updateUser,
    deleteUser
} from "../controllers/userControllers";

router.get('/users', getAllUsers);                              // Route for fetching all users.
router.get('/users/id/:id', getUserById);                       // Route for fetching users by ID.      
router.get('/users/email', getUserByMail);                      // Route for fetching user by ID.
router.get('/users/role', getUserByRole);                       // Route for fetching user by role.
router.get('/users/username/:username', getUserByUsername)     // Route for fetching user by username.
router.put('/users/update/:id', updateUser);                   // Route for updating user data.
router.delete('/users/delete/:id', deleteUser);                // Route for deleting user data.

module.exports = router;