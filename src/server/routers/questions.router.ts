import { z } from 'zod';
import { createRouter } from '../createRouter';
import { createQuestionSchema } from '../schemas/question.schema.';
import * as trpc from '@trpc/server';

export const questionsRouter = createRouter()
  .query('get-all-my-question', {
    async resolve({ ctx }) {
      if (!ctx.token) return [];

      return await ctx.prisma.pollQuestion.findMany({
        where: {
          ownerToken: {
            equals: ctx.token,
          },
        },
      });
    },
  })
  .query('get-by-id', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const question = await ctx.prisma.pollQuestion.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!question) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'No Question...',
        });
      }

      return {
        question,
        isOwner: question.ownerToken === ctx.token,
      };
    },
  })
  .mutation('create', {
    input: createQuestionSchema,
    async resolve({ ctx, input }) {
      if (!ctx.token)
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'No Token...',
        });

      return await ctx.prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: [],
          ownerToken: ctx.token,
        },
      });
    },
  });
