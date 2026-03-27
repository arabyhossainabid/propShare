'use client';

import { api, normalizeList } from '@/lib/api';
import { Category } from '@/lib/api-types';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories-page'],
    queryFn: async () => {
      const res = await api.get<{
        success: true;
        message: string;
        data: Category[] | { data?: Category[] };
      }>('/categories');
      return normalizeList<Category>(res.data.data);
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className='min-h-screen bg-[#0a0f1d] pt-28 pb-20'>
      <div className='container-custom'>
        <div className='space-y-4 mb-12'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20'>
            <Layers className='w-3 h-3 text-purple-400' />
            <span className='text-xs font-medium text-purple-400 uppercase tracking-wider'>
              Property Categories
            </span>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold font-heading'>
            Available <span className='gradient-text'>Categories</span>
          </h1>
          <p className='text-white/40 text-lg max-w-2xl'>
            Explore investment categories and open filtered properties with one
            click.
          </p>
        </div>

        {isLoading && (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`category-skeleton-${idx}`}
                className='rounded-2xl border border-white/10 bg-white/[0.02] p-6 animate-pulse space-y-3'
              >
                <div className='h-5 w-1/2 rounded bg-white/[0.08]' />
                <div className='h-4 w-full rounded bg-white/[0.06]' />
                <div className='h-4 w-2/3 rounded bg-white/[0.06]' />
                <div className='h-4 w-1/3 rounded bg-white/[0.07] mt-4' />
              </div>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className='rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-8 text-sm text-red-200'>
            Could not load categories right now.
          </div>
        )}

        {!isLoading && !isError && categories.length === 0 && (
          <div className='rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-sm text-white/40'>
            No categories are available right now.
          </div>
        )}

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='rounded-2xl border border-white/10 bg-white/[0.02] p-6'
            >
              <h2 className='text-xl font-semibold text-white'>
                {category.name}
              </h2>
              <p className='text-sm text-white/40 mt-2 min-h-10'>
                {category.description || 'No description provided.'}
              </p>
              <Link
                href={`/properties?categoryId=${category.id}`}
                className='mt-5 inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200'
              >
                View Properties
                <ArrowRight className='w-4 h-4' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
