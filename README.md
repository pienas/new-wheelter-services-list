# Service provider list

This is an app for creating and managing a list of vehicle repair service providers.

Some of the features does not work, such as:

- Filtering
- Modifying service provider
- Removing service provider

## How do I deploy this?

Install local dependencies

```
yarn
```

Ensure the `.env` file has required environment variables:

```
DATABASE_URL=file:./db.sqlite

NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

NEXT_PUBLIC_ADMIN_USER_ID=
```

You can see example file at `.env.example`.

Run app in development mode:

```
yarn dev
```

## Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
