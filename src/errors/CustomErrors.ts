class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Bad Request";
    }
}

class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Not Found";
    }
}


class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Conflict";
    }
}

class InternalServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Internal Server Error";
    }
}

export { BadRequestError, NotFoundError, ConflictError, InternalServerError };
