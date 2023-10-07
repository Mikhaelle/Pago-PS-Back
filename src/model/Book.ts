import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: Book.BOOK_TABLE_NAME,
})
export class Book extends Model {
  public static BOOK_TABLE_NAME = "book" as string;
  public static BOOK_ID = "id" as string;
  public static BOOK_TITLE = "title" as string;
  public static BOOK_AUTHOR = "author" as string;
  public static BOOK_DESCRIPTION = "description" as string;
  public static BOOK_AVAILABILITY = "availability" as string;


  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Book.BOOK_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Book.BOOK_TITLE,
  })
  title!: string;

  @Column({
    type: DataType.STRING(255),
    field: Book.BOOK_AUTHOR,
  })
  author!: string;

  @Column({
    type: DataType.STRING(255),
    field: Book.BOOK_DESCRIPTION,
  })
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Book.BOOK_AVAILABILITY,
  })
  availability!: boolean;
}