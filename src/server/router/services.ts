import { z } from 'zod';

import { ServiceForm } from 'types';

import { createProtectedRouter } from './context';

export const servicesRouter = createProtectedRouter()
  .query('getSession', {
    resolve: ({ ctx }) => ctx.session,
  })
  .query('getAll', {
    resolve: async ({ ctx }) => {
      const services = await ctx.prisma.service.findMany({
        include: {
          _count: {
            select: {
              comments: true,
              categories: true,
            },
          },
        },
      });

      return { services };
    },
  })
  .query('getOne', {
    input: z.object({ id: z.string() }),
    resolve: async ({ ctx, input }) => {
      const service = await ctx.prisma.service.findUnique({
        where: { id: input.id },
      });

      return { service };
    },
  })
  .mutation('create', {
    input: ServiceForm,
    resolve: async ({ ctx, input }) => {
      const service = await ctx.prisma.service.create({
        data: input,
      });

      return { service };
    },
  })
  .mutation('assign', {
    input: z.object({ id: z.string(), assignedToId: z.string() }),
    resolve: async ({ ctx, input }) => {
      const service = await ctx.prisma.service.update({
        where: { id: input.id },
        data: { assignedToId: input.assignedToId },
      });

      return { service };
    },
  });
