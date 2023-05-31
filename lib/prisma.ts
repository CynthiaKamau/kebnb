import { GraphQLContext } from '@/app/api/graphql/route';
import { PrismaClient, User } from '@prisma/client'
import { FastifyRequest } from 'fastify';
import { authenticatedUser } from './auth';


const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
  currentUser: User | null;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })


// export async function contextFactory(request: FastifyRequest): Promise<GraphQLContext> {
    // return {
      // currentUser: await authenticatedUser(prisma, request),
    // }
  // }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
