---
name: add-crud-resource
description: Generates a full admin CRUD stack (types, API client, composable, table, form modal, page, router route, sidebar entry)
 for a new resource, following the exact patterns used by Posts, Categories, Users, and Comments. Trigger when the user asks to add,
 scaffold, or create a new admin resource (e.g. "add tags", "make CRUD for pages", "create products section").
---

# Add CRUD Resource

## Purpose

Scaffold a new admin CRUD resource matching the existing patterns. The project already
uses the universal `useResource` composable — everything below assumes it exists at
`src/composables/useResource.ts`. Do NOT reimplement CRUD logic.

## Step 1 — Gather info

If the user did not specify, ask these (batch them together, don't ask one by one):

1. **Resource singular** (e.g. `tag`) and **plural** (e.g. `tags`).
2. **Fields** — for each: name, type (string/number/boolean/textarea/select/relation),
   required?, default value.
3. **Auto-slug from another field?** (e.g. slug from name) — yes/no.
4. **Related resources to load into a dropdown?** (e.g. comments need a posts dropdown).
   If yes, which resource.
5. **Table columns** — which fields to display (defaults to first 3 + created_at).
6. **Backend endpoint** — default `/api/admin/<plural>`, override if different.

Skip questions the user already answered in the request.

## Step 2 — Read reference implementations BEFORE writing anything

Read at minimum:
- `src/composables/useResource.ts` — the universal composable
- `src/composables/useCategories.ts` — simplest wrapper
- `src/composables/usePosts.ts` — wrapper with a related dropdown
- `src/components/categories/CategoriesTable.vue`
- `src/components/categories/CategoriesTableRow.vue`
- `src/components/categories/CategoryFormModal.vue`
- `src/pages/categories/CategoriesPage.vue`
- `src/application/api/resources/CategoryClient.ts`
- `src/application/types/api/resources/Category.ts`
- `src/components/layout/AppSidebar.vue`
- `src/router/index.ts`

If the resource has related dropdowns, also read `usePosts.ts` for the pattern.

## Step 3 — Generate these files

Naming: `<Resource>` = PascalCase singular, `<Resources>` = PascalCase plural,
`<resource>` = camelCase singular, `<resources>` = camelCase plural.

1. `src/application/types/api/resources/<Resource>.ts`
    - `interface <Resource>` with `id`, all fields, optional `created_at`/`updated_at`
    - `enum BackendEndpoint` with `<Resources>` and `<Resource>` entries
    - `interface Store<Resource>Request` with writable fields only
    - `export type Update<Resource>Request = Store<Resource>Request`

2. `src/application/api/resources/<Resource>Client.ts`
    - Class with `index`, `store`, `update(id, data)`, `destroy(id)`
    - Mirror `CategoryClient.ts` exactly

3. `src/composables/use<Resources>.ts`
    - Thin wrapper around `useResource<Item, StoreRequest>()`
    - Provide `client`, `resourceLabel`, `resourceLabelPlural`, `initialForm`,
      `mapItemToForm`, `getItemLabel`
    - Alias `items` to plural name: `<resources>: resource.items`
    - Return `{ ...resource, <resources>: resource.items }`
    - If auto-slug: add `generateSlug()` using `slugify` from `@/utils/slugify`
      (create it if missing — see step 4)
    - If related dropdown: `const relatedItems = ref<Related[]>([])` and
      `onMounted(fetchRelated)` — mirror `usePosts.ts`

4. `src/components/<resources>/<Resources>Table.vue`
    - Header row per column
    - `<v-for>` over `<Resources>TableRow` with `edit`/`delete` emits

5. `src/components/<resources>/<Resources>TableRow.vue`
    - Cells for each column
    - `formattedDate` computed for created_at
    - Two `AppButton`s (edit/delete) with the same styling as `PostsTableRow.vue`

6. `src/components/<resources>/<Resource>FormModal.vue`
    - Wraps `AppModal`
    - `<FormRow>` per field with the correct input component
    - `AppSelect` for enums/relations (convert `null <-> ''` via a `computed` — see
      `PostFormModal.vue` `categoryIdAsString` for the pattern)
    - `AppCheckbox` for booleans (writable via computed — see `isPublishedComputed`)
    - Cancel button + submit `AppButton`
    - Emits: `close`, `submit`, and any `blur` events for auto-slug

7. `src/pages/<resources>/<Resources>Page.vue`
    - `PageHeader` with title, subtitle, action button
    - `EmptyState` for loading/empty
    - `<Resources>Table` when data exists
    - `<Resource>FormModal` when `isModalOpen`
    - Destructure everything from `use<Resources>()`

## Step 4 — Ensure utilities exist

Check `src/utils/slugify.ts`:
```ts
export function slugify(str: string): string {
    return str.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
}
```
If missing and the resource needs slug, create it.

## Step 5 — Wire it up

Update BOTH files, do not forget:

1. `src/router/index.ts` — add a child route inside the dashboard layout block:
```ts
   {
     path: '',
     name: '',
     component: () => import('@/pages//Page.vue'),
   }
```

2. `src/components/layout/AppSidebar.vue` — add to `navItems`:
```ts
   { name: '', label: '' }
```

## Step 6 — Verify before finishing

Run through this checklist and fix anything that fails:

- [ ] Composable uses `useResource`, not raw refs and try/catch.
- [ ] Composable returns `<resources>: resource.items` alias.
- [ ] No `try/catch` in components or pages.
- [ ] No new base UI primitive created — only existing ones reused.
- [ ] `AppSelect` for relations uses a `computed` for null↔string conversion.
- [ ] `AppCheckbox` uses a `computed` with getter/setter for boolean binding.
- [ ] `formattedDate` is a `computed` in the row component.
- [ ] Route name and sidebar nav item name match.
- [ ] Delete button has `delete-btn` class for red hover state.
- [ ] Types file exports `interface`, `enum BackendEndpoint`,
  `Store<Resource>Request`, `Update<Resource>Request`.
- [ ] `slugify` used from `@/utils/slugify` (do not inline it).
- [ ] If related dropdown: `onMounted(fetchRelated)` in composable, related array
  passed as prop to modal.

## Rules and gotchas

- **No slug field for the resource?** Do not add `generateSlug` or a slug input.
  Users are the example — no slug.
- **Field is nullable in DB but the form uses AppSelect?** Convert `null` to `''`
  in the getter and `'' -> null` in the setter, same as `categoryIdAsString`.
- **Confirmation message on delete** comes from `getItemLabel` — pick the most
  human-readable field. Fall back to `#${id}` if nothing readable exists
  (like Comments).
- **Related items list** goes in the composable (not the page). Pass to the
  form modal via a prop, mirror how `usePosts.ts` passes `categories`.
- **StatusBadge vs new badges** — reuse `StatusBadge` for published/draft.
  Create a new badge only if the semantics are different (like `RoleBadge` for admin/user).

## Reference patterns cheat sheet

| Scenario | Look at |
|----------|---------|
| Simplest (name + slug) | `useCategories.ts`, `CategoryFormModal.vue` |
| With auto-slug | `useCategories.ts`, `usePosts.ts` |
| With a related dropdown | `usePosts.ts`, `PostFormModal.vue` |
| Without slug | `useUsers.ts` |
| With truncated text column | `CommentsTableRow.vue` |
| With password field | `UserFormModal.vue` |
| With a status/role badge | `PostsTableRow.vue` (`StatusBadge`), `UsersTableRow.vue` (`RoleBadge`) |