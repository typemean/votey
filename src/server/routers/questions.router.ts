import { z } from 'zod';
import { createRouter } from '../createRouter';

export const questionsRouter = createRouter().query('get-all', {
  async resolve({ ctx }) {
    return await ctx.prisma.pollQuestion.findMany();
  },
});
