import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';

interface Props {
  params: { slug: string };
}

// In a real application, you would fetch this from your API
const getBlogPost = (slug: string) => {
  return {
    title: `Insights on ${slug.replace(/-/g, ' ')}`,
    excerpt: 'Detailed article discussing modern software delivery, platform work, and interface refinement.',
    content: 'This is the full content of the blog post. In a real application, this would be fetched from the backend API and rendered using a markdown parser or rich text renderer.',
    author: 'Vantech Delivery Team',
    date: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?auto=format&fit=crop&w=1200',
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Vantech Software Solutions`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: [{
      '@type': 'Person',
      name: post.author,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Vantech Software Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vantechsoftwares.vercel.app/vantech-favicon.png'
      }
    },
    description: post.excerpt,
  };

  return (
    <article className="pt-32 pb-24 min-h-screen section-atmosphere">
      <JsonLd data={jsonLd} />
      <div className="section-shell relative z-10 max-w-3xl">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden mb-12">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <p>{post.content}</p>
        </div>
      </div>
    </article>
  );
}
