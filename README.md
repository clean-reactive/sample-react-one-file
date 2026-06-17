# Clean Reactive Architecture — React One-File Sample

A minimal sample that demonstrates [Clean Reactive
Architecture](https://github.com/clean-reactive/documentation/blob/main/docs/architecture.md)
implemented in a single React component.

All architectural units — gateway interface, gateway implementations, entities,
presenter, controller, and user interface — live in
[`src/App.tsx`](./src/App.tsx) with inline comments identifying each unit. The
intent is to show the architecture clearly, without the file structure of a full
project getting in the way.

## Getting started

Install dependencies:

```sh
npm ci
```

Start the development server:

```sh
npm run dev
```

## Architecture mapping

The table below shows how each unit from the Clean Reactive Architecture diagram
maps to `App.tsx`.

| Architectural unit | Implementation |
|---|---|
| Gateway interface | `CounterGateway` interface |
| Gateway implementation | `inMemoryCounterGateway`, `remoteCounterGateway` |
| Entities | `count` (`useState`) |
| Presenter | `countValue`, `countStatus` |
| Controller | `onIncrementButtonClick`, `onDecrementButtonClick`, `onAppMount` |
| User interface | JSX returned from `App` |

## Tech stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Further reading

- [Clean Reactive Architecture](https://github.com/clean-reactive/documentation/blob/main/docs/architecture.md)
- [Development Methodology](https://github.com/clean-reactive/documentation/blob/main/docs/methodology.md)
