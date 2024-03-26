import { prisma } from "../../db/prismas";
import { converStringToRoleType } from '../../utils/userUtils';

// GET ALL USERS 
export const getAllUsersService = async () => {
    try {
        const users = await prisma.user.findMany();
        return { code: 200, data: {users} };
    } catch (error) {
        console.error("Error fetching all users:", error);
        return { code: 500, data: "Internal server error" };
    }
};
// GET USER BY ID
export const getUserByIdService = async (userId: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: userId },
        });

        if (!user) {
            console.log("User not found");
            return { code: 404, data: "User not found" };
        }

        return { code: 200, data: user };
    } catch (error) {
        console.error("Error fetching user details:", error);
        return { code: 500, data: "Internal server error" };
    }
};

// GET USER BY USERNAME
export const getUserByUsernameService = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if (!user) {
            console.log("User not found");
            return { code: 404, data: "User not found" };
        }
        console.log(user)
        return { code: 200, data: user };
    } catch (error) {
        console.error("Error fetching user details:", error);
        return { code: 500, data: "Internal server error" };
    }
};

// GET USER BY MAIL
export const getUserByMailService = async (email: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            console.log("User not found");
            return { code: 404, data: "User not found" };
        }

        return { code: 200, data: user };
    } catch (error) {
        console.error("Error fetching user details:", error);
        return { code: 500, data: "Internal server error" };
    }
};

// GET USER BY ROLE
export const getUserByRoleService = async (role: any) => {
    try {
        const userRole = converStringToRoleType(role)
        const users = await prisma.user.findMany({
            where: { role: userRole },
        });

        if (!users || users.length === 0) {
            console.log("Users not found");
            return { code: 404, data: "Users not found" };
        }
        return { code: 200, data: users };
    } catch (error) {
        console.error("Error fetching users by role:", error);
        return { code: 500, data: "Internal server error" };
    }
};

// UPDATE USER
export const updateUserService = async (id: string, firstName: string, lastName: string, age: number, phone: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: id }
        });

        if (!user) {
            console.log("User does not exist");
            return { code: 404, data: "User not found" };
        }

        await prisma.user.update({
            where: { username: id},
            data: {
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                age: age || user.age,
                phone: phone || user.phone
            }
        });

        console.log("Update successful");
        return { code: 200, data: "User details updated successfully" };
    } catch (error) {
        console.error("Error updating User", error);
        return { code: 500, data: "Internal server error" };
    }
};

// DELETE USER
export const deleteUserService = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!user) {
            console.log("User does not exist");
            return { code: 404, data: "User not found" };
        } else {
            await prisma.user.delete({
                where: { id: id}
            })
            console.log('User deleted');
            return {code: 200, data: "User deletedd"};
        }
    }catch (error) {
        console.error('Error deleting User', error);
        return {code: 500, data: "Internal server error"};
    };
};
