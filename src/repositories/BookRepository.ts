import { Book } from "../models/Book";

class BookRepository {
  public getAllBooks = async (): Promise<any> => {
    return await Book.findAll();
  }

  public createBook = async (title: string, author: string, description: string): Promise<void> => {
    await Book.create({ title, author, description });
  }

  public updateBook = async (title: string, author: string, description: string): Promise<void> => {
    const new_book = await Book.findOne({
      where: {
        title: title
      }
    });
    if (!new_book) {
      throw new Error("Book not found!");
    }
    new_book.title = title;
    new_book.author = author;
    new_book.description = description;
    await new_book.save();
  }

  public deleteBook = async (title: string): Promise<void> => {
    const book = await Book.findOne({
      where: {
        title: title
      }
    });
    console.log(book)
    if (!book) {
      throw new Error("Note not found!");
    }
    await book.destroy();
  }

}

export default BookRepository;