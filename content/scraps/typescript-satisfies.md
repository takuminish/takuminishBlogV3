---
title: Typescript satisfies
date: "2025-11-14T22:12:03.284Z"
---

# Typescript satisfies
`satisfies T`とすることで、変数の型の検証をすることができる。
型アノテーションと異なる点として、`変数宣言時以外にも型の検証が出来る`、`型がユニオンなどの場合でも型を絞り込むことができる`という点がある。

## 実用例
### 1. switch caseにて網羅できているかdefault節にてチェックする
例えば、以下のようなtype Operationを考える。switch caseにてそのtypeごとの処理を書くことを想定する。
アプリケーションの仕様変更でtypeが追加されることはよくある話だが、その際に型エラーが起きることで実装漏れを防止したい時に使う。

switch caseが網羅されている場合は型がneverになることを利用する。逆に網羅できていない場合はneverにならないので、satisfies neverとすることで型エラーを起こすことができる。


```typescript
type Operation =  'operationA' | 'operationB' | 'operationC';

function main(operation:Operation) {
    switch(operation) {
        case 'operationA': {
            // なんらかの処理
            return;
        }
        case 'operationB': {
            // なんらかの処理
            return;
        }
        case 'operationC': {
            // なんらかの処理
            return;
        }
        default: console.error(`invalid operation type:${operation satisfies never}`);
    } 
}

```

### 2. 別途定義しているリテラル型に含まれる値のみを許可し、その型も限定する
以下のvalue1、value2はValueに含まれない'D'などを指定すると型エラーを起こす点は同じである。
異なる点は最終的なvalue1とvalue2の型である。

value1は型アノテーションなので、`'A' | 'B' | 'C'`となるが、value2は`'A'`となる。この違いによって、新たなリテラル型の生成+型安全な値の指定を同時に行うことができる。

```typescript
const Value = ['A', 'B', 'C'] as const;
const value1: typeof Value[number] = 'A'; // type is 'A' | 'B' | 'C'
const value2 = 'A' satisfies typeof Value[number]; // type is 'A'
```

## 参考

- https://typescriptbook.jp/reference/values-types-variables/satisfies
