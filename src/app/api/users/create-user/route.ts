import { registerSchema } from "@/lib/validations/auth";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();

  const data = registerSchema.parse(body);

  // hash the password
  const hasedPassword = await bcrypt.hash(data.password, 10).catch((err) => {
    console.log(err);
    throw new Error("something went wrong ");
  });

  await db.insert(users).values({
    id: uuidv4(),
    email: data.email,
    name: data.firstName,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU",
    emailVerified: new Date(),
    password: hasedPassword,
  });

  return new Response(
    JSON.stringify({
      status: "user has been created",
    })
  );
}
