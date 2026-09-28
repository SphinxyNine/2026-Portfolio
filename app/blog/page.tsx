import type { Metadata } from 'next';
import { BookOpenText } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { ViewCollection } from '@/components/view-collection';
import { plannedPosts } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Blog', description: 'Notes about web development, automation, implementation, and portfolio work.',
  alternates: { canonical: '/blog/' },
};

export default function BlogPage() {
  return (
    <div className="page">
      <PageIntro eyebrow="Explore" title="Blog" description="Practical notes about web development, automation, and client implementation are being prepared." />
      <section className="placeholder-panel" aria-labelledby="blog-status">
        <BookOpenText size={22} strokeWidth={1.5} aria-hidden="true" />
        <div><p className="eyebrow">Coming soon</p><h2 id="blog-status">Writing in progress</h2><p>The first planned topics are listed below.</p></div>
      </section>
      <ViewCollection storageKey="blog" countLabel={`${plannedPosts.length} planned articles`}>
        <div className="post-list page-post-list">
          {plannedPosts.map((post) => <article className="post-row" key={post.title}><h3>{post.title}</h3><p>{post.topic}</p></article>)}
        </div>
      </ViewCollection>
    </div>
  );
}
