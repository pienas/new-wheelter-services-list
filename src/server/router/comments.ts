import { z } from 'zod';

import { createProtectedRouter } from './context';

export const commentsRouter = createProtectedRouter()
  .query('getSession', {
    resolve: ({ ctx }) => ctx.session,
  })
  .query('getAll', {
    resolve: async ({ ctx }) => {
      const comments = await ctx.prisma.comment.findMany();

      return { comments };
    },
  })
  .mutation('create', {
    input: z.object({
      text: z.string(),
      authorId: z.string(),
      serviceId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.create({
        data: input,
      });

      return { comment };
    },
  });
