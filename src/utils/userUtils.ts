import { Role } from "@prisma/client";

export const converStringToRoleType = (role: string) => {
    switch (role.toLowerCase()) {
        case 'student':
            return Role.STUDENT;
        case 'admin':
            return Role.ADMIN;
        case 'super_admin':
            return Role.SUPER_ADMIN;
        default:
            throw new Error("Invalid role");
    };
};