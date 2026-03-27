/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { api, normalizeItem } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import {
  ArrowUpRight,
  Building2,
  Calendar,
  DollarSign,
  Info,
  Users,
  Wallet,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

interface AdminStats {
  counters: {
    totalUsers: number;
    totalProperties: number;
    pendingReview: number;
    approvedProperties: number;
    totalCategories: number;
    totalInvestments: number;
    totalRevenue: number;
  };
  recentProperties: any[];
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
  },
};

export default function AdminPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { data: statsData, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    enabled: isAuthenticated && !isAuthLoading,
    queryFn: async () => {
      const res = await api.get('/admin/stats');
      return normalizeItem<AdminStats>(res?.data?.data);
    },
  });

  const stats = [
    {
      label: 'Total Users',
      value: String(statsData?.counters?.totalUsers ?? 0),
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Total Properties',
      value: String(statsData?.counters?.totalProperties ?? 0),
      icon: Building2,
      color: 'purple',
    },
    {
      label: 'Total Investments',
      value: String(statsData?.counters?.totalInvestments ?? 0),
      icon: Wallet,
      color: 'emerald',
    },
    {
      label: 'Revenue',
      value: `৳${(statsData?.counters?.totalRevenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'amber',
    },
  ];

  useEffect(() => {
    if (!pageRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.admin-stat',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.admin-section',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div ref={pageRef} className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold font-heading'>Admin Dashboard</h1>
        <p className='text-sm text-white/40 mt-1'>
          Platform overview and management controls.
        </p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {stats.map((s) => {
          const Icon = s.icon;
          const c = colorMap[s.color];
          return (
            <div
              key={s.label}
              className='admin-stat bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all duration-300'
            >
              <div className='flex items-center justify-between mb-3'>
                <div
                  className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${c.text}`} />
                </div>
                <span className='text-xs text-emerald-400 font-medium flex items-center gap-1'>
                  <ArrowUpRight className='w-3 h-3' />
                  Live
                </span>
              </div>
              <p className='text-2xl font-bold font-heading'>{s.value}</p>
              <p className='text-xs text-white/30 mt-1'>{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className='grid lg:grid-cols-5 gap-6'>
        {/* Recent Properties Activity */}
        <div className='admin-section lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-2xl p-6'>
          <h3 className='text-base font-bold mb-5'>Recent Properties</h3>
          <div className='space-y-3'>
            {(statsData?.recentProperties || []).map((p: any) => (
              <div
                key={p.id}
                className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-all'
              >
                <div className='w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0'>
                  <Building2 className='w-3 h-3 text-blue-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm text-white truncate'>{p.title}</p>
                  <p className='text-xs text-white/30'>
                    by {p.author?.name} ·{' '}
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge className='bg-white/5 text-white/40 border-white/5 text-[10px]'>
                  {p.category?.name}
                </Badge>
              </div>
            ))}
            {(!statsData?.recentProperties ||
              statsData.recentProperties.length === 0) && (
              <div className='text-center py-8 text-white/20 text-sm'>
                No recent activity
              </div>
            )}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className='admin-section lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6'>
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-base font-bold'>Property Breakdown</h3>
            <Badge className='bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px]'>
              {statsData?.counters?.pendingReview ?? 0} pending
            </Badge>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-3 rounded-xl bg-white/[0.02]'>
              <div className='flex items-center gap-3'>
                <Calendar className='w-4 h-4 text-amber-400' />
                <span className='text-sm text-white'>Pending Review</span>
              </div>
              <span className='text-sm font-bold'>
                {statsData?.counters?.pendingReview ?? 0}
              </span>
            </div>
            <div className='flex items-center justify-between p-3 rounded-xl bg-white/[0.02]'>
              <div className='flex items-center gap-3'>
                <Info className='w-4 h-4 text-emerald-400' />
                <span className='text-sm text-white'>Approved</span>
              </div>
              <span className='text-sm font-bold'>
                {statsData?.counters?.approvedProperties ?? 0}
              </span>
            </div>
            <div className='flex items-center justify-between p-3 rounded-xl bg-white/[0.02]'>
              <div className='flex items-center gap-3'>
                <Building2 className='w-4 h-4 text-purple-400' />
                <span className='text-sm text-white'>Total Listed</span>
              </div>
              <span className='text-sm font-bold'>
                {statsData?.counters?.totalProperties ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
