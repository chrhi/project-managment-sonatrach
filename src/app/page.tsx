import { db } from "@/lib/db";
import { todo } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { addTodo } from "./actions";

// oh yeah, this is the future
export const runtime = "edge";

export default async function Home() {
  const todos = await db.select().from(todo);

  const RemoveTodo = async () => {
    "use server";

    await db.delete(todo).where(eq(todo.id, 9888));
  };

  return (
    <div className="w-full h-screen bg-white flex  flex-col items-center justify-center">
      <div className="w-[400px] overflow-y-auto h-[400px]  ">
        <h2>My todo list</h2>
        {todos.map((item) => {
          return <h3 key={item?.id}>{item?.content}</h3>;
        })}
      </div>
      <form action={addTodo} className="flex gap-x-4 ">
        <input name="input" className="p-4 border focus:outline-none" />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 "
        >
          post
        </button>
      </form>
    </div>
  );
}
