import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

// this code is give by ChatGPT
// import { PrismaClient } from "@prisma/client";

// declare global {
//   // Allow global `prisma` reuse in development
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

// export const db =
//   global.prisma ||
//   new PrismaClient({
//     log: ["query", "info", "warn", "error"],
//   });

// if (process.env.NODE_ENV !== "production") global.prisma = db;
