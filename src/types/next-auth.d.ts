import type { NextAuth } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; 
    name: string;
    email: string;
    // firstName: string;
    // lastName: string;
    // role: string;
    image?: string | null;
    profileId?: number | null;
  }

  interface Session {
    user: User;
  }
}