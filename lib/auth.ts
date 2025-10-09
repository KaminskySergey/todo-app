import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { cache } from "react";

export const auth = cache(() => getServerSession(authOptions))