---
title: Auto increment
# description: How to install and configure Typedex for typesafe Indexed DB usage.
---

Defining an object store as `autoIncrement` imposes some additional constraints on the types of keys that can be used with that object store.

## Auto increment with keypath

```ts twoslash
import { createMigrations } from '@typedex/indexed-db'
import { z } from 'zod/v4'
// @errors: 2740
// ---cut---
createMigrations().version(1, v =>
  v.createObjectStore(
    'users',
    z.object({ id: z.string(), name: z.string() }),
    { primaryKey: 'id', autoIncrement: true }
  )
)
```

## Auto increment with out-of-line keys

```ts twoslash
import { createMigrations, openDB } from '@typedex/indexed-db'
import { z } from 'zod/v4'
// @errors: 2345
// ---cut---
const migrations = createMigrations().version(1, v =>
  v.createObjectStore(
    'events',
    z.object({ name: z.string(), timestamp: z.date() }),
    { autoIncrement: true }
  )
)

const db = await openDB('test-db', migrations)

// Correct: get() with number key (autoIncrement generates numbers)
await db.get('events', 42)

// Incorrect: get() with non-number key
await db.get('events', 'not-a-number')
```

## Auto increment with compound keys

The IndexedDB spec specifically disallows using `autoIncrement` with compound
(array) primary keys.

```ts twoslash
import { createMigrations } from '@typedex/indexed-db'
import { z } from 'zod/v4'
// @errors: 2740
// ---cut---
createMigrations().version(1, v =>
  v.createObjectStore(
    'orders',
    z.object({
      customerId: z.number(),
      orderId: z.number(),
      amount: z.number(),
    }),
    { primaryKey: ['customerId', 'orderId'], autoIncrement: true }
  )
)
```
