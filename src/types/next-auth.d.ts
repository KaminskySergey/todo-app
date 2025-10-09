import type { NextAuth } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number; 
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
    phone?: string | null;
    profileId?: number | null;
  }

  interface Session {
    user: User;
  }
}