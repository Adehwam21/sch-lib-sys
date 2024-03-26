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

router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.get('/user/?mail', getUserByMail);
router.get('/user/?role', getUserByRole);
router.get('/user/?username', getUserByUsername)
router.put('/user-update/:username', updateUser);
router.delete('/delete-user/:id', deleteUser);

