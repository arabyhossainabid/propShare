'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGateProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRole?: 'ADMIN' | 'USER';
}

export default function AuthGate({
  children,
  redirectTo = '/auth/login',
  requiredRole,
}: AuthGateProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.replace(user?.role === 'ADMIN' ? '/admin' : '/dashboard');
    }
  }, [
    isAuthenticated,
    isLoading,
    redirectTo,
    requiredRole,
    router,
    user?.role,
  ]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#0a0f1d] pt-24 pb-16'>
        <div className='container-custom'>
          <div className='rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-sm text-white/60'>
            Loading session...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requiredRole && user?.role !== requiredRole) return null;

  return <>{children}</>;
}
