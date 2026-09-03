import { createServerComponentClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = createServerComponentClient();

  // Fetch applications statistics
  const { data: applications, error: appsError } = await supabase
    .from('applications')
    .select('status, id');

  // Fetch contact messages statistics
  const { data: contacts, error: contactsError } = await supabase
    .from('contact_messages')
    .select('status, id');

  const appStats = {
    total: applications?.length || 0,
    new: applications?.filter(a => a.status === 'New').length || 0,
    reviewing: applications?.filter(a => a.status === 'Reviewing').length || 0,
    shortlisted: applications?.filter(a => a.status === 'Shortlisted').length || 0,
    interview: applications?.filter(a => a.status === 'Interview').length || 0,
    selected: applications?.filter(a => a.status === 'Selected').length || 0,
    rejected: applications?.filter(a => a.status === 'Rejected').length || 0,
  };

  const contactStats = {
    total: contacts?.length || 0,
    new: contacts?.filter(c => c.status === 'New').length || 0,
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 text-black">Dashboard</h1>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-gray-700 uppercase">Job Applications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Applications" value={appStats.total} color="bg-gray-100 text-gray-800" />
          <StatCard title="New" value={appStats.new} color="bg-blue-100 text-blue-800" />
          <StatCard title="Reviewing" value={appStats.reviewing} color="bg-yellow-100 text-yellow-800" />
          <StatCard title="Shortlisted" value={appStats.shortlisted} color="bg-purple-100 text-purple-800" />
          <StatCard title="Interview" value={appStats.interview} color="bg-indigo-100 text-indigo-800" />
          <StatCard title="Selected" value={appStats.selected} color="bg-green-100 text-green-800" />
          <StatCard title="Rejected" value={appStats.rejected} color="bg-red-100 text-red-800" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-700 uppercase">Contact Messages</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Inquiries" value={contactStats.total} color="bg-gray-100 text-gray-800" />
          <StatCard title="New" value={contactStats.new} color="bg-blue-100 text-blue-800" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string, value: number, color: string }) {
  return (
    <div className={`p-6 rounded-2xl ${color}`}>
      <h3 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">{title}</h3>
      <p className="text-4xl font-black">{value}</p>
    </div>
  );
}
