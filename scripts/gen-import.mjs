// 既存の実績データから microCMS 取り込み用ファイルを生成する。
//   - docs/works-import.csv : テキスト系フィールドのCSVインポート用
//   - docs/works-import.json: 全データ＋画像対応表（画像は手動アップロード用の参照）
// 実行: node scripts/gen-import.mjs
import { projects } from '../src/data/projects.js';
import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('docs', { recursive: true });

// microCMSのフィールドIDに合わせた列（画像はCSV不可のため除外）
const COLUMNS = [
  'order',
  'title',
  'description',
  'body',
  'techStack',
  'websiteUrl',
  'siteTitle',
  'githubUrl',
];

const csvEscape = (v) => {
  const s = v == null ? '' : String(v);
  return `"${s.replace(/"/g, '""')}"`;
};

const rows = projects.map((p, i) => ({
  order: i + 1,
  title: p.title ?? '',
  description: p.description ?? '',
  body: p.details?.text ?? '',
  techStack: p.details?.languages ?? '',
  websiteUrl: p.details?.websiteLink ?? '',
  siteTitle: p.details?.siteTitle ?? '',
  githubUrl: p.details?.githubLink ?? '',
}));

// CSV
const csv = [
  COLUMNS.join(','),
  ...rows.map((r) => COLUMNS.map((c) => csvEscape(r[c])).join(',')),
].join('\n');
writeFileSync('docs/works-import.csv', csv + '\n', 'utf8');

// JSON（画像の対応表つき）
const json = projects.map((p, i) => ({
  order: i + 1,
  title: p.title,
  description: p.description,
  body: p.details?.text,
  techStack: p.details?.languages,
  websiteUrl: p.details?.websiteLink ?? null,
  siteTitle: p.details?.siteTitle ?? null,
  githubUrl: p.details?.githubLink ?? null,
  // ↓ 画像は microCMS にアップロードして手動で設定する（参照用）
  _thumbnailFile: p.image, // public 配下のパス
  _galleryFiles: p.images ?? [],
}));
writeFileSync('docs/works-import.json', JSON.stringify(json, null, 2) + '\n', 'utf8');

console.log(`生成しました: docs/works-import.csv (${rows.length}件), docs/works-import.json`);
