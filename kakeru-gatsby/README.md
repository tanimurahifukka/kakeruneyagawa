# KAKERU NEYAGAWA - Gatsby.js版

元のHTMLサイトをGatsby.jsで再構築し、コンテンツをMarkdownで管理できるようにしました。

## 🚀 セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run develop

# ビルド
npm run build

# ビルド済みサイトのプレビュー
npm run serve
```

## 📁 プロジェクト構造

```
kakeru-gatsby/
├── src/
│   ├── components/      # Reactコンポーネント
│   ├── content/         # Markdownコンテンツ
│   │   ├── values/      # 3つの価値
│   │   ├── tenants/     # テナント情報
│   │   └── events/      # イベント情報
│   ├── images/          # 画像ファイル
│   ├── pages/           # ページコンポーネント
│   └── styles/          # スタイル定義
├── gatsby-config.js     # Gatsby設定
├── gatsby-browser.js    # ブラウザAPI
└── package.json
```

## 📝 コンテンツの編集

### VALUES（3つの価値）の編集
`src/content/values/` フォルダ内のMarkdownファイルを編集します。

```markdown
---
title: "掛ける"
kanji: "掛"
order: 1
---

ここに説明文を記述
```

### テナント情報の編集
`src/content/tenants/` フォルダ内のMarkdownファイルを編集します。

```markdown
---
floor: 1
name: "Cafe 6D"
type: "6次産業化サポートカフェ"
image: "../images/cafe-6d.jpg"
order: 1
---

## 特徴
説明文...
```

### イベント情報の編集
`src/content/events/` フォルダ内のMarkdownファイルを編集します。

```markdown
---
date: "2024-01-20"
title: "イベントタイトル"
location: "開催場所"
time: "14:00 - 17:00"
tags: ["タグ1", "タグ2"]
order: 1
---

イベントの説明文
```

## 🎨 スタイルのカスタマイズ

- グローバルスタイル: `src/styles/GlobalStyle.js`
- 各コンポーネントのスタイル: 各コンポーネントファイル内のstyled-components

## 🚧 移行状況

✅ 完了:
- 基本的なプロジェクト構造
- Markdownコンテンツファイル
- Heroコンポーネント
- グローバルスタイル

⏳ 未実装:
- Valuesコンポーネント
- Eventsコンポーネント
- Tenantsコンポーネント
- ParticleBackground
- CustomCursor
- ThemeSwitcher
- 画像ファイルの移行
- GSAPアニメーション

## 📌 注意事項

- 画像ファイルは`src/images/`フォルダに配置してください
- Markdownファイルのfrontmatterは必須です
- orderフィールドで表示順を制御できます