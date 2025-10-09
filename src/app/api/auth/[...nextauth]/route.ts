import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Invalid email or password.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  pages: {
    signIn: "/auth/signin", // Customize your sign-in page if necessary
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.avatar = user.avatar;
      } else if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: Number(token.id) },
        });
        if (dbUser) {
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.phone = dbUser.phone;
          token.avatar = dbUser.avatar;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.phone = token.phone as string;
      session.user.avatar = token.avatar as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your_secret_key",
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
