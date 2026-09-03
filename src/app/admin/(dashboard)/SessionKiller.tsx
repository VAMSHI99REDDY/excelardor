"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/utils/supabase/client';

export function SecurityEnforcer() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const hasChecked = useRef(false);

  useEffect(() => {
    // Only check once per hard page load, and only on protected routes
    if (hasChecked.current || pathname === '/admin/login') return;
    hasChecked.current = true;

    const isNewTab = !sessionStorage.getItem('admin_session_active');

    if (isNewTab) {
      sessionStorage.removeItem('admin_session_active');
      supabase.auth.signOut().then(() => {
        router.push('/admin/login');
        router.refresh();
      });
    }
  }, [pathname, router, supabase]);

  return null;
}
