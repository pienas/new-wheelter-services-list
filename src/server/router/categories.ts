import { z } from 'zod';

import { createProtectedRouter } from './context';

export const categoriesRouter = createProtectedRouter()
  .query('getSession', {
    resolve: ({ ctx }) => ctx.session,
  })
  .query('getAll', {
    resolve: async ({ ctx }) => {
      const categories = await ctx.prisma.category.findMany();

      return { categories };
    },
  })
  .mutation('create', {
    input: z.object({ name: z.string() }),
    resolve: async ({ ctx, input }) => {
      const category = await ctx.prisma.category.create({
        data: input,
      });

      return { category };
    },
  });
