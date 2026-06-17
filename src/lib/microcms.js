import { createClient } from 'microcms-js-sdk';
import { projects as fallbackProjects } from '@/data/projects';
import { posts as fallbackPosts } from '@/data/posts';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// 環境変数が揃っているときだけクライアントを作る
const client =
  serviceDomain && apiKey
    ? createClient({ serviceDomain, apiKey })
    : null;

// microCMSの1件を、アプリ内で使う project 形へ変換
function toProject(item) {
  // モーダルのスライド画像は image1〜image3 を使う（設定が簡単な個別の画像フィールド）
  const images = [item.image1, item.image2, item.image3]
    .map((img) => img?.url)
    .filter(Boolean);

  return {
    id: item.id,
    title: item.title ?? '',
    description: item.description ?? '',
    image: item.thumbnail?.url || images[0] || '',
    images: images.length ? images : item.thumbnail?.url ? [item.thumbnail.url] : [],
    details: {
      // 詳細本文は description フィールドに格納している
      text: item.body || item.description || '',
      languages: item.techStack ?? '',
      websiteLink: item.websiteUrl || undefined,
      siteTitle: item.siteTitle || undefined,
      githubLink: item.githubUrl || undefined,
    },
  };
}

/**
 * 実績一覧を取得。
 * - microCMSの環境変数が未設定、または取得失敗時はローカルのフォールバックを返す。
 * - これにより、CMS未接続でもサイトは常に表示される。
 */
export async function getProjects() {
  if (!client) return fallbackProjects;

  try {
    const data = await client.getList({
      endpoint: 'works',
      queries: { limit: 100, orders: 'order,publishedAt' },
    });
    if (!data?.contents?.length) return fallbackProjects;
    return data.contents.map(toProject);
  } catch (e) {
    console.error('[microCMS] 取得に失敗したためローカルデータを使用します:', e?.message);
    return fallbackProjects;
  }
}

/**
 * 実績を1件取得。未接続/失敗時はローカルfallbackからid一致を返す。
 */
export async function getProject(id) {
  if (!client) {
    return fallbackProjects.find((p) => String(p.id) === String(id)) || null;
  }
  try {
    const item = await client.getListDetail({ endpoint: 'works', contentId: id });
    return toProject(item);
  } catch (e) {
    console.error('[microCMS] 単一取得に失敗:', e?.message);
    return fallbackProjects.find((p) => String(p.id) === String(id)) || null;
  }
}

// ===== ブログ =====

const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, '').trim();

// microCMSの1件を、アプリ内で使う post 形へ変換
function toPost(item) {
  const content = item.content ?? item.body ?? '';
  return {
    id: item.id,
    title: item.title ?? '',
    date: item.date || item.publishedAt || item.createdAt || '',
    excerpt: item.excerpt || stripHtml(content).slice(0, 90),
    thumbnail: item.thumbnail?.url || item.eyecatch?.url || '',
    content,
  };
}

/**
 * ブログ一覧を取得。未接続/失敗時はローカルのサンプル記事を返す。
 */
export async function getPosts() {
  if (!client) return fallbackPosts;
  try {
    const data = await client.getList({
      endpoint: 'blog',
      queries: { limit: 100, orders: '-publishedAt' },
    });
    if (!data?.contents?.length) return fallbackPosts;
    return data.contents.map(toPost);
  } catch (e) {
    console.error('[microCMS] ブログ取得に失敗したためローカルデータを使用:', e?.message);
    return fallbackPosts;
  }
}

/**
 * ブログを1件取得。未接続/失敗時はローカルfallbackからid一致を返す。
 */
export async function getPost(id) {
  if (!client) {
    return fallbackPosts.find((p) => String(p.id) === String(id)) || null;
  }
  try {
    const item = await client.getListDetail({ endpoint: 'blog', contentId: id });
    return toPost(item);
  } catch (e) {
    console.error('[microCMS] ブログ単一取得に失敗:', e?.message);
    return fallbackPosts.find((p) => String(p.id) === String(id)) || null;
  }
}
