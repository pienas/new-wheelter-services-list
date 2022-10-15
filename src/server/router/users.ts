import { z } from 'zod';

import { createProtectedRouter } from './context';

export const usersRouter = createProtectedRouter()
  .query('getAll', {
    resolve: async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany();

      return { users };
    },
  })
  .query('getUsersName', {
    input: z.object({ id: z.string() }),
    resolve: async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: { name: true },
      });

      return { user };
    },
  });
