---
title: Auto increment
# description: How to install and configure Typedex for typesafe Indexed DB usage.
---

Defining an object store as `autoIncrement` imposes some additional constraints on the types of keys that can be used with that object store.

## Auto increment with keypath

[](auto-increment-samples/keypath.type-test.ts)

## Auto increment with out-of-line keys

[](auto-increment-samples/out-of-line.type-test.ts)

## Auto increment with composite keys

The IndexedDB spec specifically disallows using `autoIncrement` with composite
(array) primary keys.

[](auto-increment-samples/composite.type-test.ts)
