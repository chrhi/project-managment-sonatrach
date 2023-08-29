"use server";

import { db } from "@/lib/db";
import { todo } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addTodo = async (e: FormData) => {
  "use server";

  await db.insert(todo).values({ content: e.get("input")?.toString() });
  revalidatePath("/");
};
