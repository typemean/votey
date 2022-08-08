import { z } from 'zod';
import { createRouter } from '../createRouter';
import { createQuestionSchema } from '../schemas/question.schema.';

export const questionsRouter = createRouter()
  .query('get-all', {
    async resolve({ ctx }) {
      return await ctx.prisma.pollQuestion.findMany();
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
