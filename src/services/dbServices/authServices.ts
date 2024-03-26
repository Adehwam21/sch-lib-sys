import {prisma} from "../../db/prismas"
import { hashPassword, comparePassword } from "../../utils/authenticate";


// REGISTRATION 
export const resgistrationService = async (firstName: string, lastName: string, age: number, username: string, password: string, email: string, phone: string) => {
    // Verify if user already exists in the database
    const user = await prisma.user.findUnique({
        where: {email: email}
    });
    if (user) {
        console.log("User already exists")
        return {code: 401, data: "User already exists"}
    } else {
        // If user does not exist, create user object
        const hash = await hashPassword(password);
        await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            age: age,
            hashedPassword: hash,
            email: email,
            phone: phone
        }
    });
    console.log(`${username} registered`);
    return {code: 200, data:"Sign up successful"};
    };
};

// LOGIN 
export const loginService = async (username:string, password:string) => {
    // Check if user exists and is unique
    const user = await prisma.user.findUnique({
        where: { username: username }
    });
    if (username !== user?.username) {
        return {code: 401, data: "Invalid username"};
    }

    // Check if passwords match
    const match = await comparePassword(password, user?.hashedPassword);
    if (match) {
        console.log(`${user?.username} logged in }`)
        return {code: 200, data: "Login successful"};
    } else {
        console.log("Invalid password")
        return {code: 200, data: "Invalid password"};
    }   
}
