import { Request, Response } from "express";
import BookRepository from "../repositories/BookRepository";

class BookController {
    private bookRepository = new BookRepository();

    public getAllBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const books = await this.bookRepository.getAllBooks();
            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched all books data!",
                data: books,
            });
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            });
        }
    }

    public createBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, author, description } = req.body;
            await this.bookRepository.createBook(title, author, description);
            res.status(201).json({
                status: "Created!",
                message: "Successfully created a new book!",
            });
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            });
        }
    }

    public updateBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, author, description } = req.body;
            await this.bookRepository.updateBook(title, author, description);
            res.status(200).json({
                status: "Updated!",
                message: "Successfully updated book!",
            });
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            });
        }
    }

    public deleteBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title } = req.query;
            if (typeof title === 'string') {
                await this.bookRepository.deleteBook(title);
                res.status(200).json({
                    status: "Deleted!",
                    message: "Successfully deleted book!",
                });
            } else {
                throw new Error('Invalid title parameter');
            }
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            });
        }
    }
}

export default BookController;