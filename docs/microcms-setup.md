# microCMS 接続セットアップ手順

実績（PORTFOLIO）を microCMS の管理画面から追加・編集できるようにするための手順です。
**未接続でもサイトは `src/data/projects.js` のローカルデータで表示されます**（接続すると自動で切り替わります）。

---

## 1. microCMS でサービスを作る

1. https://microcms.io/ で無料登録
2. 「サービスを作成」→ サービス名とサービスID（`https://XXXX.microcms.io` の `XXXX`）を決める

## 2. API（コンテンツの入れ物）を作る

- 「APIを作成」→ **API名: `works`** / **エンドポイント: `works`** / 型は **リスト形式** を選択

## 3. APIスキーマ（フィールド）を以下の通り設定

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|---|---|---|---|---|
| `title` | タイトル | テキストフィールド | ✓ | 実績名（例: Care Shift） |
| `description` | 概要 | テキストフィールド | | 短い説明（任意） |
| `thumbnail` | サムネイル | 画像 | ✓ | カードに出るメイン画像 |
| `image1` | 画像1 | 画像 | | モーダルのスライド画像（任意） |
| `image2` | 画像2 | 画像 | | モーダルのスライド画像（任意） |
| `image3` | 画像3 | 画像 | | モーダルのスライド画像（任意） |
| `body` | 本文 | テキストエリア | | 詳細説明 |
| `techStack` | 使用技術 | テキストフィールド | | カンマ区切り（例: `React, Next.js, Vercel`） |
| `websiteUrl` | サイトURL | テキストフィールド | | 公開サイトのURL（任意） |
| `siteTitle` | サイト表示名 | テキストフィールド | | リンクの表示名（任意） |
| `githubUrl` | GitHub URL | テキストフィールド | | リポジトリURL（任意） |
| `order` | 並び順 | 数字 | | 小さいほど先頭に表示 |

> ※ 画像は `thumbnail`（必須）だけでも動きます。`image1〜3` が空ならモーダルは `thumbnail` を表示します。

## 4. APIキーを取得

- サービス管理画面 → 「サービス設定」→「APIキー」→ 既定のキー（GET権限があればOK）をコピー

## 5. このプロジェクトに接続情報を設定

`.env.local` を開いて値を入れる：

```
MICROCMS_SERVICE_DOMAIN=あなたのサービスID
MICROCMS_API_KEY=あなたのAPIキー
```

保存したら開発サーバーを再起動：

```
PORT=3100 npm run dev
```

これで実績が microCMS から表示されます。管理画面でコンテンツを追加・編集すると、サイトに反映されます（本番は最大60秒のキャッシュ後に反映）。

## 6. 既存8件の一括登録

一括登録用ファイルを用意しました（`node scripts/gen-import.mjs` で再生成可能）。

- **`docs/works-import.csv`** … テキスト系フィールドの一括インポート用
- **`docs/works-import.json`** … 全データ＋画像対応表（参照用）

### 手順A：テキストをCSVで一括投入
1. microCMS 管理画面 → `works` API → コンテンツ画面の「**インポート**」
2. `docs/works-import.csv` をアップロード（列＝フィールドID：`order,title,description,body,techStack,websiteUrl,siteTitle,githubUrl`）
3. 8件のコンテンツが作成されます

> ⚠️ 画像（`thumbnail` / `image1〜3`）はCSVに含められません（メディアのアップロードが必要なため）。テキスト投入後、各コンテンツに画像を手動で設定してください。

### 手順B：画像をアップロードして各実績に設定
`public/` 配下の画像を microCMS にアップロードし、下表のとおり各コンテンツの `thumbnail`・`image1`・`image2`・`image3` に設定します。

| # | タイトル | thumbnail | image1 | image2 | image3 |
|---|---|---|---|---|---|
| 1 | Care Shift | `portfolio2.png` | `pf-cs-top.jpg` | `pf-cs-staff1.png` | `pf-cs-shift.png` |
| 2 | ポートフォリオサイト | `pf1.png` | `pf-pf.png` | `pf-pf1.png` | `pf-pf2.png` |
| 3 | ブログ | `pf-blog1.png` | `pf-blog.jpg` | `pf-blog-1.png` | `pf-blog-2.png` |
| 4 | グラウンド予約システム | `pf-ground.png` | `pf-ground-reserve.png` | `pf-ground-reserve2.png` | `pf-ground-reserve3.png` |
| 5 | ホームページ制作（高森SC） | `pf-takamori-sc.jpg` | `pf-takamori.jpg` | `pf-takamori2.jpg` | `pf-takamori3.jpg` |
| 6 | ホームページ制作（整理収納） | `studio4.png` | `studio1.jpg` | `studio2.jpg` | `studio3.jpg` |
| 7 | LP制作 | `onomichi-lp.png` | `onomichi-lp1.jpg` | `onomichi-lp2.jpg` | `onomichi-lp3.jpg` |
| 8 | ホームページ制作（アザリー飯田） | `azaleeiida1.png` | `azaleeiida.jpg` | `azaleeiida2.jpg` | `azaleeiida3.jpg` |

> これらの画像ファイルはすべて `public/` フォルダにあります。管理画面のメディアにドラッグ＆ドロップでアップロードできます。

### （上級者向け）画像も含めて完全自動で登録したい場合
microCMS の **Management API** を使えば、画像アップロード〜コンテンツ作成まで스크립트で自動化できます。必要であればスクリプトを作成しますのでお知らせください（書き込み用のAPIキーが必要です）。

---

## 7. ブログ（blog API）の追加

ブログ記事を microCMS で管理する場合：

1. 「APIを作成」→ **API名: `ブログ`** / **エンドポイント: `blog`** / **リスト形式**
2. スキーマ：

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|---|---|---|---|---|
| `title` | タイトル | テキストフィールド | ✓ | 記事タイトル |
| `thumbnail` | サムネイル | 画像 | | 一覧/詳細のメイン画像 |
| `content` | 本文 | **リッチエディタ** | ✓ | 記事本文（HTML） |
| `excerpt` | 抜粋 | テキストエリア | | 一覧の説明（未設定なら本文先頭から自動生成） |
| `date` | 日付 | 日時 | | 表示日付（未設定なら公開日 publishedAt を使用） |

3. 記事を追加 → 公開。`.env.local` の microCMS 設定済みなら自動でサイトに反映されます（未接続時は `src/data/posts.js` のサンプルを表示）。

> 一覧 `/blog`、詳細 `/blog/[contentId]`、トップの最新3件セクションに自動反映されます。
