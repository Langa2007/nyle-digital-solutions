import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';

interface Props {
  params: { slug: string };
}

async function getProject(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/portfolio/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Vantech Software Solutions`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: project.featuredImage ? [
        {
          url: project.featuredImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ] : [],
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    image: project.featuredImage,
    description: project.description,
    author: {
      '@type': 'Organization',
      name: 'Vantech Software Solutions',
    },
  };

  return (
    <article className="pt-32 pb-24 min-h-screen section-atmosphere">
      <JsonLd data={jsonLd} />
      <div className="section-shell relative z-10 max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white">
              {project.category || 'Case Study'}
            </span>
          </div>
          <h1 className="text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        {project.featuredImage && (
          <div className="relative h-64 sm:h-[500px] w-full rounded-2xl overflow-hidden mb-16 shadow-2xl">
            <img 
              src={project.featuredImage} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid md:grid-cols-[1fr_300px] gap-12">
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
            {project.content ? (
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            ) : (
              <p>Case study details are being updated. Check back soon for the full technical breakdown.</p>
            )}
          </div>

          <aside className="space-y-8">
            {project.technologies && project.technologies.length > 0 && (
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.link && (
              <div className="glass-panel p-6 rounded-xl">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full justify-center items-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700"
                >
                  Visit Live Project
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
