import { createServerComponentClient } from '@/utils/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
  const supabase = createServerComponentClient();

  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-4 text-red-500">Error loading applications</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 text-black">Job Applications</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Position</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications?.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-black">{app.full_name}</div>
                    <div className="text-sm text-gray-500">{app.email}</div>
                  </td>
                  <td className="p-4 text-gray-800 font-medium">{app.position_applied}</td>
                  <td className="p-4 text-gray-600">{app.years_experience}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      app.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Reviewing' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Selected' ? 'bg-green-100 text-green-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Link href={`/admin/applications/${app.id}`} className="text-[#4A6B35] hover:text-green-800 font-bold text-sm uppercase tracking-wider">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
              {(!applications || applications.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
