import { prisma } from "../db/prismas";
import { Request, Response } from "express";
import { CreateBook, CreateBookCopy } from "dto/bookRelatedDto";
import {
    createBookService,
    getBookByIdService,
    getAllBookCopiesService,
    getAllBooksService,
    getBookByTitleService,
    createBookCopyService,
    getBookCopyByCodeService, 
    deleteBookCopyByCodeService
} from "../services/dbServices/bookServices"

/*================================== Create single book ===========================================*/
export const addBook = async (req: Request, res: Response) :Promise<Response>=> {
    const { title, authorId, authorFirstName, authorLastName }: CreateBook = req.body;
    try {
        const {code, data}= await createBookService(title, authorId, authorFirstName, authorLastName);
        return res.status(code).json({ data: data });
    } catch (error) {
        console.log("Error adding book", error);
        return res.status(500).json({ data: "Internal server error" });
    }
};

/*=========================== Get all Books ===========================================*/
export const getAllBooks = async (req: Request, res: Response): Promise<Response> => {
    try{
        const {code, data} = await getAllBooksService();
        return res.status(code).json({ data: data });
    } catch (error) {
        console.error("Error fetching all books:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Find Book by ID ===========================================*/
export const getBookById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const {code, data} = await getBookByIdService(id);
        return res.status(code).json({ data: data });
    } catch (error) {
        console.error("Error fetching book copy by code:", error);
        return res.status(500).json({ data: "Internal server error" });
    }
};

/*=========================== Find Book by Title ===========================================*/
export const getBookByTitle = async (req: Request, res: Response): Promise<Response> => {
    const { title } = req.params;
    try {
        const {code, data} = await getBookByTitleService(title);
        return res.status(code).json({ data: data });
    } catch (error) {
        console.error("Error fetching book copy by code:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Delete Book ===========================================*/
export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;
    try {
        const book = await prisma.book.delete({
            where: { id: id }
        });
        if (!book) {
            return res.status(404).json({ message: "Book does not exist" });
        }
        return res.status(200).json({ message: "Book deleted successfully"});
    } catch (error) {
        console.error("Error fetching author by id:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Book Copy functionalties

/*================================== Create single copy of book ===========================================*/
export const addBookCopy = async (req: Request, res: Response) :Promise<Response> => {
    const { bookId, copyCode, ISBN, pages }: CreateBookCopy = req.body;
    try {
        const {code, data}= await createBookCopyService(bookId, copyCode, ISBN, pages);
        return res.status(code).json({ data: data });
    } catch (error) {
        console.log("Error adding book", error);
        return res.status(500).json({ data: "Internal server error" });
    }
};

/*=========================== Get all Books Copies ===========================================*/
export const getAllBookCopies = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {code, data} = await getAllBookCopiesService();
        return res.status(code).json({ data: data });
    } catch (error) {
        console.error("Error fetching all book copies:", error);
        return res.status(500).json({ data: "Internal server error" });
    }
};

/*=========================== Find Book by Code ===========================================*/
export const getBookCopyByCode = async (req: Request, res: Response): Promise<Response> => {
    const { copyCode } = req.params;
    try {
        const {code, data} = await getBookCopyByCodeService(copyCode);
        return res.status(code).json({ data: data });
    } catch (error) {
        console.error("Error fetching book copy by code:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/*=========================== Delete Book ===========================================*/
export const deleteBookCopy = async (req: Request, res: Response): Promise<Response> => {
    const { copyCode } = req.params;
    try {
        const {code, data}= await deleteBookCopyByCodeService(copyCode);
        return res.status(code).json({ data: data });
    } catch (error) {
        console.error("Error deleting book copy:", error);
        return res.status(500).json({ data: "Internal server error" });
    }
};