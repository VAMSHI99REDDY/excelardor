"use client";

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/utils/supabase/client';

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    sessionStorage.removeItem('admin_session_active');
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 mt-4 rounded-lg hover:bg-red-50 hover:text-red-700 font-medium text-gray-700 transition-colors"
    >
      Logout
    </button>
  );
}
