import { createProtectedRouter } from './context';

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedExampleRouter = createProtectedRouter().query(
  'getSession',
  {
    resolve: ({ ctx }) => ctx.session,
  },
);
