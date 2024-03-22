import express from 'express';
const router = express.Router();

import {register, login} from '../controllers/authControllers';

router.post('/signup', register);
router.get('/login', login);

module.exports = router