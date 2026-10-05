# Clean Reactive Architecture — React One-File Sample

A minimal sample that demonstrates [Clean Reactive
Architecture](https://github.com/clean-reactive/documentation/blob/main/docs/architecture.md)
implemented in a single React component.

All architectural units — the external resource, gateway, entities,
transaction, use case, presenter, controller, and user interface — live in
[`src/App.tsx`](./src/App.tsx) with inline comments identifying each unit. The
intent is to show the architecture clearly, without the file structure of a full
project getting in the way.

> :bulb: **Reference implementation.** This sample keeps the architectural units in one React component so their responsibilities and boundaries are visible. This is a demonstration choice; the architecture does not require a one-file structure.

> :bulb: **Demo storage.** The sample stores the counter in memory during development and calls a backend service at `/api/counter` in production builds. The in-memory value resets on page reload; the backend implementation is not included. These two gateway branches are for demonstration purposes, to show how the gateway can work with different resources.

<details>
<summary><b>Watch the demo</b></summary>

<!-- Add the demo video link here. -->

</details>

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

| Architectural unit | Implementation                                                                   |
| ------------------ | -------------------------------------------------------------------------------- |
| External resource  | `inMemoryCounterResource` (`increment`, `decrement`, `getCount`), `/api/counter` |
| Gateway            | in-memory and remote branches inside each use case                               |
| Gateway interface  | `newCount: number` - the value every gateway returns                             |
| Entities           | `count` (`useState`)                                                             |
| Transaction        | `setCount(newCount)`                                                             |
| Use case           | body of each controller handler                                                  |
| Presenter          | `countValue`, `countStatus`                                                      |
| Controller         | `onIncrementButtonClick`, `onDecrementButtonClick`, `onAppMount`                 |
| User interface     | JSX returned from `App`                                                          |

## Key design decisions

These decisions are specific to this sample, guided by its demonstration goals
and the capabilities of React. The architecture defines responsibilities and
boundaries without prescribing specific technical solutions.

**Single-file composition.** All units are composed in `App.tsx` so the
reactive flow is easy to follow. A production application may distribute these
units across files when concrete needs justify it.

**Component function as composition root.** `App` composes the inlined units,
including the User Interface unit, which is implemented with JSX.

## Tech stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Further reading

- [Clean Reactive Architecture](https://github.com/clean-reactive/documentation/blob/main/docs/architecture.md)
- [Development Methodology](https://github.com/clean-reactive/documentation/blob/main/docs/methodology.md)

## License

This repository is licensed under the [MIT License](./LICENSE).

Third-party dependencies and assets retain their own licenses and notices.
