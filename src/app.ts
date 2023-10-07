
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db"

const app = express();
dotenv.config(); 
connectToDB();

app.get("/healthcheck", (req: Request, res: Response) => {
  res.json({ status: 'UP' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});