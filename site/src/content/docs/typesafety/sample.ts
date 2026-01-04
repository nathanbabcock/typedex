import { createMigrations } from '@typedex/indexed-db'
import { z } from 'zod/v4'
// @errors: 2345
// ---cut---
createMigrations()
  .version(1, v => v.createObjectStore('users', z.object({ id: z.string() })))
  .version(1, v => v.createObjectStore('posts', z.object({ id: z.string() })))
