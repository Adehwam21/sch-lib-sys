import { UpdateUser } from 'dto/userRelatedDto';
import {prisma} from '../db/prismas';
import {Request, Response} from 'express'

/*=========================== Get all Users ======================================*/
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find user by UserId ======================================*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: String(userId) },
        });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find user by username ======================================*/
export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { username: String(username) },
        });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find user by email ======================================*/
export const getUserByMail = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: String(userId) },
        });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find users by role ======================================*/
export const getUserByRole = async (req: Request, res: Response) => {
    const { role } = req.query;
    
    try {
        const user = await prisma.user.findMany({
            where: { role: role},
        });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Update User info ======================================*/
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, age, phone }: UpdateUser = req.body;

    try {
        // Fetch author information from the database
        const user = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!user) {
            console.log("User does not exist");
            return res.status(404).json({ message: "User not found" });
        }

        // Update author details
        await prisma.user.update({
            where: { id: String(id) },
            data: {
                firstName: firstName || user?.firstName,
                lastName: lastName || user?.lastName,
                age: age || user?.age,
                phone: phone || user?.email
            }
        });

        console.log("Update successful");
        return res.status(200).json({
            message: "User details updated successfully"
        });
    } catch (error) {
        console.log("Error updating User", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
