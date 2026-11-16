"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/utils/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      sessionStorage.setItem('admin_session_active', 'true');
      router.push('/admin');
      router.refresh();
    }
  };

  const handleAutoSetup = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/setup-admin');
      const data = await res.json();
      if (data.success) {
        setEmail(data.email);
        setPassword(data.password);
        alert(`Admin account created successfully!\n\nEmail: ${data.email}\nPassword: ${data.password}\n\nClick 'Login' now.`);
      } else {
        setError(data.error || 'Failed to initialize admin');
      }
    } catch (err: any) {
      setError(err?.message || 'Error initializing admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-black text-center mb-8">Admin Login</h1>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4A6B35]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4A6B35]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A6B35] text-white font-bold uppercase tracking-widest text-sm py-4 rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <button
            type="button"
            onClick={handleAutoSetup}
            disabled={loading}
            className="text-xs text-[#4A6B35] font-bold hover:underline py-1"
          >
            ⚡ First time? Click here to auto-create admin login
          </button>
        </div>
      </div>
    </div>
  );
}
