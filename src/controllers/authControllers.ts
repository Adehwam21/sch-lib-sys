import {prisma} from '../db/prismas';
import {Request, Response} from 'express'
import {hashPassword, comparePassword} from '../utils/authenticate';

/* ========================================User registration======================================== */
export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, age, username, password, email, phone } = req.body;
    try {
        // Verify if user already exists in the database
        const user = await prisma.user.findUnique({
            where: {email: String(email)}
        });
        if (user?.email && user?.username) {
            console.log("User already exists")
            return res.status(401).json("User already exists");
        } else {

            // If user does not exist, create user object
            const hash = await hashPassword(String(password));
            const createUser = await prisma.user.create({
            data: {
                firstName: String(firstName),
                lastName: String(lastName),
                username: String(username),
                age: Number(age),
                hashedPassword: hash,
                email: String(email),
                phone: String(phone)
            }
        });
        console.log(`${createUser?.username} registered`);
        return res.status(201).json("Sign Up successful.");
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(400).send('Cannot Sign Up. Error: ' + error);
    };
};

/* ========================================User login============================================== */
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        // Check if user exists and is unique
        const user = await prisma.user.findUnique({
            where: { username: String(username) }
        });
        if (username !== user?.username) {
            return res.status(401).send("Invalid username");
        }

        // Check if passwords match
        const match = await comparePassword(password, String(user?.hashedPassword));
        if (match) {
            console.log(`${String(user?.username)} logged in }`)
            return res.status(200).send("Login successful");
        } else {
            console.log("Invalid password")
            return res.status(401).send("Invalid password");
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send("An error occurred during login.");
    };
};
