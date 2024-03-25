import {prisma} from '../../db/prismas'

/*========================= Author Services ============================*/

// ADD AUTHOR
export const addAuthorService = async (firstName: string, lastName: string, email: string) => {
    try {
        const author = await prisma.author.findUnique({
            where: { email: email }
        });
        if (author) {
            console.log('Author already exists');
            return { code: 400, data: "Author already exists" };
        } else {
            const createAuthor = await prisma.author.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }
            });
            console.log(`${firstName} ${lastName} added to Authors`);
            return { code: 201, data: `${firstName} ${lastName} added successfully` };
        }
    } catch (error) {
        console.log("Error adding Author", error);
        return { code: 500, data: "Internal server error" };
    }
};

// GET ALL AUTHORS
export const getAllAuthorsService = async () => {
    try {
        const authors = await prisma.author.findMany();
        return { code: 200, data: authors };
    } catch (error) {
        console.error("Error fetching all authors:", error);
        return { code: 500, data: "Internal server error" };
    }
};

//  GET AUTHOR BY ID
export const getAuthorByIdService = async (id: string) => {
    try {
        const author = await prisma.author.findUnique({
            where: { id: id }
        });
        if (!author) {
            return { code: 404, data: "Author not found" };
        }
        return { code: 200, data: author };
    } catch (error) {
        console.error("Error fetching author by id:", error);
        return { code: 500, data: "Internal server error" };
    }
};

// GET AUTHOR BY EMAIL
export const getAuthorByEmailService = async (email: string) => {
    try {
        const author = await prisma.author.findFirst({
            where: { email: email }
        });
        if (!author) {
            return { code: 404, data: "Author not found" };
        }
        return { code: 200, data: author };
    } catch (error) {
        console.error("Error fetching author by email:", error);
        return { code: 500, data: "Internal server error" };
    }
};
// GET AUTHOR BY FIRST NAME
export const getAuthorByFirstNameService = async (firstName: string) => {
    try {
        const authors = await prisma.author.findMany({
            where: { firstName: firstName }
        });
        if (authors.length === 0) {
            return { code: 404, data: "Authors not found" };
        }
        return { code: 200, data: authors };
    } catch (error) {
        console.error("Error fetching authors by first name:", error);
        return { code: 500, data: "Internal server error" };
    }
};

// GET AUTHOR BY LAST NAME
export const getAuthorByLastNameService = async (lastName: string) => {
    try {
        const authors = await prisma.author.findMany({
            where: { lastName: lastName }
        });
        if (authors.length === 0) {
            return { code: 404, message: "Authors not found" };
        }
        return { code: 200, data: authors };
    } catch (error) {
        console.error("Error fetching authors by last name:", error);
        return { code: 500, data: "Internal server error" };
    }
};

// UPDATE AUTHOR
export const updateAuthorService = async (id: string, firstName: string, lastName: string, email: string) => {
    try {
        const author = await prisma.author.findUnique({
            where: { id: id }
        });

        if (!author) {
            return { code: 404, data: "Author not found" };
        }

        await prisma.author.update({
            where: { id: id },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        });

        console.log("Update successful");
        return { code: 200, data: "Author details updated successfully" };
    } catch (error) {
        console.error("Error updating Author", error);
        return { code: 500, data: "Internal server error" };
    }
};

// DELETE AUTHOR
export const deleteAuthorService = async (id: string) => {
    try {
        await prisma.author.delete({
            where: { id: id }
        });
        return { code: 200, data: "Author deleted successfully" };
    } catch (error) {
        console.error("Error deleting author:", error);
        return { code: 500, data: "Internal server error" };
    }
};