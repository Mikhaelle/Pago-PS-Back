import express from "express";
import dotenv from "dotenv";
import Database from "./config/db";
import bookRoutes from "./routes/BookRoutes";

const app = express();
dotenv.config();
const db = new Database();
db.sequelize?.sync();
app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.json({ status: 'UP' });
});

app.use(bookRoutes); 

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});