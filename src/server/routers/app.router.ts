import { createRouter } from '../createRouter';
import { questionsRouter } from './questions.router';

export const appRouter = createRouter().merge('questions.', questionsRouter);

export type AppRouter = typeof appRouter;
