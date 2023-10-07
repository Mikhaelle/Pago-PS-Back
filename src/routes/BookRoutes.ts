import { Router } from "express";
import BookController from "../controllers/BookController";

const router = Router();
const bookController = new BookController();

router.get("/v1/api/books", bookController.getAllBooks);
router.post("/v1/api/book", bookController.createBook);
router.put("/v1/api/book", bookController.updateBook);
router.delete("/v1/api/book", bookController.deleteBook);

export default router;