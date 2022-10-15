// src/server/router/index.ts
import superjson from 'superjson';

import { categoriesRouter } from './categories';
import { commentsRouter } from './comments';
import { createRouter } from './context';
import { protectedExampleRouter } from './protected-example-router';
import { servicesRouter } from './services';
import { usersRouter } from './users';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('services.', servicesRouter)
  .merge('categories.', categoriesRouter)
  .merge('comments.', commentsRouter)
  .merge('users.', usersRouter)
  .merge('auth.', protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
