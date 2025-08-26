# Svelte Template

Used:

- Build Tool: [Vite](https://vite.dev/)
- SSR: [SelteKit](https://svelte.dev/)
- Type checking: [TypeScript](https://www.typescriptlang.org/)
- Formatter: [Prettier](https://prettier.io/)
- Linter: [ESLint](https://eslint.org/)
- Unit testing: [vitest](https://vitest.dev/)
- Browser testing: [Playwright](https://playwright.dev)
- CSS framework: [tailwindcss](https://tailwindcss.com), [DaisyUI](https://daisyui.com)
- sveltekit-adapter: [node](https://svelte.dev/docs/kit/adapter-node)
- icon: [@iconify-json/mdi](https://icon-sets.iconify.design/mdi/)

# Preview

## Theme

![theme](screenshot/theme.png)

# Usage

```sh
bun c https://github.com/dvorakchen/svelte-template <your-app-name>
cd <your-app-name>
```

## Dev

```sh
bun --bun dev --open
```

## Teest

```sh
bun --bun run test
```

## Build

```sh
bun --bun run build
# output build/
cd build
bun --bun run start
```

