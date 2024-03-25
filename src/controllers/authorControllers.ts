import { CreateAuthor } from "dto/authorRelatedDto";
import { prisma } from "../db/prismas";
import { Request, Response } from "express";
import { addAuthorService, deleteAuthorService, getAllAuthorsService, getAuthorByEmailService, getAuthorByFirstNameService, getAuthorByIdService, getAuthorByLastNameService, updateAuthorService } from "services/dbServices/authorServices";

/*=========================== Add Author ===========================================*/
export const addAuthor = async (req: Request, res: Response) => {
    const { firstName, lastName, email } = req.body;
    try {
        const { code, data} = await addAuthorService(firstName, lastName, email);
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error adding Author", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Get all Authors ===========================================*/
export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const { code, data } = await getAllAuthorsService();
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error fetching all authors:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Author by Author ID ===========================================*/
export const getAuthorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { code, data } = await getAuthorByIdService(id);
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error fetching author by id:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Author by email ===========================================*/
export const getAuthorByEmail = async (req: Request, res: Response) => {
    const { email } = req.query;
    try {
        const { code, data } = await getAuthorByEmailService(email as string);
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error fetching author by email:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Author by First Name ===========================================*/
export const getAuthorByFirstName = async (req: Request, res: Response) => {
    const { fname } = req.query;
    try {
        const { code, data } = await getAuthorByFirstNameService(fname as string);
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error fetching authors by first name:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Author by Last Name ===========================================*/
export const getAuthorByLastName = async (req: Request, res: Response) => {
    const { lname } = req.query;
    try {
        const { code, data } = await getAuthorByLastNameService(lname as string);
        return res.status(code).json(data);
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
        const { code, data } = await updateAuthorService(id, firstName, lastName, email);
        return res.status(code).json(data);
    } catch (error) {
        console.error("Error updating Author", error);
        return res.status(500).json({ data: "Internal server error" });
    }
};

/*================================== Delete Author ===========================================*/
export const delAuthor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const {code, data} = await deleteAuthorService(id);
        return res.status(code).json(data)
    } catch (error) {
        console.error("Error deleting author:", error);
        return res.status(500).json({ data: "Internal server error" });
    }
};
