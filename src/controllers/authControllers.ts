import {prisma} from '../db/prismas';
import {Request, Response} from 'express'
import {hashPassword, comparePassword} from '../utils/authenticate';
import { Register, Login } from 'dto/authDto';
import { loginService, resgistrationService } from 'services/dbServices';

/* ========================================User registration======================================== */
export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, age, username, password, email, phone }: Register = req.body;
    try {
        const info = await resgistrationService(firstName, lastName, age, username, password, email, phone)
        return res.status(info.code).json(info);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(400).send('Cannot Sign Up. Error: ' + error);
    };
};

/* ========================================User login============================================== */
export const login = async (req: Request, res: Response) => {
    const { username, password }:Login = req.body;
    try {
        const info = await loginService(username, password)
        return res.status(info.code).json(info);
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send("An error occurred during login.");
    };
};
