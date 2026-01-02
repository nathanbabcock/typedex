---
title: Database versions
# description: How to install and configure Typedex for typesafe Indexed DB usage.
---

In Indexed DB, database version must be positive integers (1, 2, 3, …). More
importantly, they must be monotonically increasing.

This typically isn't too difficult to remember, but for good measure Typedex
enforces this through the type system when you define your migrations. It will
catch errors like copy-pasting a previous migration and forgetting to increment
the version number.

## Invalid

### Repeating the same version number twice

```ts twoslash
import { createMigrations } from '@typedex/indexed-db'
import { z } from 'zod/v4'
// @errors: 2345
// ---cut---
createMigrations()
  .version(1, v => v.createObjectStore('users', z.object({ id: z.string() })))
  .version(1, v => v.createObjectStore('posts', z.object({ id: z.string() })))
```

This can easily happen as an oversight when copy-pasting from previous migrations.

### Explicit version number can't be inferred

```ts twoslash
import { createMigrations } from '@typedex/indexed-db'
import { z } from 'zod/v4'
// @errors: 2345
// ---cut---
createMigrations()
  .version(1, v => v.createObjectStore('users', z.object({ id: z.string() })))
  .version(1 + 1, v => v.createObjectStore('posts', z.object({ id: z.string() })))
```

In this case Typescript doesn't evaluate `1 + 1` to `2` at compile time
(although there are some very cool alternative typecheckers like
[Ezno](https://kaleidawave.github.io/ezno/comparison/#arithmetic) which can do
this).

The best policy is to use explicit inline literals for version numbers and all
other schema values. On top of ensuring that the types are inferred automatically,
it also keeps the migration code simple and easy to read.

If you do require some kind of indirection for version numbers for any reason,
you just need to ensure that the value is a literal at compile time using e.g.
`as const` or other devices as needed.

## Valid

### Monotonically increasing by 1

```ts twoslash
import { createMigrations } from '@typedex/indexed-db'
import { z } from 'zod/v4'
// ---cut---
createMigrations()
  .version(1, v => v.createObjectStore('users', z.object({ id: z.string() })))
  .version(2, v => v.createObjectStore('posts', z.object({ id: z.string() })))
  .version(3, v => v.createObjectStore('stuff', z.object({ id: z.string() })))
```

### Skipping version numbers

Jumping by more than 1 is totally valid as well:

```ts twoslash
import { createMigrations } from '@typedex/indexed-db'
import { z } from 'zod/v4'
// ---cut---
createMigrations()
  .version(1, v => v.createObjectStore('users', z.object({ id: z.string() })))
  // jump straight to v5, skipping v2, v3, and v4
  .version(5, v => v.createObjectStore('posts', z.object({ id: z.string() })))
```
