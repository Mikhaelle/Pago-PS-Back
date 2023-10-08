import BookRepository from '../BookRepository';
import { ConflictError, InternalServerError, NotFoundError } from '../../errors/CustomErrors';
import { Book } from '../../models/Book';

jest.mock('../../models/Book');

describe('BookRepository', () => {
    let bookRepository: BookRepository;

    beforeEach(() => {
        bookRepository = new BookRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBooks', () => {
        it('should return all books', async () => {
            (Book.findAll as jest.Mock).mockResolvedValue([{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }]);

            const result = await bookRepository.getAllBooks();

            expect(result).toEqual([{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }]);
        });

        it('should throw InternalServerError if an error occurs', async () => {
            (Book.findAll as jest.Mock).mockRejectedValue(new Error('Some error'));

            await expect(bookRepository.getAllBooks()).rejects.toThrow(InternalServerError);
        });
    });

    describe('createBook', () => {
        it('should create a book', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue(null);
            (Book.create as jest.Mock).mockResolvedValue({ id: 1, title: 'New Book' });
            await bookRepository.createBook('New Book', 'Author', 'Description');
            expect(Book.findOne).toHaveBeenCalledWith({ where: { title: 'New Book' } });
            expect(Book.create).toHaveBeenCalledWith({ title: 'New Book', author: 'Author', description: 'Description' });
        });

        it('should throw ConflictError if book already exists', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue({ id: 1, title: 'Existing Book' });
            await expect(
                bookRepository.createBook('Existing Book', 'Author', 'Description')
            ).rejects.toThrow(ConflictError);
        });

        it('should throw InternalServerError if an error occurs during create', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue(null);
            (Book.create as jest.Mock).mockRejectedValue(new Error('Some error'));
            await expect(
                bookRepository.createBook('New Book', 'Author', 'Description')
            ).rejects.toThrow(InternalServerError);
        });
    });

    describe('updateBook', () => {
        it('should update a book', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue({
                id: 1,
                title: 'Existing Book',
                author: 'Author',
                description: 'Description'
            });

            const saveMock = jest.fn().mockResolvedValue(undefined);
            const existingBook = {
                id: 1,
                title: 'Existing Book',
                author: 'Author',
                description: 'Description',
                save: saveMock,
            };

            (Book.findOne as jest.Mock).mockResolvedValue(existingBook);

            await bookRepository.updateBook('New Title', 'New Author', 'New Description');

            expect(Book.findOne).toHaveBeenCalledWith({ where: { title: 'New Title' } });
            expect(saveMock).toHaveBeenCalled();
            expect(existingBook.title).toBe('New Title');
            expect(existingBook.author).toBe('New Author');
            expect(existingBook.description).toBe('New Description');
        });

        it('should throw NotFoundError if book does not exist', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue(null);

            await expect(
                bookRepository.updateBook('New Title', 'New Author', 'New Description')
            ).rejects.toThrow(NotFoundError);
        });

        it('should throw InternalServerError if an error occurs during update', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue({
                id: 1,
                title: 'Existing Book',
                author: 'Author',
                description: 'Description'
            });

            const saveMock = jest.fn().mockRejectedValue(new Error('Some error'));
            const existingBook = {
                id: 1,
                title: 'Existing Book',
                author: 'Author',
                description: 'Description',
                save: saveMock,
            };

            (Book.findOne as jest.Mock).mockResolvedValue(existingBook);

            await expect(
                bookRepository.updateBook('New Title', 'New Author', 'New Description')
            ).rejects.toThrow(InternalServerError);
        });
    });

    describe('deleteBook', () => {
        it('should delete a book', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue({
                id: '1',
                title: 'Existing Book',
                author: 'Author',
                description: 'Description',
                destroy: jest.fn().mockResolvedValue(undefined),
            });

            await bookRepository.deleteBook('1');

            expect(Book.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(Book.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        });

        it('should throw NotFoundError if book does not exist', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue(null);
            await expect(bookRepository.deleteBook('1')).rejects.toThrow(NotFoundError);
        });

        it('should throw InternalServerError if an error occurs during delete', async () => {
            (Book.findOne as jest.Mock).mockResolvedValue({
                id: '1',
                title: 'Existing Book',
                author: 'Author',
                description: 'Description',
                destroy: jest.fn().mockRejectedValue(new Error('Some error')),
            });

            await expect(bookRepository.deleteBook('1')).rejects.toThrow(InternalServerError);
        });
    });
});