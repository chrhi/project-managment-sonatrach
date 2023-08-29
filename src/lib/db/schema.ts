import { mysqlTable, serial, text, varchar, int } from "drizzle-orm/mysql-core";
import { type InferModel } from "drizzle-orm";
/**
 * This is a sample schema.
 * Replace this with your own schema and then run migrations.
 */

export const todo = mysqlTable("todo", {
  id: serial("id").primaryKey(),
  content: text("content"),
});

export type Todo = InferModel<typeof todo>;
