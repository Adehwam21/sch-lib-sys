import { prisma } from "../db/prismas";
import { Request, Response } from "express";
import { CreateBook, CreateBookCopy } from "dto/bookRelatedDto";

/*================================== Create single book ===========================================*/
export const addBook = async (req: Request, res: Response) => {
    const {title, authorId, authorFirstName,authorLastName} :CreateBook = req.body
    try {
        // Fetch predefined book and author info from database
        const book = await prisma.book.findUnique({
            where : {title: String(title)}
        });
        const author = await prisma.author.findUnique({
            where: ({id: String(authorId)})
        });

        // Verify if author data exists in the database.
        if (authorId !== author?.id){
            console.log('Anthor cannot be found');
            return res.status(400).json({
                message: "Author does not exist. Consider creating an author profile"
            });
        }

        // Verify if book exists in the database. If not, create book profile
        if (book?.title == title){
            console.log('Book already exists')
            return res.status(400).json({message: "Book already exists"})
        } else {
            const createBook = await prisma.book.create({
                data: {
                    title: title,
                    authorFirstName: authorFirstName,
                    authorLastName: authorLastName,
                    authorId: authorId,
                }
            })
            console.log(`${createBook?.title} added to Books`)
            res.status(201).json({message: `${createBook?.title} added successfully`})
        }
    } catch (error) {
        console.log("Error adding Author", error)
        res.status(404).json({message: "Internal server error"})
    }
}

/*================================== Create single copy of book ===========================================*/
export const addBookCopy = async (req: Request, res: Response) => {
    const {bookId,copyCode, ISBN, pages}: CreateBookCopy = req.body
    try {
        // Fetch predefined book and book copy info from database
        const book = await prisma.book.findUnique({
            where : {id: bookId}
        })
        const bookCopy = await prisma.bookCopy.findUnique({
            where : {copyCode: copyCode}
        })

        // Verify if book exists in the database
        if (bookId !== book?.id) {
            console.log('This copy does not refer to any book')
            return res.status(400).json({message: "This copy does not refer to any book."})
        }

        // Verify if a copy of the book already exists. If not create copy
        if (copyCode === bookCopy?.copyCode ){
            console.log('This copy already exists')
            return res.status(400).json({message: "This copy already exists"})
        } else {
            const createBookCopy = await prisma.bookCopy.create({
                data: {
                    copyCode: copyCode,
                    bookId: book?.id,
                    ISBN: ISBN,
                    pages: pages 
                }
            })
            console.log(`${createBookCopy?.copyCode} added to Books`)
            res.status(201).json({message: `${createBookCopy?.copyCode} added successfully`})
        }
    } catch (error) {
        console.log("Error adding Author", error)
        res.status(404).json({message: "Internal server error"})
    }
}

/*
| Title                                             | Author's First Name | Author's Last Name | Author's Email | Number of Pages | ISBN          |
|---------------------------------------------------|----------------------|--------------------|----------------|-----------------|---------------|
| To Kill a Mockingbird                             | Harper               | Lee                | n/a            | 336             | 978-0061120084|
| 1984                                              | George               | Orwell             | n/a            | 328             | 978-0451524935|
| The Great Gatsby                                  | Francis Scott        | Fitzgerald         | n/a            | 180             | 978-0743273565|
| Harry Potter and the Sorcerer's Stone             | Joanne               | Rowling            | n/a            | 320             | 978-0590353427|
| Pride and Prejudice                               | Jane                 | Austen             | n/a            | 416             | 978-0141439518|
| The Catcher in the Rye                            | Jerome David         | Salinger           | n/a            | 224             | 978-0316769488|
| The Lord of the Rings: The Fellowship of the Ring | John                 | Tolkien            | n/a            | 432             | 978-0618346257|
| The Hobbit                                        | John                 | Tolkien            | n/a            | 320             | 978-0547928227|
| The Da Vinci Code                                 | Dan                  | Brown              | n/a            | 624             | 978-0307474278|

*/