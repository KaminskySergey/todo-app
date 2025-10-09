import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
import { cache } from "react";

export const auth = cache(() => getServerSession(authOptions))