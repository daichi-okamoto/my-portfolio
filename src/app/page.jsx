import SiteShell from '@/components/SiteShell';
import { getProjects, getPosts } from '@/lib/microcms';

// microCMSの更新を反映するため、定期的に再生成（ISR）
export const revalidate = 60;

export default async function Home() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  return <SiteShell projects={projects} posts={posts} />;
}
