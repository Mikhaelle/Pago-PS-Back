import { Router } from "express";
import { check } from "express-validator";

import BookController from "../controllers/BookController";
import BookRepository from "../repositories/BookRepository";

const router = Router();
const bookRepository = new BookRepository();
const bookController = new BookController(bookRepository);

router.get("/v1/api/books", bookController.getAllBooks);

router.post("/v1/api/book", [
    check("title").notEmpty().isString(),
    check("author").notEmpty().isString(),
    check("description").notEmpty().isString(),
], bookController.createBook);

router.put("/v1/api/book", [
    check("title").notEmpty().isString(),
    check("author").notEmpty().isString(),
    check("description").notEmpty().isString(),
], bookController.updateBook);

router.delete("/v1/api/book/:id", bookController.deleteBook);

export default router;