---
id: use-fnm-node-path-and-corepack-home-for-pnpm
date: 2026-03-12
kind: workflow
scope: project
tags:
  - wsl
  - node
  - pnpm
  - fnm
  - corepack
source: bug-fix
---

# Use fnm Node path and COREPACK_HOME for pnpm

## Summary

In this WSL environment, `node` and `pnpm` may be missing from non-interactive Codex exec sessions even though the thread terminal shows a Node version in the prompt.

## Context

Local `build`, `typecheck`, and `test` initially failed because the exec environment did not inherit the interactive shell setup from `~/.zshrc`. The repo uses `fnm`, and `pnpm` resolves through a Corepack shim that also needs a writable cache location.

## Remember

When `node` or `pnpm` are missing in Codex exec sessions, prepend `~/.local/share/fnm/node-versions/v24.11.1/installation/bin` to `PATH` and set `COREPACK_HOME=/tmp/corepack` before running pnpm commands:

```bash
PATH="$HOME/.local/share/fnm/node-versions/v24.11.1/installation/bin:$PATH" COREPACK_HOME=/tmp/corepack pnpm <command>
```
