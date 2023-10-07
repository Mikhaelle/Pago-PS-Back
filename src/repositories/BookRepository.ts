import { ConflictError, InternalServerError, NotFoundError } from "../errors/CustomErrors";
import { Book } from "../models/Book";

class BookRepository {
  public getAllBooks = async (): Promise<any> => {
    try {
      const books = await Book.findAll();
      return books;
    } catch (error) {
      throw new InternalServerError("Error fetching books");
    }
  }

  public createBook = async (title: string, author: string, description: string): Promise<void> => {
    try {
      const existed_book = await Book.findOne({
        where: {
          title: title
        }
      });
      if (existed_book) {
        throw new ConflictError("Book already exist")
      } else {
        await Book.create({ title, author, description });
      }
    } catch (error) {
      if (error instanceof ConflictError) {
        throw error
      } else {
        throw new InternalServerError("Error updating book");
      }
    }
  }

  public updateBook = async (title: string, author: string, description: string): Promise<void> => {
    try {
      const new_book = await Book.findOne({
        where: {
          title: title
        }
      });
      if (!new_book) {
        console.log("aqui2")
        throw new NotFoundError("Book not found!");
      }
      new_book.title = title;
      new_book.author = author;
      new_book.description = description;
      await new_book.save();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      } else {
        throw new InternalServerError("Error updating book");
      }
    }
  }

  public deleteBook = async (id: string): Promise<void> => {
    try {
      const book = await Book.findOne({
        where: {
          id: id
        }
      });
      if (!book) {
        console.log("aqui")
        throw new NotFoundError("Book not found!");
      }
      await book.destroy();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      } else {
        throw new InternalServerError("Error updating book");
      }
    }
  }

}

export default BookRepository;