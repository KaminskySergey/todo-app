import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// const users = [
//   { id: "1", email: "test@example.com", password: "12345678", name: "Test User" }
// ]

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }

        return {
          id: user.id,
          name: user.name ?? "",
          email: user.email ?? "",
          image: user.image ?? null,
        } as User;
      },
      // async authorize(credentials) {
      //   const user = users.find(
      //     u => u.email === credentials?.email && u.password === credentials?.password
      //   )
      //   if (user) {
      //     return { id: user.id, name: user.name, email: user.email }
      //   }
      //   return null
      // }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        // Check if user exists
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const [firstName, ...lastNameParts] = (user.name || "").split(" ");
          const lastName = lastNameParts.join(" ");
          existingUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              profile: {
                create: {
                  firstName,
                  lastName,
                },
              },
            },
          });
        }

        // Replace `user` with db user to save id etc.
        user.id = existingUser.id;
        user.name = existingUser.name as string;
        user.email = existingUser.email as string;
        user.image = existingUser.image;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      } else if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: String(token.id) },
        });
        if (dbUser) {
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your_secret_key",
};
