import express from "express";
import dotenv from "dotenv";
import Database from "./config/db";
import bookRoutes from "./routes/BookRoutes";
import errorHandler from "./middleware/ErrorHandler";

dotenv.config();

const app = express();
app.use(express.json());

const db = new Database();
db.sequelize?.sync();

app.use(bookRoutes); 

app.get("/healthcheck", (req, res) => {
  res.json({ status: "UP" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

app.use(errorHandler);