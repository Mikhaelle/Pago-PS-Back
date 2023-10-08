import { Request, Response, NextFunction } from "express";
import BookController from "../BookController";
import BookRepository from "../../repositories/BookRepository";
import { BadRequestError } from "../../errors/CustomErrors";
const { validationResult } = require('express-validator');

jest.mock("../../repositories/BookRepository");
jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: () => true,
    array: () => [],
  })),
}));

describe("BookController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;
  let bookRepository: any


  beforeEach(() => {
    mockRequest = {
      body: {
        title: "Test Title",
        author: "Test Author",
        description: "Test Description",
      }
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNextFunction = jest.fn();
    bookRepository = new BookRepository() as jest.Mocked<BookRepository>;
  });

  afterAll(() => {
    jest.clearAllMocks(); 
  });

  describe("getAllBooks", () => {
    it("should return all books", async () => {
      const books = [
        {
          title: "Book 1",
          author: "Author 1",
          description: "Description 1",
        },
        {
          title: "Book 2",
          author: "Author 2",
          description: "Description 2",
        },
      ];
      const mockGetAllBooks = jest.fn().mockResolvedValueOnce(books);
      bookRepository.getAllBooks = mockGetAllBooks;

      const controller = new BookController(bookRepository);

      await controller.getAllBooks(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Ok!",
        message: "Successfully fetched all books data!",
        data: books,
      });
    });

    it("should handle errors", async () => {
      const mockError = new Error("An error occurred");
      const mockGetAllBooks = jest.fn().mockRejectedValueOnce(mockError);
      bookRepository.getAllBooks = mockGetAllBooks;

      const controller = new BookController(bookRepository);

      await controller.getAllBooks(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe("createBook", () => {
    it("should create a new book", async () => {
      const mockCreateBook = jest.fn();
      bookRepository.createBook = mockCreateBook;
      const controller = new BookController(bookRepository);

      await controller.createBook(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockCreateBook).toHaveBeenCalledWith("Test Title", "Test Author", "Test Description");
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Created!",
        message: "Successfully created a new book!",
      });
    });

    it("should return bad request error for wrong entry", async () => {
      const mockError = new BadRequestError("Invalid Params");
      const mockCreateBook = jest.fn();
      bookRepository.createBook = mockCreateBook;

      const controller = new BookController(bookRepository);

      (validationResult as jest.Mock).mockReturnValueOnce({
        isEmpty: jest.fn().mockReturnValue(false),
        array: jest.fn().mockReturnValue(['error']),
      });

      await controller.createBook(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);

    });

    it("should handle errors", async () => {
      const mockError = new Error("An error occurred");
      const mockCreateBook = jest.fn().mockRejectedValueOnce(mockError);
      bookRepository.createBook = mockCreateBook;

      const controller = new BookController(bookRepository);

      await controller.createBook(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });

  });

  describe("updateBook", () => {
    it("should update new book", async () => {
      const mockUpdateBook = jest.fn();
      bookRepository.updateBook = mockUpdateBook;
      const controller = new BookController(bookRepository);

      await controller.updateBook(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockUpdateBook).toHaveBeenCalledWith("Test Title", "Test Author", "Test Description");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Updated!",
        message: "Successfully updated book!",
      });
    });

    it("should return bad request error for wrong entry", async () => {
      const mockError = new BadRequestError("Invalid Params");
      const mockUpdateBook = jest.fn();
      bookRepository.updateBook = mockUpdateBook;

      const controller = new BookController(bookRepository);

      (validationResult as jest.Mock).mockReturnValueOnce({
        isEmpty: jest.fn().mockReturnValue(false),
        array: jest.fn().mockReturnValue(['error']),
      });

      await controller.updateBook(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);

    });

    it("should handle errors", async () => {
      const mockError = new Error("An error occurred");
      const mockUpdateBook = jest.fn().mockRejectedValueOnce(mockError);
      bookRepository.updateBook = mockUpdateBook;

      const controller = new BookController(bookRepository);

      await controller.updateBook(mockRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });

  });

  describe("deleteBook", () => {
    it("should delete book", async () => {
      const mockDelRequest = {
        params: {
          id: '1'
        }
      } as Partial<Request>;

      const mockDeleteBook = jest.fn();
      bookRepository.deleteBook = mockDeleteBook;
      const controller = new BookController(bookRepository);

      await controller.deleteBook(mockDelRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockDeleteBook).toHaveBeenCalledWith("1");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Deleted!",
        message: "Successfully deleted book!",
      });
    });

    it("should return bad request error for wrong entry", async () => {
      const mockDelRequest = {
        params: {
          id: 'wrong'
        }
      } as Partial<Request>;
      const mockError = new BadRequestError("Invalid Params");
      const mockDeleteBook = jest.fn();
      bookRepository.deleteBook = mockDeleteBook;

      const controller = new BookController(bookRepository);

      await controller.deleteBook(mockDelRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);

    });

    it("should handle errors", async () => {
      const mockDelRequest = {
        params: {
          id: '1'
        }
      } as Partial<Request>;
      const mockError = new Error("An error occurred");
      const mockDeleteBook = jest.fn().mockRejectedValueOnce(mockError);
      bookRepository.deleteBook = mockDeleteBook;

      const controller = new BookController(bookRepository);

      await controller.deleteBook(mockDelRequest as Request, mockResponse as Response, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });

  });

});