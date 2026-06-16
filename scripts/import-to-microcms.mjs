// microCMS Write API で実績8件を一括登録する。
//   - テキスト＋画像（マネジメントAPIのメディアアップロード）を登録。
//   - 既に登録済み（同じorder）の項目はスキップ＝途中から再開できる。
//   - 429(レート制限)はバックオフして自動リトライ。画像は直列アップロード。
// 実行: node --env-file=.env.local scripts/import-to-microcms.mjs
import { projects } from '../src/data/projects.js';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const domain = process.env.MICROCMS_SERVICE_DOMAIN;
const writeKey = process.env.MICROCMS_WRITE_API_KEY || process.env.MICROCMS_API_KEY;

if (!domain || !writeKey) {
  console.error('環境変数 MICROCMS_SERVICE_DOMAIN / MICROCMS_WRITE_API_KEY が未設定です。');
  process.exit(1);
}

const BASE = `https://${domain}.microcms.io/api/v1`; // コンテンツAPI
const MEDIA_URL = `https://${domain}.microcms-management.io/api/v1/media`; // マネジメントAPI(メディア)
const HEADERS = { 'X-MICROCMS-API-KEY': writeKey };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const mimeOf = (file) => {
  const ext = file.toLowerCase().split('.').pop();
  if (ext === 'png') return 'image/png';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif') return 'image/gif';
  return 'application/octet-stream';
};

// 既存コンテンツ（order一覧）を取得して再開に使う
async function getExistingOrders() {
  const res = await fetch(`${BASE}/works?limit=100&fields=id,order`, { headers: HEADERS });
  if (!res.ok) return new Set();
  const data = await res.json();
  return new Set((data.contents || []).map((c) => c.order).filter((v) => v != null));
}

const mediaCache = new Map();
let mediaSupported = true;

// 画像アップロード（429はリトライ）
async function uploadImage(publicPath) {
  if (!publicPath || !mediaSupported) return null;
  if (mediaCache.has(publicPath)) return mediaCache.get(publicPath);

  const filePath = path.join('public', publicPath.replace(/^\//, ''));
  if (!existsSync(filePath)) {
    console.warn(`  画像が見つかりません: ${filePath}`);
    return null;
  }
  const buf = readFileSync(filePath);

  for (let attempt = 0; attempt < 6; attempt++) {
    const fd = new FormData();
    fd.append('file', new Blob([buf], { type: mimeOf(filePath) }), path.basename(filePath));
    const res = await fetch(MEDIA_URL, { method: 'POST', headers: HEADERS, body: fd });

    if (res.ok) {
      const data = await res.json();
      const url = data.url || data.urls?.[0];
      mediaCache.set(publicPath, url);
      await sleep(350); // レート制限回避のため少し待つ
      return url;
    }
    const t = await res.text();
    if (res.status === 429) {
      const wait = 1500 * (attempt + 1);
      console.warn(`  429(制限)。${wait}ms待機して再試行...`);
      await sleep(wait);
      continue;
    }
    if (res.status === 403 || res.status === 404) {
      mediaSupported = false;
      console.warn(`  ⚠️ メディアAPIが使用できません(${res.status})。`);
      return null;
    }
    console.warn(`  画像アップロード失敗(${res.status}): ${t}`);
    return null;
  }
  console.warn('  リトライ上限。画像をスキップします。');
  return null;
}

async function createContent(body) {
  const res = await fetch(`${BASE}/works`, {
    method: 'POST',
    headers: { ...HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`作成失敗 (${res.status}): ${t}`);
  }
  return res.json();
}

async function main() {
  const done = await getExistingOrders();
  console.log(`${projects.length} 件を処理します（登録済はスキップ）...`);

  for (let i = 0; i < projects.length; i++) {
    const order = i + 1;
    const p = projects[i];
    if (done.has(order)) {
      console.log(`[${order}/${projects.length}] スキップ(登録済): ${p.title}`);
      continue;
    }
    console.log(`[${order}/${projects.length}] ${p.title}`);

    // 直列アップロード（レート制限回避）
    const thumbnail = await uploadImage(p.image);
    const image1 = await uploadImage(p.images?.[0]);
    const image2 = await uploadImage(p.images?.[1]);
    const image3 = await uploadImage(p.images?.[2]);

    const body = {
      title: p.title ?? '',
      description: p.details?.text ?? p.description ?? '',
      techStack: p.details?.languages ?? '',
      websiteUrl: p.details?.websiteLink ?? '',
      siteTitle: p.details?.siteTitle ?? '',
      githubUrl: p.details?.githubLink ?? '',
      order,
    };
    if (thumbnail) body.thumbnail = thumbnail;
    if (image1) body.image1 = image1;
    if (image2) body.image2 = image2;
    if (image3) body.image3 = image3;

    const created = await createContent(body);
    console.log(`   -> 作成: ${created.id}${thumbnail ? ' (画像あり)' : ' (画像なし)'}`);
    await sleep(400);
  }

  console.log('\n完了しました。');
}

main().catch((e) => {
  console.error('エラー:', e.message);
  process.exit(1);
});
