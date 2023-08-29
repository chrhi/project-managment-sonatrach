import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "test@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials?.email);
        console.log(credentials?.password);
        const user = await prisma.user
          .findFirstOrThrow({
            where: {
              email: credentials?.email,
            },
          })
          .catch((error) => {
            console.log(error);
            throw new Error(" email is not currect");
          });
        if (!user.password) throw new Error("user dont have password");
        //   see if user password is currect

        const response = await bcrypt
          .compare(credentials?.password as string, user?.password)
          .catch((errpr) => {
            throw new Error(" password is not currect");
          });

        if (response) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
};
