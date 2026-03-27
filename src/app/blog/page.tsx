'use client';

import { api, normalizeList } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type BlogItem = {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  publishedAt?: string;
};

export default function BlogPage() {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs-list'],
    queryFn: async () => {
      const res = await api.get<{
        success: true;
        message: string;
        data: BlogItem[] | { data?: BlogItem[] };
      }>('/blogs');

      return normalizeList<BlogItem>(res.data.data);
    },
  });

  const { data: featuredBlogs = [] } = useQuery({
    queryKey: ['blogs-featured'],
    queryFn: async () => {
      const res = await api.get<{
        success: true;
        message: string;
        data: BlogItem[] | { data?: BlogItem[] };
      }>('/blogs/featured');

      return normalizeList<BlogItem>(res.data.data);
    },
  });

  const featured = featuredBlogs[0] || blogs[0];

  return (
    <div className='min-h-screen bg-[#0a0f1d] pt-28 pb-20'>
      <div className='container-custom'>
        <div className='max-w-3xl space-y-5 mb-10'>
          <h1 className='text-4xl md:text-5xl font-bold font-heading'>
            Blog <span className='gradient-text'>Updates</span>
          </h1>
          <p className='text-white/50 leading-relaxed'>
            Latest articles are loaded from the backend blog APIs.
          </p>
        </div>

        {isLoading && <p className='text-sm text-white/40'>Loading blogs...</p>}

        {featured && (
          <div className='rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8'>
            <p className='text-xs text-blue-300 uppercase tracking-wider mb-2'>
              Featured
            </p>
            <h2 className='text-2xl font-bold text-white'>{featured.title}</h2>
            <p className='text-sm text-white/40 mt-3'>
              {featured.excerpt || featured.content || 'No excerpt available.'}
            </p>
          </div>
        )}

        <div className='grid md:grid-cols-2 gap-5'>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className='rounded-2xl border border-white/10 bg-white/[0.02] p-5'
            >
              <p className='text-xs text-white/30 mb-2'>
                {blog.category || 'General'}
                {blog.publishedAt
                  ? ` · ${new Date(blog.publishedAt).toLocaleDateString()}`
                  : ''}
              </p>
              <h3 className='text-lg font-semibold text-white'>{blog.title}</h3>
              <p className='text-sm text-white/40 mt-2'>
                {blog.excerpt || blog.content || 'No content available.'}
              </p>
            </div>
          ))}
        </div>

        {!isLoading && blogs.length === 0 && (
          <p className='text-sm text-white/40'>No blogs available right now.</p>
        )}
      </div>
    </div>
  );
}
