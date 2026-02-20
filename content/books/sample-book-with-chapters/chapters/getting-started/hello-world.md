---
title: "Hello World"
date: "2026-02-02T10:00:00.000Z"
description: "Honoで最初のアプリケーションを作成します"
order: 2
---

## Hello World

最初のHonoアプリケーションを作成しましょう。

```typescript
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

export default app;
```
