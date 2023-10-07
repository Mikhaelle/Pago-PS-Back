import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Book } from "../model/Book";
dotenv.config();


class Database {
  public sequelize: Sequelize | undefined;


  private POSTGRES_DB = process.env.DB_NAME as string;
  private POSTGRES_HOST = process.env.DB_HOST as string;
  private POSTGRES_PORT = parseInt(process.env.DB_PORT || "5432") as unknown as number;
  private POSTGRES_USER = process.env.DB_USER as unknown as string;
  private POSTGRES_PASSWORD = process.env.DB_PASSWORD as unknown as string;

  constructor() {
    this.connectToPostgreSQL();
  }


  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
      models:[Book]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "PostgreSQL Connection has been established successfully"
        );
      })
      .catch((err) => {
        console.error("Unable to connect to the PostgreSQL database:", err);
      });
  }
}

export default Database;