# Admin Panel UI

A Vue 3 + TypeScript single-page app that serves as the admin panel for a
Laravel-backed blog platform. It manages posts, categories, tags, users,
comments, and Stripe-based billing/subscriptions behind a token-authenticated
dashboard.

## Stack

- [Vue 3](https://vuejs.org/) — Composition API, `<script setup lang="ts">` everywhere
- TypeScript (strict mode)
- [Pinia](https://pinia.vuejs.org/) — single store (`auth`)
- [Vue Router 4](https://router.vuejs.org/) — auth-aware navigation guard
- [`ofetch`](https://github.com/unjs/ofetch) — wrapped in a typed `StandardClient`
- [`@vueuse/core`](https://vueuse.org/) — `useStorage` for token/user persistence
- [Vite](https://vitejs.dev/) — dev server and build
- `lodash-es`

No test runner, linter, or CSS framework is configured; styling is plain
scoped `<style>` per component.

## Prerequisites

- Node.js 20+ (see `docker/node/Dockerfile` for the pinned version used in Docker)
- A running instance of the companion Laravel API, exposing `/api/admin/*`
  endpoints and Sanctum token auth

## Getting started

```bash
npm install
echo "VITE_SERVER_URL=http://localhost:8000" > .env   # point at your Laravel API
npm run dev
```

The dev server starts on `http://localhost:5173`.

### Using Docker instead

`docker-compose.yml` builds a Node image from `docker/node/Dockerfile` and runs
`npm run dev -- --host 0.0.0.0` inside it:

```bash
docker compose up
```

It mounts the repo into the container, reads the same `.env` file, and
exposes the app on `VITE_PORT` (default `5173`).

## Environment variables

| Variable          | Description                                                       |
|--------------------|---------------------------------------------------------------------|
| `VITE_SERVER_URL`  | Base URL of the Laravel admin API (e.g. `http://localhost:8000`)  |

Docker Compose additionally reads `COMPOSE_PROJECT_NAME`, `NODE_VERSION`,
`NPM_VERSION`, `APP_UID`/`APP_GID`, and `VITE_PORT` from `.env`.

## Available scripts

| Command           | Description                                                  |
|--------------------|----------------------------------------------------------------|
| `npm run dev`      | Start the Vite dev server                                     |
| `npm run build`    | Type-check (`vue-tsc`) then build for production to `dist/`   |
| `npm run preview`  | Preview the production build locally                          |

There is no automated test suite or linter configured. To type-check without
a full build, run `npx vue-tsc --noEmit`.

## Features

### Authentication (`pages/auth/`, `stores/auth.ts`)

Email/password login, registration, forgot-password, and reset-password flows
against a Laravel Sanctum API. On success, the bearer token is persisted to
`localStorage` (key `auth_token_key`) and the user object under `user`; every
subsequent request is authenticated by `StandardClient` via an `Authorization:
Bearer` header. `router/authMiddleware.ts` redirects unauthenticated users to
`/login` and authenticated users away from `/login`.

### Dashboard (`pages/DashboardPage.vue`, `useDashboardStats.ts`)

Landing page showing post/category counts fetched in parallel from the
existing resource clients.

### Posts (`posts/`)

Full CRUD with title, slug, content, publish toggle, `published_at`, and a
`category` relation loaded into a dropdown. Each post also carries a
read-only `user` (author) relation from the backend.

### Categories (`categories/`)

Simplest resource: `name` + auto-generated `slug` (`utils/slugify.ts`).

### Tags (`tags/`)

Same shape as categories.

### Users (`users/`)

Name/email/role management with a role badge (`admin`/`user`) and an optional
password field on create/edit.

### Comments (`comments/`)

Moderation list for post comments.

### Billing (`billing/`, `useBilling.ts`, `BillingClient.ts`)

Stripe-backed subscription management:

- View current plan/card status (`BillingCard`: active, past-due, trial, card
  brand/last four)
- Subscribe or start a trial for a pricing plan (redirects to a Stripe
  Checkout URL)
- Open the Stripe customer billing portal
- Cancel the active subscription
- List and download invoices as PDF
- `SubscriptionSuccessPage.vue` is the Stripe Checkout success redirect target

Pricing plans are currently defined client-side in
`application/types/api/resources/Billing.ts` (`PRICING_PLANS`).

## Every CRUD resource follows one pattern

All of posts/categories/tags/users/comments are built the same way, wired
through a single generic composable, `composables/useResource.ts`, which owns:

- fetching the list (`fetchItems`)
- create/edit modal state (`isModalOpen`, `editingItem`, `form`)
- submit (`handleSubmit`) and delete (`handleDelete`), including a `confirm()`
  prompt before delete
- error handling, including a friendly message on `403` responses

Each resource composable (`usePosts`, `useCategories`, etc.) is a thin wrapper
that supplies its API client, initial form shape, and label functions — no
resource duplicates this logic. Components follow a matching three-file shape
per resource: `<Resource>sTable.vue`, `<Resource>sTableRow.vue`,
`<Resource>FormModal.vue`, plus a `<Resource>sPage.vue`.

A Claude Code skill
([`.claude/skills/add-crud-resource/SKILL.md`](./.claude/skills/add-crud-resource/SKILL.md))
scaffolds this entire stack (types, API client, composable, table, form,
page, route, sidebar entry) for a brand-new resource in one pass.

## Project structure

```
src/
├── application/
│   ├── api/
│   │   ├── StandardClient.ts        # ofetch wrapper: attaches bearer token, get/post/put/patch/delete
│   │   └── resources/               # one client class per resource (Post, Category, Tag, User, Comment, Billing, Auth)
│   └── types/api/
│       ├── config.ts                # HttpMethod, HttpResponseCode
│       └── resources/                # interfaces + BackendEndpoint enum per resource
├── components/
│   ├── ui/                          # AppButton, AppModal, PageHeader, EmptyState, ErrorMessage,
│   │                                 # SuccessMessage, StatusBadge, RoleBadge
│   ├── form/                        # AppInput, AppSelect, AppTextarea, AppCheckbox, PasswordInput, FormRow
│   ├── layout/                      # AppSidebar, SidebarNav, UserMenu
│   ├── dashboard/                   # StatsGrid, StatCard
│   ├── posts/ categories/ tags/ users/ comments/ billing/   # Table, TableRow, FormModal per resource
│   └── AuthFormWrapper.vue
├── composables/
│   ├── useApiClients.ts             # inject the shared StandardClient
│   ├── useResource.ts               # universal CRUD composable
│   ├── usePosts.ts / useCategories.ts / useTags.ts / useUsers.ts / useComments.ts
│   ├── useBilling.ts                # Stripe subscription/invoice logic (not useResource-based)
│   ├── useDashboardStats.ts
│   └── useLogin.ts / useRegister.ts / useForgotPassword.ts / useResetPassword.ts
├── layouts/
│   ├── AuthLayout.vue
│   └── DashboardLayout.vue
├── pages/
│   ├── auth/                        # LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage
│   ├── posts/ categories/ tags/ users/ comments/
│   ├── billing/                     # BillingPage, SubscriptionSuccessPage
│   └── DashboardPage.vue
├── plugins/apiClients.ts            # provides the StandardClient instance (base URL from VITE_SERVER_URL)
├── router/
│   ├── index.ts                     # all routes: /login, /register, /forgot-password, /reset-password,
│   │                                 # and the dashboard layout's children (/, posts, categories, tags,
│   │                                 # users, comments, billing, billing/success)
│   └── authMiddleware.ts            # requiresAuth guard
├── stores/auth.ts                    # Pinia store: token, user, login/register/logout/password reset
└── utils/slugify.ts
```

See [`CLAUDE.md`](./CLAUDE.md) for detailed coding conventions and the
step-by-step pattern to follow when adding a new resource by hand.
