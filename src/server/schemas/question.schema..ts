import { z } from 'zod';

export const createQuestionSchema = z.object({
  question: z.string().min(5).max(600),
});

export type CreateQustionInput = z.TypeOf<typeof createQuestionSchema>;
