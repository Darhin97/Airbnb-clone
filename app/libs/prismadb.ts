import { PrismaClient } from "@prisma/client";

//nextjs hot reloading creates alot of prismaclient  instance
//assign prisma client to a globalthis  which is not affected by hot reload

// global definition of prisma
declare global {
  var prisma: PrismaClient | undefined;
}

const client = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = client;

export default client;
