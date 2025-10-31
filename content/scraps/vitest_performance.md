---
title: Vitest Durationのメトリクス
date: "2025-10-31T22:12:03.284Z"
---

# Vitest Durationのメトリクス

Vitestを実行した際に以下のようにDurationが表示される。
内訳として、
- transform
- setup
- collect
- tests
- environment
- prepare

が存在する。

```bash
Duration  4.80s (transform 44ms, setup 0ms, collect 35ms, tests 4.52s, environment 0ms, prepare 81ms)
```

その内容と、どのような時に実行時間が伸びるかを記載する。

## transform
- トランスパイルにかかった時間。

## setup
- setupFilesに指定したファイル指定したファイルの実行時間
- setupFilesの処理が多いとここの時間が伸びる。また、setupFiles内の依存関係が多い場合もそのimportに時間がかかるためこの時間が伸びる。
- barel importなどによって不要なファイルをimportしていないか確認する。コード上で使用していなくてもimportするだけで読み込み時間が伸びるので、大量の依存関係が存在するファイルを1つ読み込むだけでも時間は伸びる

## collect
- [collect](https://github.com/vitest-dev/vitest/blob/2e7b2b8b98dafc047a3bf2fc0422076ca5e346fa/docs/advanced/api/vitest.md#collect) 
- 内部的にはテストコールバックを実行せずにファイルを実行するのにかかった時間。
テストケースを実際に実行することはないが、テストファイルの実行は行うので、ファイルの依存関係が多いと秒数が伸びる傾向にある。
- documentにも`Time spent for collecting all tests in the test files. This includes the time it took to import all file dependencies.` の記載がある。

## tests
- テスト実行にかかった時間。これはその通り。

## environment
- [environment](https://vitest.dev/config/#environment)のセットアップにかかった時間。

## prepare
- テスト実行の準備にかかる時間。

# まとめ
- 不要なファイルをimportしない。依存先ファイルが依存しているファイルにも気にかける。
- barel importは使わない方が良い

## 参考
- [Profiling Test Performance](https://vitest.dev/guide/profiling-test-performance.html#profiling-test-performance)