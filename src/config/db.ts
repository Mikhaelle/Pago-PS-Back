import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); 

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432")
    });
  }

  public async connectToDB() {
    try {
      await this.pool.connect();
      console.log("PostgreSQL Connection has been established successfully");
    } catch (err) {
      console.log("Unable to connect to the PostgreSQL database:", err);
    }
  }
}

export default Database;