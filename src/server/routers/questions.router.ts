import { z } from 'zod';
import { createRouter } from '../createRouter';
import { createQuestionSchema } from '../schemas/question.schema.';
import * as trpc from '@trpc/server';

export const questionsRouter = createRouter()
  .query('get-all', {
    async resolve({ ctx }) {
      return await ctx.prisma.pollQuestion.findMany();
    },
  })
  .query('get-by-id', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.pollQuestion.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!result) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'No Question...',
        });
      }

      return result;
    },
  })
  .mutation('create', {
    input: createQuestionSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.pollQuestion.create({
        data: {
          question: input.question,
        },
      });
    },
  });
