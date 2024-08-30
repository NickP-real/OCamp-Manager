# O-Camp Manager

Web application for managing information in the Olympic camp

## Local DB

You can simply run `docker compose up` and connect to the database with these configurations

- host: `localhost`
- port: `5432`
- username: `admin`
- password: `password`
- db name: `ocamp`

### DB Migration

If you add new schema, first run `bun db:generate`

To migrate DB: `bun db:migrate`

## Developing

1. copy `.env.example` to `.env`
2. `bun install`
3. `bun dev`

## Building

To create a production version of your app:

```bash
bun build
```

You can preview the production build with `bun preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
