'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const securityNotes = [
  'Single admin environment shared',
  'Frontend and admin both proxy backend requests through /api',
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back. Opening dashboard...');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Unable to sign in with those credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.28),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_24%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-100">
                <Sparkles className="h-4 w-4" />
                Admin experience refresh
              </div>
              <h1 className="mt-8 max-w-xl text-4xl font-semibold leading-tight">
                Nyle Digital admin, refined for calmer operations.
              </h1>
            </div>

            <div className="space-y-4">
              {securityNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-blue-50"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-[var(--color-admin-bg)] px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <Link href={process.env.NEXT_PUBLIC_SITE_URL || "/"} className="mb-10 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-600/20">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  Nyle Digital
                </p>
                <p className="text-sm text-slate-500">Admin portal</p>
              </div>
            </Link>

            <div className="card p-8 sm:p-9">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  Secure access
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                  Sign in to continue
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Use your admin credentials to manage content, contacts, services,
                  and application activity from one shared control surface.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      {...register('email')}
                      type="email"
                      className="input-field pl-12"
                      placeholder="name@nyledigital.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <span className="text-xs font-medium text-blue-700">
                      Protected route
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="input-field pl-12 pr-12"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-3.5"
                >
                  {isLoading ? 'Signing in...' : 'Sign in to dashboard'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </button>
              </form>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <Link
                  href={process.env.NEXT_PUBLIC_SITE_URL || '/'}
                  className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-blue-700"
                >
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back to main website
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              Nyle Digital Solutions admin access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
