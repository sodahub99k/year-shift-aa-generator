# yearshift

4桁の年号 `from -> to` の差分桁だけを「カウンター途中フレーム」風に差し替えたASCIIアートを生成し、ワンクリックでコピーできるページです。

## 開発

- `pnpm dev` : 開発サーバー起動
- `pnpm build` : ビルド（`dist/`）
- `pnpm preview` : ビルド結果のプレビュー

## CLI（生成ロジック確認）

- `node scripts/aa.mjs 2026 3026`
- `node scripts/aa_random_test.mjs`

数字グリフは [src/lib/digitArt.mjs](src/lib/digitArt.mjs) に集約しています（サイト/CLIで同一ソースを参照）。
