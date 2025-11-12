import jwt from "jsonwebtoken";

export function generateChangeEmailToken(email: string) {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ email }, secret, { expiresIn: "15m" });
}


export function verifyChangeEmailToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      return payload as { email: string };
    } catch {
      return null;
    }
  }