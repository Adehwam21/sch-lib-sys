import { UpdateUser } from 'dto/userRelatedDto';
import {Request, Response} from 'express';
import { 
    getAllUsersService, 
    getUserByIdService, 
    getUserByUsernameService, 
    getUserByMailService, 
    getUserByRoleService, 
    updateUserService,
    deleteUserService
} from '../services/dbServices/userServices';

/*=========================== Get all Users ======================================*/
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { code, data } = await getAllUsersService();
        return res.status(code).json({data});
    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find user by UserId ======================================*/
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { code, data } = await getUserByIdService(id);
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find user by username ======================================*/
export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    console.log(username);
    try {
        const { code, data } = await getUserByUsernameService(username);
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find user by email ======================================*/
export const getUserByMail = async (req: Request, res: Response) => {
    const email = req.query.email;
    try {
        const { code, data } = await getUserByMailService(email);
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find users by role ======================================*/
export const getUserByRole = async (req: Request, res: Response) => {
    const role = req.query.role;
    try {
        const { code, data } = await getUserByRoleService(role);
        return res.status(code).json(data);
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
        const { code, data } = await updateUserService(id, firstName, lastName, age, phone);
        return res.status(code).json({ data });
    } catch (error) {
        console.log("Error updating User", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Delete User info ======================================*/
export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const {code, data } = await deleteUserService(id);
        return res.status(code).json({data: data});
    } catch (error) {
        console.log('Error updating User', error);
        return res.status(500).json({data: "Internal server error"});
    }
}