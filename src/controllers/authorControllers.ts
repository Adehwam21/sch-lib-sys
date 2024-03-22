import { CreateAuthor } from "dto/authorRelatedDto";
import { prisma } from "../db/prismas";
import { Request, Response } from "express";

/*=========================== Add Author ===========================================*/
export const addAuthor = async (req: Request, res: Response) => {
    const {firstName, lastName, email}:CreateAuthor = req.body
    try {
        const author = await prisma.author.findUnique({
            where : {email: email}
        })
        if (author?.email === email){
            console.log('Author already exists')
            return res.status(400).json({message: "Author already exists"})
        } else {
            const createAuthor = await prisma.author.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }
            })
            console.log(`${createAuthor?.firstName} ${createAuthor?.lastName} added to Authors`)
            res.status(201).json({message: `${createAuthor?.firstName} ${createAuthor?.lastName} added successfully`})
        }
    }catch (error) {
        console.log("Error adding Author", error)
        res.status(404).json({message: "Internal server error"})
    }
}

/*=========================== Get all Authors ===========================================*/
export const getAllAuthors = async (req: Request, res: Response): Promise<Response> => {
    try {
        const authors = await prisma.author.findMany();
        return res.status(200).json({ authors });
    } catch (error) {
        console.error("Error fetching all authors:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Author by Author ID ===========================================*/
export const getAuthorById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const author = await prisma.author.findUnique({
            where: { id: String(id) }
        });
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        return res.status(200).json({ author });
    } catch (error) {
        console.error("Error fetching author by id:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Author by email ===========================================*/
export const getAuthorByEmail = async (req: Request, res: Response): Promise<Response> => {
    const email = req.query.email;
    try {
        const author = await prisma.author.findFirst({
            where: { email: email }
        });
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        return res.status(200).json({ author });
    } catch (error) {
        console.error("Error fetching author by email:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Author by First Name ===========================================*/
export const getAuthorByFirstName = async (req: Request, res: Response): Promise<Response> => {
    const fname = req.query.fname;
    try {
        const authors = await prisma.author.findMany({
            where: { firstName: fname }
        });
        if (authors.length === 0) {
            return res.status(404).json({ message: "Authors not found" });
        }
        return res.status(200).json({ authors });
    } catch (error) {
        console.error("Error fetching authors by first name:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Author by Last Name ===========================================*/
export const getAuthorByLastName = async (req: Request, res: Response): Promise<Response> => {
    const lname = req.query.lname;
    try {
        const authors = await prisma.author.findMany({
            where: { lastName: lname }
        });
        if (authors.length === 0) {
            return res.status(404).json({ message: "Authors not found" });
        }
        return res.status(200).json({ authors });
    } catch (error) {
        console.error("Error fetching authors by last name:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*================================== Update Author Details ===========================================*/
export const updateAuthor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    try {
        // Fetch author information from the database
        const author = await prisma.author.findUnique({
            where: {id: id}
        });

        if (!author) {
            console.log("Author does not exist");
            return res.status(404).json({ message: "Author not found" });
        }

        // Update author details with request body and save.
        await prisma.author.update({
            where: {id: id},
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        });

        console.log("Update successful");
        return res.status(200).json({
            message: "Author details updated successfully"
        });
    } catch (error) {
        console.log("Error updating Author", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*================================== Delete Author ===========================================*/
export const delAuthor = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params
    try {
        await prisma.author.delete({
            where : {id : id}
        });
        return res.status(200).json({ message: "Account deleted" });
    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
