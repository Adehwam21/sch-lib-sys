export interface CreateBook {
    title: string;
    authorId: string;
    authorFirstName: string;
    authorLastName: string;
}

export interface CreateBookCopy {
    bookId: string;
    copyCode: number;
    ISBN: string;
    pages: number;
}