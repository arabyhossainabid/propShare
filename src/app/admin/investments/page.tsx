'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { api, normalizeList } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

type AdminInvestment = {
  id: string;
  amount: number;
  shares: number;
  status: string;
  createdAt: string;
  user?: {
    name?: string;
    email?: string;
  };
  property?: {
    title?: string;
  };
};

const statusStyles: Record<string, string> = {
  confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function AdminInvestmentsPage() {
  const [search, setSearch] = useState('');
  const {
    data: investments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['admin-investments'],
    queryFn: async () => {
      const res = await api.get<{
        success: true;
        message: string;
        data: { data?: AdminInvestment[] } | AdminInvestment[];
      }>('/admin/investments', {
        params: { limit: 200 },
      });

      return normalizeList<AdminInvestment>(res.data.data);
    },
    refetchOnMount: 'always',
  });

  const filtered = investments.filter((i) => {
    const userName = i.user?.name || 'Unknown Investor';
    const propertyTitle = i.property?.title || 'Unknown Property';
    return (
      userName.toLowerCase().includes(search.toLowerCase()) ||
      propertyTitle.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalVolume = filtered.reduce((sum, i) => sum + (i.amount || 0), 0);
  const successfulRounds = filtered.filter(
    (i) => i.status?.toLowerCase() === 'success'
  ).length;
  const pendingRounds = filtered.filter(
    (i) => i.status?.toLowerCase() === 'pending'
  ).length;

  const showTable = !isLoading && !isError && filtered.length > 0;

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold font-heading'>
            Investment Monitoring
          </h1>
          <p className='text-sm text-white/40 mt-1'>
            Track all platform-wide investments and transactions.
          </p>
        </div>
        <div className='flex gap-2'>
          <Badge className='bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] py-1'>
            ৳{totalVolume.toLocaleString()} Total Volume
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {[
          {
            label: 'Pending Investments',
            value: pendingRounds.toString(),
            icon: ClockIcon,
            color: 'amber',
          },
          {
            label: 'Successful Rounds',
            value: successfulRounds.toString(),
            icon: TrendingUp,
            color: 'emerald',
          },
          {
            label: 'Total Records',
            value: filtered.length.toString(),
            icon: ArrowUpRight,
            color: 'blue',
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className='bg-white/[0.02] border border-white/5 rounded-2xl p-5'
            >
              <div className='flex items-center gap-2 mb-2'>
                <Icon
                  className={`w-4 h-4 ${s.color === 'emerald' ? 'text-emerald-400' : s.color === 'amber' ? 'text-amber-400' : 'text-blue-400'}`}
                />
                <span className='text-[10px] text-white/30 uppercase tracking-widest font-bold font-heading'>
                  {s.label}
                </span>
              </div>
              <p className='text-2xl font-bold font-heading'>{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Search + Filter */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20' />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by user or property...'
          className='bg-white/5 border-white/10 rounded-xl pl-10 py-5 text-white focus-visible:ring-blue-500/30'
        />
      </div>

      {isLoading && (
        <div className='space-y-3'>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={`admin-investment-skeleton-${idx}`}
              className='bg-white/[0.02] border border-white/5 rounded-2xl p-5 animate-pulse'
            >
              <div className='flex items-center justify-between gap-4'>
                <div className='space-y-2 flex-1'>
                  <div className='h-4 w-1/3 rounded bg-white/[0.07]' />
                  <div className='h-3 w-1/2 rounded bg-white/[0.05]' />
                </div>
                <div className='h-8 w-20 rounded bg-white/[0.08]' />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className='text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl'>
          <p className='text-white/30 text-sm'>
            Could not load investment records. Please try again.
          </p>
        </div>
      )}

      {/* Investments List */}
      {showTable && (
        <div className='bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-white/5 bg-white/[0.01]'>
                  <th className='text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5'>
                    Investor
                  </th>
                  <th className='text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5'>
                    Property
                  </th>
                  <th className='text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5'>
                    Amount
                  </th>
                  <th className='text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5'>
                    Status
                  </th>
                  <th className='text-left text-xs text-white/30 uppercase tracking-wider font-medium px-6 py-5'>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className='border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors'
                  >
                    <td className='px-6 py-5'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-400'>
                          U
                        </div>
                        <p className='text-sm font-medium text-white'>
                          {inv.user?.name || 'Unknown Investor'}
                        </p>
                      </div>
                    </td>
                    <td className='px-6 py-5'>
                      <p className='text-sm text-white/60 max-w-[200px] truncate'>
                        {inv.property?.title || 'Unknown Property'}
                      </p>
                      <p className='text-[10px] text-white/20 mt-0.5'>
                        {inv.shares} shares
                      </p>
                    </td>
                    <td className='px-6 py-5'>
                      <p className='text-sm font-bold text-white'>
                        ৳{(inv.amount || 0).toLocaleString()}
                      </p>
                      <p className='text-[10px] text-white/30 mt-0.5'>
                        {inv.id}
                      </p>
                    </td>
                    <td className='px-6 py-5'>
                      <Badge
                        className={`text-[10px] ${statusStyles[inv.status?.toLowerCase()] || 'bg-white/10 text-white border-white/20'}`}
                      >
                        {inv.status}
                      </Badge>
                    </td>
                    <td className='px-6 py-5 text-xs text-white/30'>
                      {new Date(inv.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className='text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl'>
          <p className='text-white/20 text-sm'>No investment records found.</p>
        </div>
      )}
    </div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}
