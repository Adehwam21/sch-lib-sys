import { prisma } from "../../db/prismas";

//  CREATE BOOK
export const createBookService = async (title: string, authorId: string, authorFirstName: string, authorLastName: string, isbn: string) => {
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
            where: {
                 title: title,
                }
        });

        let isISBN = existingBook?.ISBN === isbn;
        if (existingBook ) {
            return {code: 401, data: "This Book already exists"};
        }
        if (isISBN) {
            return {code: 401, data: "This Book version already exists"};
        }

        // Create the book
        await prisma.book.create({
            data: {
                title: title,
                authorFirstName: authorFirstName,
                authorLastName: authorLastName,
                authorId: authorId,
                ISBN: isbn
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

        if (!book) {
            return {code: 400, data: "Book does not exist"}
        };
        return {code: 200, data: book};
    } catch (error) {
        return {code: 500, data: "Internal server error"};
    };
};

// GET BOOK BY TITLE
export const getBookByTitleService = async (title: string) => {
    try {
        const book = await prisma.book.findUnique({
            where: { title: String(title) }
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
        //  Check if book exists
        const book = await prisma.book.findUnique({
            where: {id: id}
        })

        if (!book) {
            return { code: 404, data: "Book does not exist" };
        }
        // Delete the book along with records of its copies
        await prisma.book.delete({
            where: { id: id }
        });
        await prisma.bookCopy.deleteMany({
            where: {bookId: id}
        })
        return {code: 200, data: "Book deleted successfully along with its copies."};
    } catch (error) {
        throw new Error("Error deleting books and copies:" + error);   
    }
};


/* ================================== BOOK COPIES ==============================================*/
export const createBookCopyService = async (bookId: string, ISBN: string, pages: string) => {
    try {

        // Verify if book exists in the database
        const book = await prisma.book.findUnique({
            where: { 
                id: bookId,
                ISBN: ISBN
            },
        });

        if (!book) {
            return {code: 401, data: "This copy does not refer to any book in the system, "};
        } else if (book) {
        // Create the book copy
        await prisma.bookCopy.create({
            data: {
                bookId: bookId,
                ISBN: ISBN,
                pages: Number(pages)
            }
        });
    }

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
        const bookcopy = await prisma.bookCopy.delete({
            where: { copyCode: copyCode }
        });

        if (!bookcopy) {
            return {code: 404, data: "Copy not found"};
        }

        return {code: 200, data: "Copy deleted."}
    } catch (error) {
        throw new Error("Error deleting book copy: " + error);
    }
};
