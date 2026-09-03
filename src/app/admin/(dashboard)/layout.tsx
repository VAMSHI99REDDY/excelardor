import React from 'react';
import Link from 'next/link';
import { SecurityEnforcer } from './SessionKiller';
import { LogoutButton } from './LogoutButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-[140px] bg-gray-50 flex flex-col md:flex-row font-sans">
      <SecurityEnforcer />
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link href="/admin">
            <h1 className="text-xl font-black text-[#4A6B35]">ExcelArdor Admin</h1>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium text-gray-700">
            Dashboard
          </Link>
          <Link href="/admin/applications" className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium text-gray-700">
            Job Applications
          </Link>
          <Link href="/admin/contact-messages" className="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium text-gray-700">
            Contact Messages
          </Link>
          <div className="pt-4 mt-4 border-t border-gray-200">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
