import { User } from "@prisma/client";
import { type } from "os";

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string | null;
  updatedAt: string | null;
  emailVerified: string | null;
};
