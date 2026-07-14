Markdown#

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Admin Panel — Vue 3 + TypeScript

Frontend of a Laravel-backed admin panel for a blog system (posts, categories, users, comments, tags, billing/subscriptions).

## Stack

- Vue 3 with Composition API and `<script setup lang="ts">`
- TypeScript (strict)
- Pinia for global stores (auth only)
- Vue Router 4 with route middleware
- `ofetch` wrapped in `StandardClient`
- `@vueuse/core` (`useStorage`)
- Vite

## Commands

```bash
npm run dev       # start Vite dev server on :5173
npm run build     # type-check (vue-tsc) then production build to dist/
npm run preview   # preview the production build locally
```

There is no test suite and no configured linter in this project — do not
invent `npm run test` or `npm run lint` commands. To type-check without a
full build, run `npx vue-tsc --noEmit`.

The dev server expects `VITE_SERVER_URL` (Laravel API base URL) in `.env`
(see `src/env.d.ts` / `src/plugins/apiClients.ts`). A Docker Compose setup
(`docker-compose.yml`, `docker/node`) runs `npm run dev` inside a container
on the same port if the user prefers that over a local Node install.

## Folder structure

```
src/
├── application/
│   ├── api/
│   │   ├── StandardClient.ts          # HTTP wrapper (do not modify without reason)
│   │   └── resources/                 # one API client class per resource
│   │       ├── PostClient.ts
│   │       ├── CategoryClient.ts
│   │       └── Auth.ts
│   └── types/
│       └── api/
│           ├── config.ts              # HttpMethod, HttpResponseCode
│           └── resources/             # one file per resource, contains
│               ├── Post.ts            # interfaces + BackendEndpoint enum
│               ├── Category.ts
│               └── Auth.ts
├── components/
│   ├── ui/                            # AppButton, AppModal, PageHeader,
│   │                                  # EmptyState, ErrorMessage, StatusBadge
│   ├── form/                          # AppInput, AppSelect, AppTextarea,
│   │                                  # AppCheckbox, PasswordInput, FormRow
│   ├── layout/                        # AppSidebar, SidebarNav, UserMenu
│   ├── dashboard/                     # StatsGrid, StatCard
│   ├── posts/                         # PostsTable, PostsTableRow, PostFormModal
│   ├── categories/                    # CategoriesTable, etc.
│   ├── tags/ users/ comments/ billing/ # same table/row/form-modal shape per resource
│   └── AuthFormWrapper.vue
├── composables/
│   ├── useApiClients.ts               # inject the shared StandardClient
│   ├── useResource.ts                 # UNIVERSAL CRUD composable — see below
│   ├── usePosts.ts                    # thin wrapper around useResource
│   ├── useCategories.ts               # thin wrapper around useResource
│   ├── useTags.ts / useUsers.ts / useComments.ts # more useResource wrappers
│   ├── useBilling.ts                  # subscription/billing state (not useResource-based)
│   ├── useDashboardStats.ts
│   ├── useLogin.ts / useRegister.ts / useForgotPassword.ts / useResetPassword.ts
├── layouts/
│   ├── AuthLayout.vue
│   └── DashboardLayout.vue
├── pages/
│   ├── auth/                          # LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage
│   ├── posts/PostsPage.vue
│   ├── categories/CategoriesPage.vue
│   ├── tags/ users/ comments/ billing/ # TagsPage, UsersPage, CommentsPage, BillingPage, SubscriptionSuccessPage
│   └── DashboardPage.vue
├── plugins/apiClients.ts              # provides StandardClient via app.provide
├── router/
│   ├── index.ts                       # routes + navigation guard
│   └── authMiddleware.ts
└── stores/
    └── auth.ts                        # Pinia auth store
```

## Conventions

- **Language:** all code, comments, commit messages, and UI strings are in English.
- **Naming:**
    - Files/components: PascalCase (`PostsTable.vue`, `useCategories.ts` is camelCase — composable convention).
    - Resource singular for types: `Post`, `Category`, `User`.
    - Resource plural for containers and endpoints: `posts`, `categories`.
