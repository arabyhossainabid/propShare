'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { getApiErrorMessage } from '@/lib/api';
import gsap from 'gsap';
import {
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  Shield,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
  };

  type FormErrors = Partial<Record<keyof FormState, string>> & {
    submit?: string;
  };

  const router = useRouter();
  const { register } = useAuth();
  const pageRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.auth-left',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
      );

      tl.fromTo(
        '.auth-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      tl.fromTo(
        '.auth-field',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animate step change
  useEffect(() => {
    gsap.fromTo(
      '.step-content',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [currentStep]);

  const setField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = 'Please enter your first name';
    if (!formData.lastName.trim())
      newErrors.lastName = 'Please enter your last name';
    if (!formData.email) newErrors.email = 'Please enter your email';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim())
      newErrors.phone = 'Please enter your phone number';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};
    if (!formData.password) newErrors.password = 'Please enter a password';
    else if (formData.password.length < 8)
      newErrors.password = 'Use at least 8 characters';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms)
      newErrors.agreeTerms = 'Please accept the terms to continue';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (currentStep === 1) {
      const step1Errors = validateStep1();
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        return;
      }
      setCurrentStep(2);
    } else {
      const step2Errors = validateStep2();
      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        return;
      }

      setIsLoading(true);
      try {
        await register({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          phone: formData.phone.trim(),
        });
        toast.success('Registration successful. Please login.');
        router.push('/auth/login');
      } catch (error) {
        const errorMsg =
          getApiErrorMessage(error) || 'Could not create account. Try again.';
        setErrors({ submit: errorMsg });
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const passwordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const strengths = [
      { score: 1, label: 'Weak', color: 'bg-red-500' },
      { score: 2, label: 'Fair', color: 'bg-amber-500' },
      { score: 3, label: 'Good', color: 'bg-blue-500' },
      { score: 4, label: 'Strong', color: 'bg-emerald-500' },
    ];
    return strengths[score - 1] || { score: 0, label: '', color: '' };
  };

  return (
    <div
      ref={pageRef}
      className='min-h-screen bg-[#0a0f1d] flex items-center justify-center p-6 relative overflow-hidden'
    >
      {/* Background */}
      <div className='absolute top-[15%] right-[5%] w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px]' />
      <div className='absolute bottom-[15%] left-[5%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]' />
      <div className='absolute inset-0 grid-pattern opacity-20' />

      <div className='relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-0'>
        {/* Left Side */}
        <div className='auth-left hidden lg:flex flex-col justify-center pr-16 space-y-8'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20'>
              <Building2 className='w-6 h-6 text-white' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold tracking-tight font-heading'>
                Prop<span className='text-blue-500'>Share</span>
              </span>
              <span className='text-[9px] uppercase tracking-[0.3em] text-white/30 -mt-0.5'>
                Protocol
              </span>
            </div>
          </Link>

          <div className='space-y-4'>
            <h1 className='text-4xl lg:text-5xl font-bold font-heading leading-tight'>
              Start Your{' '}
              <span className='gradient-text'>Investment Journey</span>
            </h1>
            <p className='text-white/40 text-lg leading-relaxed max-w-md'>
              Create your account in just 2 minutes and unlock access to premium
              real estate investment opportunities.
            </p>
          </div>

          {/* Benefits */}
          <div className='space-y-4 pt-4'>
            {[
              { icon: Shield, text: 'Verified & RERA-compliant properties' },
              { icon: TrendingUp, text: '15-25% average annual returns' },
              { icon: Users, text: 'Join 2,500+ smart investors' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0'>
                    <Icon className='w-4 h-4 text-emerald-400' />
                  </div>
                  <span className='text-sm text-white/50'>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Register Card */}
        <div className='auth-card'>
          <div className='bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 shadow-3xl'>
            {/* Mobile Logo */}
            <div className='flex lg:hidden items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center'>
                <Building2 className='w-5 h-5 text-white' />
              </div>
              <span className='text-lg font-bold font-heading'>
                Prop<span className='text-blue-500'>Share</span>
              </span>
            </div>

            {/* Steps Indicator */}
            <div className='auth-field flex items-center gap-3 mb-8'>
              {[1, 2].map((step) => (
                <div key={step} className='flex items-center gap-3 flex-1'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
                      currentStep >= step
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 text-white/30 border border-white/10'
                    }`}
                  >
                    {currentStep > step ? (
                      <Check className='w-3.5 h-3.5' />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 2 && (
                    <div className='flex-1 h-0.5 rounded-full bg-white/5'>
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          currentStep > 1
                            ? 'bg-blue-500 w-full'
                            : 'bg-transparent w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className='space-y-1 mb-6'>
              <h2 className='text-2xl font-bold font-heading'>
                {currentStep === 1 ? 'Personal Info' : 'Secure Your Account'}
              </h2>
              <p className='text-sm text-white/40'>
                {currentStep === 1
                  ? 'Tell us about yourself to get started'
                  : 'Create a strong password to protect your investments'}
              </p>
            </div>

            {/* Social Login (Step 1 only) */}

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {errors.submit && (
                <div className='auth-field p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-sm mb-4'>
                  <div className='w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5'>
                    <span className='text-red-400 font-bold text-xs'>!</span>
                  </div>
                  <p className='text-red-400'>{errors.submit}</p>
                </div>
              )}
              <div className='step-content'>
                {currentStep === 1 ? (
                  <>
                    <div className='grid grid-cols-2 gap-3 mb-4'>
                      <div className='auth-field space-y-2'>
                        <label className='text-xs text-white/40 uppercase tracking-wider font-medium'>
                          First Name
                        </label>
                        <div className='relative'>
                          <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20' />
                          <Input
                            placeholder='John'
                            value={formData.firstName}
                            onChange={(e) =>
                              setField('firstName', e.target.value)
                            }
                            className={`bg-white/5 rounded-xl pl-10 py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 ${errors.firstName ? 'border-red-500/50 focus-visible:border-red-500/50' : 'border-white/10 focus-visible:border-blue-500/30'}`}
                          />
                        </div>
                        {errors.firstName && (
                          <p className='text-[10px] text-red-400 pl-1'>
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className='auth-field space-y-2'>
                        <label className='text-xs text-white/40 uppercase tracking-wider font-medium'>
                          Last Name
                        </label>
                        <Input
                          placeholder='Doe'
                          value={formData.lastName}
                          onChange={(e) => setField('lastName', e.target.value)}
                          className={`bg-white/5 rounded-xl py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 ${errors.lastName ? 'border-red-500/50 focus-visible:border-red-500/50' : 'border-white/10 focus-visible:border-blue-500/30'}`}
                        />
                        {errors.lastName && (
                          <p className='text-[10px] text-red-400 pl-1'>
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='auth-field space-y-2 mb-4'>
                      <label className='text-xs text-white/40 uppercase tracking-wider font-medium'>
                        Email Address
                      </label>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20' />
                        <Input
                          type='email'
                          placeholder='you@example.com'
                          value={formData.email}
                          onChange={(e) => setField('email', e.target.value)}
                          className={`bg-white/5 rounded-xl pl-10 py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 ${errors.email ? 'border-red-500/50 focus-visible:border-red-500/50' : 'border-white/10 focus-visible:border-blue-500/30'}`}
                        />
                      </div>
                      {errors.email && (
                        <p className='text-[10px] text-red-400 pl-1'>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className='auth-field space-y-2'>
                      <label className='text-xs text-white/40 uppercase tracking-wider font-medium'>
                        Phone Number
                      </label>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20' />
                        <Input
                          placeholder='+880 1XXXXXXXXX'
                          value={formData.phone}
                          onChange={(e) => setField('phone', e.target.value)}
                          className={`bg-white/5 rounded-xl pl-10 py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 ${errors.phone ? 'border-red-500/50 focus-visible:border-red-500/50' : 'border-white/10 focus-visible:border-blue-500/30'}`}
                        />
                      </div>
                      {errors.phone && (
                        <p className='text-[10px] text-red-400 pl-1'>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className='space-y-2 mb-4'>
                      <label className='text-xs text-white/40 uppercase tracking-wider font-medium'>
                        Password
                      </label>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20' />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Min. 8 characters'
                          value={formData.password}
                          onChange={(e) => setField('password', e.target.value)}
                          className={`bg-white/5 rounded-xl pl-10 pr-10 py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 ${errors.password ? 'border-red-500/50 focus-visible:border-red-500/50' : 'border-white/10 focus-visible:border-blue-500/30'}`}
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors'
                        >
                          {showPassword ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className='text-[10px] text-red-400 pl-1'>
                          {errors.password}
                        </p>
                      )}

                      {/* Password Strength */}
                      {formData.password && !errors.password && (
                        <div className='flex items-center gap-2 mt-2'>
                          <div className='flex gap-1 flex-1'>
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                  i <= passwordStrength().score
                                    ? passwordStrength().color
                                    : 'bg-white/5'
                                }`}
                              />
                            ))}
                          </div>
                          <span className='text-[10px] text-white/40 uppercase tracking-wider'>
                            {passwordStrength().label}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className='space-y-2 mb-4'>
                      <label className='text-xs text-white/40 uppercase tracking-wider font-medium'>
                        Confirm Password
                      </label>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20' />
                        <Input
                          type='password'
                          placeholder='Re-enter your password'
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setField('confirmPassword', e.target.value)
                          }
                          className={`bg-white/5 rounded-xl pl-10 py-5 text-white placeholder:text-white/20 focus-visible:ring-blue-500/30 ${errors.confirmPassword ? 'border-red-500/50 focus-visible:border-red-500/50' : 'border-white/10 focus-visible:border-blue-500/30'}`}
                        />
                        {formData.confirmPassword &&
                          formData.password === formData.confirmPassword && (
                            <Check className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400' />
                          )}
                      </div>
                      {errors.confirmPassword && (
                        <p className='text-[10px] text-red-400 pl-1'>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-start gap-3'>
                        <input
                          type='checkbox'
                          id='terms'
                          checked={formData.agreeTerms}
                          onChange={(e) =>
                            setField('agreeTerms', e.target.checked)
                          }
                          className='w-4 h-4 mt-0.5 rounded bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500/30'
                        />
                        <label
                          htmlFor='terms'
                          className='text-xs text-white/40 leading-relaxed'
                        >
                          I agree to the{' '}
                          <Link
                            href='/terms'
                            className='text-blue-400 hover:text-blue-300'
                          >
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link
                            href='/privacy'
                            className='text-blue-400 hover:text-blue-300'
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      {errors.agreeTerms && (
                        <p className='text-[10px] text-red-400 pl-7'>
                          {errors.agreeTerms}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Buttons */}
              <div className='flex gap-3 pt-2'>
                {currentStep === 2 && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setCurrentStep(1)}
                    className='border-white/10 text-white hover:bg-white/5 rounded-xl py-5 px-6'
                  >
                    Back
                  </Button>
                )}
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-5 text-sm font-semibold shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 group disabled:opacity-50'
                >
                  {isLoading ? (
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                  ) : currentStep === 1 ? (
                    <>
                      Continue
                      <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Login Link */}
            <div className='text-center mt-6 pt-5 border-t border-white/5'>
              <p className='text-sm text-white/40'>
                Already have an account?{' '}
                <Link
                  href='/auth/login'
                  className='text-blue-400 hover:text-blue-300 font-medium transition-colors'
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
