# Testing

This workspace currently uses the built-in Node test runner.

## Current Coverage

- `packages/core` has executable tests against built output
- `packages/react` has executable mounted interaction tests using `jsdom`

## Current Limitation

The React package still lacks a richer interaction test harness.

At the moment, the automated React coverage proves:

- board rendering
- mounted tile click behavior
- hook-driven board state updates
- solve callback behavior
- basic presentation prop application

It does not yet cover a broader browser-style user-flow library or cross-package demo integration tests.
