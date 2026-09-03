import { createServerComponentClient } from '@/utils/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ContactMessagesPage() {
  const supabase = createServerComponentClient();

  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-4 text-red-500">Error loading contact messages</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 text-black">Contact Messages</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages?.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-black">{msg.contact_person}</div>
                    <div className="text-sm text-gray-500">{msg.email}</div>
                  </td>
                  <td className="p-4 text-gray-800 font-medium">{msg.company_name || 'N/A'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      msg.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      msg.status === 'Reviewing' ? 'bg-yellow-100 text-yellow-800' :
                      msg.status === 'Responded' ? 'bg-green-100 text-green-800' :
                      msg.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Link href={`/admin/contact-messages/${msg.id}`} className="text-[#4A6B35] hover:text-green-800 font-bold text-sm uppercase tracking-wider">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
              {(!messages || messages.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No contact messages found.
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
