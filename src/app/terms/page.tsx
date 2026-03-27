'use client';

import { api, normalizeItem } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type CmsPage = {
  title?: string;
  content?: string;
  updatedAt?: string;
};

export default function TermsAndConditionsPage() {
  const { data: cmsPage, isLoading } = useQuery({
    queryKey: ['cms-terms'],
    queryFn: async () => {
      const res = await api.get<{
        success: true;
        message: string;
        data: CmsPage | { data?: CmsPage };
      }>('/content/terms');

      return normalizeItem<CmsPage>(res.data.data);
    },
  });

  return (
    <div className='min-h-screen bg-[#0a0f1d] pt-28 pb-24'>
      <div className='container-custom max-w-4xl'>
        <h1 className='text-4xl md:text-5xl font-bold font-heading mb-4'>
          {cmsPage?.title || 'Terms & Conditions'}
        </h1>
        {cmsPage?.updatedAt && (
          <p className='text-xs text-white/40 mb-8'>
            Updated: {new Date(cmsPage.updatedAt).toLocaleDateString()}
          </p>
        )}

        {isLoading ? (
          <p className='text-sm text-white/40'>Loading terms...</p>
        ) : (
          <div className='rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-white/70 leading-7 whitespace-pre-wrap'>
            {cmsPage?.content || 'Terms content is not available yet.'}
          </div>
        )}
      </div>
    </div>
  );
}
