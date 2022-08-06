import { z } from 'zod';
import { createRouter } from '../createRouter';

export const questionsRouter = createRouter()
  .query('get-all', {
    async resolve({ ctx }) {
      return await ctx.prisma.pollQuestion.findMany();
    },
  })
  .mutation('create', {
    input: z.object({
      question: z.string().min(5).max(600),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.pollQuestion.create({
        data: {
          question: input.question,
        },
      });
    },
  });
