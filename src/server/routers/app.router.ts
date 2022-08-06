import { z } from 'zod';
import { createRouter } from '../createRouter';

export const appRouter = createRouter()
  .query('hi', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ ctx, input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('getAllQuestions', {
    async resolve({ ctx }) {
      return await ctx.prisma.pollQuestion.findMany();
    },
  });

export type AppRouter = typeof appRouter;
