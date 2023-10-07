import { NextFunction, Request, Response } from "express";
import BookRepository from "../repositories/BookRepository";
import { validationResult } from "express-validator";
import { BadRequestError } from "../errors/CustomErrors"

interface BookDTO {
    title: string;
    author: string;
    description: string;
}

class BookController {
    constructor(private readonly bookRepository: BookRepository) { }

    public getAllBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const books = await this.bookRepository.getAllBooks();
            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched all books data!",
                data: books,
            });
        } catch (error) {
            next(error);
        }
    }


    public createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { title, author, description } = req.body as BookDTO;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequestError("Invalid Params");
            }

            await this.bookRepository.createBook(title, author, description);

            res.status(201).json({
                status: "Created!",
                message: "Successfully created a new book!",
            });
        } catch (error) {
            next(error);
        }
    }

    public updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { title, author, description } = req.body as BookDTO;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequestError("Invalid Params");
            }
            await this.bookRepository.updateBook(title, author, description);
            res.status(200).json({
                status: "Updated!",
                message: "Successfully updated book!",
            });
        } catch (error) {
            next(error);
        }
    }

    public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;

            if (!id || isNaN(parseInt(id, 10))) {
                throw new BadRequestError("Invalid Params");
            }

            await this.bookRepository.deleteBook(id);
            res.status(200).json({
                status: "Deleted!",
                message: "Successfully deleted book!",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default BookController;