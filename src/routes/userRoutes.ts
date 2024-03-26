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

router.get('/users', getAllUsers);                  // Route for fetching all users.
router.get('/user/:id', getUserById);               // Route for fetching users by ID.      
router.get('/user', getUserByMail);                 // Route for fetching user by ID.
router.get('/users/role', getUserByRole);                // Route for fetching user by role.
router.get('/user/:username', getUserByUsername)    // Route for fetching user by username.
router.put('/update-user/:id', updateUser);   // Route for updating user data.
router.delete('/delete-user/:id', deleteUser);      // Route for deleting user data.

module.exports = router;