import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL no está configurada");
  // Driver serverless de Neon: arranca rápido en funciones de Vercel.
  return new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
}

/** Cliente único (en dev se reutiliza entre recargas en caliente). */
export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) globalForPrisma.prisma = createClient();
  return globalForPrisma.prisma;
}

/** true si hay base de datos configurada (la página funciona sin ella). */
export const hasDatabase = () => Boolean(process.env.DATABASE_URL);
