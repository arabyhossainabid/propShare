'use client';

import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  Building2,
  FileCheck2,
  Globe,
  Heart,
  Landmark,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data: aboutStats } = useQuery({
    queryKey: ['about-admin-stats'],
    queryFn: async () => {
      try {
        const res = await api.get<{
          success: true;
          message: string;
          data: {
            foundedYear?: number;
            teamMembers?: number;
            cities?: number;
            awards?: number;
          };
        }>('/admin/stats/about');

        return res.data.data;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const stats = [
    ...(typeof aboutStats?.foundedYear === 'number'
      ? [
          {
            value: String(aboutStats.foundedYear),
            label: 'Founded',
            icon: Building2,
          },
        ]
      : []),
    ...(typeof aboutStats?.teamMembers === 'number'
      ? [
          {
            value: `${aboutStats.teamMembers}+`,
            label: 'Team Members',
            icon: Users,
          },
        ]
      : []),
    ...(typeof aboutStats?.cities === 'number'
      ? [
          {
            value: `${aboutStats.cities}+`,
            label: 'Cities Active',
            icon: Globe,
          },
        ]
      : []),
    ...(typeof aboutStats?.awards === 'number'
      ? [
          {
            value: `${aboutStats.awards}+`,
            label: 'Industry Awards',
            icon: Award,
          },
        ]
      : []),
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-hero-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.about-hero-image',
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.mission-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mission-grid',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.trust-card',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trust-grid',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.team-stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-stats',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className='min-h-screen bg-[#0a0f1d] overflow-x-hidden'
    >
      {/* About Hero */}
      <section className='pt-28 pb-20'>
        <div className='container-custom'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
            <div className='about-hero-content space-y-8'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20'>
                <Heart className='w-3 h-3 text-blue-400' />
                <span className='text-xs font-medium text-blue-400 uppercase tracking-wider'>
                  Our Story
                </span>
              </div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight'>
                Democratizing <span className='gradient-text'>Real Estate</span>{' '}
                Investment
              </h1>
              <p className='text-lg text-white/50 leading-relaxed max-w-lg'>
                PropShare was born from a simple idea — everyone should have
                access to premium real estate investments, not just the wealthy
                few. We&apos;re building the future of property ownership
                through technology.
              </p>
              <p className='text-white/40 leading-relaxed'>
                Founded in 2024, our platform enables fractional ownership of
                institutional-grade properties across Bangladesh. With
                bank-grade security, full legal compliance, and a transparent
                marketplace, we&apos;re making real estate investment accessible
                to everyone.
              </p>
            </div>

            <div className='about-hero-image relative hidden lg:block'>
              <div className='relative rounded-3xl overflow-hidden gradient-border'>
                <div className='aspect-[4/3] relative'>
                  <Image
                    src='/property-interior.png'
                    alt='About PropShare'
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-50' />
                </div>
              </div>

              {/* Floating badge */}
              <div className='absolute -bottom-6 -left-6 glass rounded-2xl p-5 animate-float shadow-2xl'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center'>
                    <Award className='w-6 h-6 text-blue-400' />
                  </div>
                  <div>
                    <p className='text-sm font-bold text-white'>
                      RERA Approved
                    </p>
                    <p className='text-xs text-white/40'>Fully Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className='py-20'>
        <div className='container-custom'>
          <div className='mission-grid grid md:grid-cols-3 gap-6'>
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description:
                  'To democratize real estate investment and make premium property ownership accessible to every individual in Bangladesh.',
                color: 'blue',
              },
              {
                icon: Rocket,
                title: 'Our Vision',
                description:
                  "To become South Asia's leading fractional real estate platform, transforming how people build wealth through property.",
                color: 'emerald',
              },
              {
                icon: Heart,
                title: 'Our Values',
                description:
                  'Transparency, security, and inclusion drive every decision we make. Your trust is our most valued asset.',
                color: 'purple',
              },
            ].map((item) => {
              const Icon = item.icon;
              const bgColor =
                item.color === 'blue'
                  ? 'bg-blue-500/10'
                  : item.color === 'emerald'
                    ? 'bg-emerald-500/10'
                    : 'bg-purple-500/10';
              const textColor =
                item.color === 'blue'
                  ? 'text-blue-400'
                  : item.color === 'emerald'
                    ? 'text-emerald-400'
                    : 'text-purple-400';
              const borderColor =
                item.color === 'blue'
                  ? 'border-blue-500/20'
                  : item.color === 'emerald'
                    ? 'border-emerald-500/20'
                    : 'border-purple-500/20';

              return (
                <div key={item.title} className='mission-card'>
                  <div className='bg-white/[0.02] border border-white/5 rounded-3xl p-8 h-full hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500'>
                    <div
                      className={`w-14 h-14 rounded-2xl ${bgColor} border ${borderColor} flex items-center justify-center mb-6`}
                    >
                      <Icon className={`w-6 h-6 ${textColor}`} />
                    </div>
                    <h3 className='text-xl font-bold text-white mb-3'>
                      {item.title}
                    </h3>
                    <p className='text-sm text-white/40 leading-relaxed'>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className='py-20'>
        <div className='container-custom'>
          <div className='rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-blue-500/[0.06] to-emerald-500/[0.05] p-8 md:p-12'>
            <div className='mb-10 md:mb-12 max-w-2xl'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4'>
                <ShieldCheck className='w-3 h-3 text-emerald-400' />
                <span className='text-xs font-medium text-emerald-400 uppercase tracking-wider'>
                  Investor Protection
                </span>
              </div>
              <h2 className='text-3xl md:text-4xl font-bold font-heading'>
                Built On <span className='gradient-text'>Trust</span> And
                Transparency
              </h2>
              <p className='text-white/45 mt-4 leading-relaxed'>
                From property verification to legal compliance, every investment
                on PropShare follows a structured review process so investors
                can make decisions with confidence.
              </p>
            </div>

            <div className='trust-grid grid md:grid-cols-3 gap-5'>
              {[
                {
                  icon: FileCheck2,
                  title: 'Verified Documentation',
                  desc: 'Every listing goes through document and ownership checks before publication.',
                  tone: 'blue',
                },
                {
                  icon: Landmark,
                  title: 'Regulatory Compliance',
                  desc: 'Operations are aligned with applicable legal and financial compliance practices.',
                  tone: 'emerald',
                },
                {
                  icon: ShieldCheck,
                  title: 'Secure Transactions',
                  desc: 'Payments and account actions are protected with secure, audited workflows.',
                  tone: 'amber',
                },
              ].map((item) => {
                const Icon = item.icon;
                const toneClass =
                  item.tone === 'blue'
                    ? 'text-blue-400 bg-blue-500/12 border-blue-500/25'
                    : item.tone === 'emerald'
                      ? 'text-emerald-400 bg-emerald-500/12 border-emerald-500/25'
                      : 'text-amber-400 bg-amber-500/12 border-amber-500/25';

                return (
                  <div
                    key={item.title}
                    className='trust-card rounded-2xl border border-white/10 bg-[#111a2c]/75 p-6 hover:bg-[#15213a] transition-colors duration-300'
                  >
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center ${toneClass}`}
                    >
                      <Icon className='w-5 h-5' />
                    </div>
                    <h3 className='text-lg font-semibold text-white mt-4'>
                      {item.title}
                    </h3>
                    <p className='text-sm text-white/45 mt-2 leading-relaxed'>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      {stats.length > 0 && (
        <section className='py-20'>
          <div className='container-custom'>
            <div className='glass rounded-3xl p-10 md:p-14 gradient-border'>
              <div className='team-stats grid grid-cols-2 md:grid-cols-4 gap-8'>
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className='team-stat text-center space-y-3'
                    >
                      <div className='w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto'>
                        <Icon className='w-5 h-5 text-blue-400' />
                      </div>
                      <p className='text-3xl md:text-4xl font-bold font-heading text-white'>
                        {stat.value}
                      </p>
                      <p className='text-xs text-white/40 uppercase tracking-wider'>
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
