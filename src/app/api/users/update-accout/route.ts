import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { accountSchemaServer } from "@/lib/validations/user";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const session = await getServerSession(authOptions);

  if (!session?.user.id) throw new Error("unauthorized");

  const data = accountSchemaServer.parse(body);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image: data.imageUrl,
      name: data.username,
    },
  });
  return new Response("hi there");
}
