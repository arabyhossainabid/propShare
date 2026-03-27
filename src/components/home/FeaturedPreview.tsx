'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api, normalizeList } from '@/lib/api';
import { Property } from '@/lib/api-types';
import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  MapPin,
  Share2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const fallbackImage =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop';

export default function FeaturedPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    data: properties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['home-properties'],
    queryFn: async () => {
      const res = await api.get<{
        success: true;
        message: string;
        data: Property[] | { data?: Property[] };
      }>('/properties', {
        params: {
          limit: 4,
          status: 'APPROVED',
        },
      });
      return normalizeList<Property>(res.data.data);
    },
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fp-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.property-card',
        { opacity: 0, y: 80, rotateY: 5 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.properties-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fundedPercentage = (p: Property) => {
    const available = p.availableShares ?? p.totalShares;
    return Math.round(((p.totalShares - available) / p.totalShares) * 100);
  };

  return (
    <section ref={sectionRef} className='section-padding relative'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/3 blur-[200px]' />

      <div className='container-custom relative z-10'>
        {/* Header */}
        <div className='fp-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16'>
          <div className='space-y-4'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20'>
              <Sparkles className='w-3 h-3 text-emerald-400' />
              <span className='text-xs font-medium text-emerald-400 uppercase tracking-wider'>
                Properties
              </span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold font-heading'>
              Explore <span className='gradient-text'>Properties</span>
            </h2>
            <p className='text-white/40 text-lg max-w-xl'>
              Browse top approved opportunities and start investing in premium
              real estate shares.
            </p>
          </div>
          <Link href='/properties'>
            <Button
              variant='outline'
              className='border-white/10 text-white hover:bg-white/5 rounded-2xl px-6 py-5 self-start md:self-auto group'
            >
              View All Properties
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
            </Button>
          </Link>
        </div>

        {/* Properties Grid */}
        <div className='properties-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {isLoading &&
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`home-prop-skeleton-${idx}`}
                className='rounded-3xl border border-white/5 bg-[#151c2e] overflow-hidden animate-pulse'
              >
                <div className='aspect-[16/10] bg-white/[0.05]' />
                <div className='p-6 space-y-4'>
                  <div className='space-y-2'>
                    <div className='h-4 w-3/4 rounded bg-white/[0.06]' />
                    <div className='h-3 w-1/2 rounded bg-white/[0.05]' />
                  </div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='h-14 rounded-xl bg-white/[0.05]' />
                    <div className='h-14 rounded-xl bg-white/[0.05]' />
                  </div>
                  <div className='space-y-2'>
                    <div className='h-2 rounded bg-white/[0.05]' />
                    <div className='h-2 rounded bg-white/[0.05]' />
                  </div>
                  <div className='h-11 rounded-xl bg-white/[0.06]' />
                </div>
              </div>
            ))}

          {(isLoading ? [] : properties.slice(0, 4)).map((property) => (
            <Link
              href={`/properties/${property.id}`}
              key={property.id}
              className='property-card group cursor-pointer'
            >
              <div className='bg-[#151c2e] rounded-3xl border border-white/5 overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-700'>
                <div className='relative aspect-[16/10] overflow-hidden'>
                  <Image
                    src={property.images?.[0] || fallbackImage}
                    alt={property.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#151c2e] via-transparent to-transparent' />
                  <div className='absolute top-4 left-4 right-4 flex items-center justify-between'>
                    <Badge className='bg-black/50 backdrop-blur-xl text-white border-white/10 text-xs'>
                      {property.category?.name || 'Property'}
                    </Badge>
                    <div className='flex gap-2'>
                      {property.isFeatured && (
                        <Badge className='bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs'>
                          <Sparkles className='w-3 h-3 mr-1' />
                          Featured
                        </Badge>
                      )}
                      <button className='w-8 h-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors'>
                        <Share2 className='w-3.5 h-3.5 text-white' />
                      </button>
                    </div>
                  </div>
                  <div className='absolute bottom-4 left-4'>
                    <Badge className='bg-emerald-500/20 text-emerald-400 border-emerald-500/30'>
                      <TrendingUp className='w-3 h-3 mr-1' />
                      High Yield
                    </Badge>
                  </div>
                </div>

                <div className='p-6 space-y-4'>
                  <div>
                    <h3 className='text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300'>
                      {property.title}
                    </h3>
                    <p className='text-sm text-white/40 flex items-center gap-1.5 mt-1.5'>
                      <MapPin className='w-3.5 h-3.5' />
                      {property.location}
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-3'>
                    <div className='bg-white/[0.03] rounded-xl p-3'>
                      <p className='text-[10px] text-white/30 uppercase tracking-wider'>
                        Property Value
                      </p>
                      <p className='text-sm font-bold text-white mt-1'>
                        ৳
                        {(
                          (property.pricePerShare * property.totalShares) /
                          100000
                        ).toFixed(0)}
                        L
                      </p>
                    </div>
                    <div className='bg-white/[0.03] rounded-xl p-3'>
                      <p className='text-[10px] text-white/30 uppercase tracking-wider'>
                        Min. Investment
                      </p>
                      <p className='text-sm font-bold text-blue-400 mt-1'>
                        ৳{property.pricePerShare.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='text-white/40'>Funding Progress</span>
                      <span className='text-white font-medium'>
                        {fundedPercentage(property)}%
                      </span>
                    </div>
                    <div className='w-full bg-white/5 rounded-full h-1.5'>
                      <div
                        className='bg-gradient-to-r from-blue-500 to-emerald-400 h-1.5 rounded-full transition-all duration-1000'
                        style={{ width: `${fundedPercentage(property)}%` }}
                      />
                    </div>
                    <div className='flex items-center justify-between text-[10px] text-white/30'>
                      <span>
                        {property.totalShares -
                          (property.availableShares ?? property.totalShares)}
                        /{property.totalShares} shares
                      </span>
                      <span className='flex items-center gap-1'>
                        <Eye className='w-3 h-3' />
                        {property.votes?.total ?? 0}
                      </span>
                    </div>
                  </div>

                  <Button className='w-full bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl py-5 transition-all duration-300 group/btn'>
                    Invest Now
                    <ArrowUpRight className='w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform' />
                  </Button>
                </div>
              </div>
            </Link>
          ))}

          {!isLoading && isError && (
            <div className='md:col-span-2 lg:col-span-4 text-center py-16 text-sm text-white/40'>
              Failed to load properties.
            </div>
          )}

          {!isLoading && !isError && properties.length === 0 && (
            <div className='md:col-span-2 lg:col-span-4 text-center py-16 text-sm text-white/40'>
              No properties found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
