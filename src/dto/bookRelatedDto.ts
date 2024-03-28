export interface CreateBook {
    title: string;
    authorId: string;
    authorFirstName: string;
    authorLastName: string;
    isbn: string
}

export interface CreateBookCopy {
    bookId: string;
    copyCode: number;
    ISBN: string;
    pages: string;
}