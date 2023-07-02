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
    input: z.object({
      label: z.string(),
      value: z.string(),
      serviceId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const category = await ctx.prisma.category.create({
        data: {
          label: input.label,
          value: input.value,
          services: {
            connect: {
              id: input.serviceId,
            },
          },
        },
      });

      return { category };
    },
  })
  .mutation('assign', {
    input: z.object({ id: z.string(), serviceId: z.string() }),
    resolve: async ({ ctx, input }) => {
      const category = await ctx.prisma.category.update({
        where: { id: input.id },
        data: { services: { connect: { id: input.serviceId } } },
      });

      return { category };
    },
  });