- **Vue components:**
    - Always `<script setup lang="ts">`.
    - Props typed with `interface Props {}` + `defineProps<Props>()`.
    - Emits typed with `defineEmits<{}>()`.
    - Use `<style scoped>`, never inline styles.
    - No business logic inside components — extract into composables.
- **Composables:**
    - CRUD composables MUST wrap `useResource` from `src/composables/useResource.ts`.
    - Expose `items` under a resource-plural alias: `posts: resource.items`.
    - Return the spread `...resource` plus any resource-specific additions.
- **API clients:**
    - One class per resource, follow `PostClient.ts` structure exactly.
    - Constructor takes `StandardClient`, methods return `Promise<T>`.
    - `BackendEndpoint` enum lives with the type file.
- **Error handling:** all error handling is centralized in `useResource`. Never
  add `try/catch` in components or pages.

## The `useResource` pattern

Every CRUD resource follows this shape. Do NOT reimplement CRUD logic — always
delegate to `useResource`.

Reference implementations:

- **Simplest:** `src/composables/useCategories.ts` (name + slug)
- **With a related dropdown:** `src/composables/usePosts.ts` (loads categories for the form)
- **Without slug, with roles:** `src/composables/useUsers.ts`

Reference components: `src/components/categories/` is the cleanest template.

## Shared UI components — reuse before creating

Always check these before making anything new:

| Component                                                              | Purpose                                     |
|------------------------------------------------------------------------|---------------------------------------------|
| `AppInput`, `AppSelect`, `AppTextarea`, `AppCheckbox`, `PasswordInput` | Form fields                                 |
| `FormRow`                                                              | Wraps a field with spacing                  |
| `AppButton`                                                            | All buttons (has `loading`, `size`, `type`) |
| `AppModal`                                                             | Modal wrapper (emits `close`)               |
| `PageHeader`                                                           | Page title + subtitle + action slot         |
| `EmptyState`                                                           | Empty/loading state card                    |
| `ErrorMessage`                                                         | Displays an optional error string           |
| `StatusBadge`                                                          | Published/Draft pill                        |

If a new primitive is truly needed, put it under `components/ui/` or `components/form/`.

## Router and sidebar

When adding a resource page, TWO files must be updated:

1. `src/router/index.ts` — add a child route inside the dashboard layout block:

```ts
   {
    path: 'tags',
        name
:
    'tags',
        component
:
    () => import('@/pages/tags/TagsPage.vue')
}
```

2. `src/components/layout/AppSidebar.vue` — add a nav item:

```ts
   {
    name: 'tags', label
:
    'Tags'
}
```

## Do NOT

- Reimplement CRUD state, error handling, or modal open/close — that lives in `useResource`.
- Duplicate `handleError`, `isForbidden` checks, or `handleSubmit` boilerplate in resource composables.
- Add `try/catch` inside `.vue` components.
- Create new base components when an existing one fits.
- Add localization/i18n libraries — UI strings stay hard-coded English for now.
- Modify `StandardClient.ts` unless the change is genuinely global.
- Use `any` except when unwrapping the raw API client response
  (`res.data || res` — the API sometimes wraps in `{data: ...}`, sometimes not).

## Backend contract

- All admin endpoints live under `/api/admin/<resource>`.
- The auth token is a Sanctum bearer token, stored in `localStorage` under `auth_token_key`.
- The Laravel `Post` model exposes `category`, `user`, `tags` relations. Assume the
  same eager-loading pattern for other resources unless told otherwise.
- Admin-only endpoints return `403` — `useResource` already maps that to a friendly message.

## When adding a new CRUD resource

Follow the skill at `.claude/skills/add-crud-resource/SKILL.md`. It has the full
step-by-step. Trigger it by asking: "add CRUD for <resource>" or "make an admin
section for <resource>".