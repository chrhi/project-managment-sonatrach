import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          return null;
        }
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
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    redirect() {
      return "/private";
    },
    session({ token, session }) {
      if (token) {
        (session.user.id = token.id),
          (session.user.email = token.email),
          (session.user.name = token.name),
          (session.user.image = token.picture);
        (session.user.role = token.role),
          (session.user.firstName = token.firstName);
        (session.user.lastName = token.lastName),
          (session.user.role = token.role);
      }

      return session;
    },
    //@ts-ignore
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email as string,
        },
      });

      if (!dbUser) return token;
      return {
        ...token,
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        picture: dbUser.image,
        firstName: dbUser.name,
        lastName: dbUser.LastName,
        role: dbUser.role,
        userName: dbUser.UserName,
      };
    },
  },
};
