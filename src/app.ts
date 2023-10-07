
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Database from "./config/db"
import { Book } from "./model/Book";

const app = express();
dotenv.config();
const db = new Database();
db.sequelize?.sync();
app.use(express.json());

app.get("/healthcheck", (req: Request, res: Response) => {
  res.json({ status: 'UP' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

app.get("/v1/api/books", async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
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
})

app.post("/v1/api/book", async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const new_book = new Book();
    new_book.title = req.body.title;
    new_book.author = req.body.author;
    new_book.description = req.body.description;

    console.log(new_book.description)
    await Book.create({
      title: new_book.title,
      author: new_book.author,
      description: new_book.description
    });

    res.status(201).json({
      status: "Created!",
      message: "Successfully create a new book!"
    });

  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error!",
      message: "Internal Server Error!",
    });
  }
})

app.put("/v1/api/book", async (req: Request, res: Response) => {
  try {
    const new_book = await Book.findOne({
      where: {
        title: req.body.title
      }
    });
    if (!new_book) {
      throw new Error("Book not found!");
    }
    new_book.title = req.body.title;
    new_book.author = req.body.author;
    new_book.description = req.body.description;
    await new_book.save();
    res.status(200).json({
      status: "Ok!",
      message: "Successfully update book data!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error!",
      message: "Internal Server Error!",
    });
  }
})


app.delete("/v1/api/book", async (req: Request, res: Response) => {
  try {
    const title = req.query.title
    console.log(title)
    const book = await Book.findOne({
      where: {
        title: title
      }
    });
    if (!book) {
      throw new Error("Note not found!");
    }

    await book.destroy();
    res.status(200).json({
      status: "Ok!",
      message: "Successfully deleted book!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error!",
      message: "Internal Server Error!",
    });
  }
})