---
title: "ミドルウェア"
date: "2026-02-03T10:00:00.000Z"
description: "Honoのミドルウェア機能について解説します"
order: 1
---

## ミドルウェア

Honoではミドルウェアを使って共通処理を定義できます。

```typescript
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());
```
