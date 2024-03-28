import { prisma } from "../../db/prismas";

//  CREATE BOOK
export const createBookService = async (title: string, authorId: string, authorFirstName: string, authorLastName: string) => {
    try {
        // Verify if author data exists in the database.
        const author = await prisma.author.findUnique({
            where: { id: authorId }
        });

        if (!author) {
            return {code: 401, data: "Author does not exist. Consider creating an author profile"};
        }

        // Verify if book exists in the database.
        const existingBook = await prisma.book.findUnique({
            where: { title: title }
        });

        if (existingBook) {
            return {code: 401, data: "Book already exists"};
        }

        // Create the book
        await prisma.book.create({
            data: {
                title: title,
                authorFirstName: authorFirstName,
                authorLastName: authorLastName,
                authorId: authorId
            }
        });

        return {code: 201, data: "Book created"};
    } catch (error) {
        throw new Error("Error adding book: " + error);
    }
};

// GET ALL BOOKS
export const getAllBooksService = async () => {
    try {
        const books = await prisma.book.findMany();
        return {code: 200, data: books};
    } catch (error) {
        throw new Error("Error fetching all books: " + error);
    }
};

// GET BOOK BY ID
export const getBookByIdService = async (id: string) => {
    try {
        const book = await prisma.book.findUnique({
            where: { id: id }
        });
        return {code: 200, data: book};
    } catch (error) {
        throw new Error("Error fetching book by id: " + error);
    }
};

// GET BOOK BY TITLE
export const getBookByTitleService = async (title: string) => {
    try {
        const book = await prisma.book.findUnique({
            where: { title: title }
        });
        return {code: 200, data: book};
    } catch (error) {
        throw new Error("Error fetching book by title: " + error);
    }
};

//Add update book copy later

// DELETE BOOK BY ID
export const deleteBookByIdService = async (id: string) => {
    try {
        const book = await prisma.book.delete({
            where: { id: id }
        });
        return {code: 200, data: book};
    } catch (error) {
        throw new Error("Error deleting book: " + error);
    }
};


/* ================================== BOOK COPIES ==============================================*/
export const createBookCopyService = async (bookId: string, ISBN: string, pages: string) => {
    try {
        // Verify if a copy of the book already exists
        const existingBookCopy = await prisma.bookCopy.findUnique({
            where: { ISBN: ISBN }
        });

        if (existingBookCopy) {
            throw new Error("This copy already exists");
        }

        // Verify if book exists in the database
        const book = await prisma.book.findUnique({
            where: { id: bookId},
        });

        if (!book) {
            throw new Error("This copy does not refer to any book");
        }

        // Create the book copy
        await prisma.bookCopy.create({
            data: {
                bookId: bookId,
                ISBN: ISBN,
                pages: Number(pages)
            }
        });

        return {code: 201, data: 'Copy created successfully'};
    } catch (error) {
        throw new Error("Error adding book copy: " + error);
    }
};

// GET ALL BOOK COPIES
export const getAllBookCopiesService = async () => {
    try {
        const bookCopies = await prisma.bookCopy.findMany();
        return {code: 200, data: bookCopies}
    } catch (error) {
        throw new Error("Error fetching all book copies: " + error);
    }
};

// GET COPY BY COPY CODE
export const getBookCopyByCodeService = async (copyCode: number) => {
    try {
        const bookCopy = await prisma.bookCopy.findUnique({
            where: { copyCode: copyCode }
        });
        return {code: 200, data: bookCopy}
    } catch (error) {
        throw new Error("Error fetching book copy by code: " + error);
    }
};

//Add update book copy later

// DELETE BOOK COPY
export const deleteBookCopyByCodeService = async (copyCode: number) => {
    try {
        const deletedBookCopy = await prisma.bookCopy.delete({
            where: { copyCode: copyCode }
        });
        return {code: 200, data: deletedBookCopy}
    } catch (error) {
        throw new Error("Error deleting book copy: " + error);
    }
};
