---
title: "ジェネリクス"
date: "2026-01-16T10:00:00.000Z"
description: "TypeScriptのジェネリクスについて解説します"
order: 2
---

## ジェネリクス

ジェネリクスを使うと、型をパラメータとして受け取る関数やクラスを定義できます。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
```
