# Svelte Template

Full-Stack Template base on Bun.

Used:

- Build Tool: [Vite](https://vite.dev/)
- SSR: [SelteKit](https://svelte.dev/)
- Type checking: [TypeScript](https://www.typescriptlang.org/)
- Formatter: [Prettier](https://prettier.io/)
- Linter: [ESLint](https://eslint.org/)
- Unit testing: [Vitest](https://vitest.dev/)
- Component testing: [Playwright](https://playwright.dev)
- CSS framework: [tailwindcss](https://tailwindcss.com), [DaisyUI](https://daisyui.com)
- sveltekit-adapter: [node](https://svelte.dev/docs/kit/adapter-node)
- Icon: [@iconify-json/mdi](https://icon-sets.iconify.design/mdi/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- ORM: NONE! Writing the raw SQL by [Bun.sql](https://bun.sh/docs/api/sql)
- DB migration: [node-pg-migrate](https://salsita.github.io/node-pg-migrate/)

# Preview

## Theme

![theme](screenshot/theme.png)

# Usage

```sh
bun c https://github.com/dvorakchen/svelte-template <your-app-name>
cd <your-app-name>
```

Create the `.env` file at root of project and set:

```
# database url of PostgreSQL
DATABASE_URL=postgres://username:password@localhost:5432/database
JWT_KEY=<private key for JWT>
```

## Dev

```sh

# set your database first
bun migrate:up

bun --bun dev --open
```

## Test

run the `unit test` and `component test`

The `Component Test` should run in the client mode, the test file should named `<***>.svelte.{spec,test}.{ts,js}`.

The `Unit Test` should run in the node mode, the test file should named `<***>.{spec,test}.{ts,js}`.

```sh
bun run test
```

## Build

```sh
bun --bun run build
# output build/
cd build
# migrate database, you need to set the environment variable `DATABASE_URL` first,
# just set the .env file at the root of project
bunx node-pg-migrate up

bun ./build/index.js
```

## Database Migration

**NOTI: PostgreSQL only!**

the migration tool using node-pg-migrate, see the [document](https://salsita.github.io/node-pg-migrate/getting-started).

setting the environment variable DATABASE_URL.

```
# .env
DATABASE_URL=postgres://postgres@localhost/database
```

create migration file:

```sh
bun migrate:create <migration_name> -j ts
```

edit your migration file and run:

```sh
bun migrate:up
```

to apply the migartion
