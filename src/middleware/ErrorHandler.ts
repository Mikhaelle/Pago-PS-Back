import { Request, Response, NextFunction } from "express";
import { BadRequestError, ConflictError, NotFoundError } from "../errors/CustomErrors";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BadRequestError) {
        res.status(400).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
        res.status(404).json({ error: err.message });
    } else if (err instanceof ConflictError) {
        res.status(409).json({ error: err.message });
    } else {
        res.status(500).json({
            status: "Internal Server Error",
            message: "An error occurred",
            error: err.message
        });
    }


}

export default errorHandler;