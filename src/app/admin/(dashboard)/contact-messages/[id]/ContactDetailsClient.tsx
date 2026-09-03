"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updateContactMessageAction, deleteContactMessageAction } from '../../actions';

export function ContactDetailsClient({ message }: { message: any }) {
  const [status, setStatus] = useState(message.status);
  const [notes, setNotes] = useState(message.admin_notes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContactMessageAction(message.id, status, notes);
      alert('Message updated successfully');
      router.refresh();
    } catch (e) {
      alert('Failed to update message');
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to permanently delete this contact message? This action cannot be undone.')) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      await deleteContactMessageAction(message.id);
      router.push('/admin/contact-messages');
      router.refresh();
    } catch (e) {
      alert('Failed to delete message');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/contact-messages" className="text-gray-500 hover:text-black mb-2 inline-block font-bold uppercase text-xs tracking-wider">
            ← Back to Messages
          </Link>
          <h1 className="text-3xl font-black text-black">Contact Message Details</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Contact Person</label>
                <div className="font-medium text-lg">{message.contact_person}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Company Name</label>
                <div className="font-medium">{message.company_name || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Email</label>
                <div className="font-medium">{message.email}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Phone</label>
                <div className="font-medium">{message.phone}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Project Requirements</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6 border-b pb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Industry</label>
                <div className="font-bold text-[#4A6B35]">{message.industry || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Application</label>
                <div className="font-medium">{message.application || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Mast Height</label>
                <div className="font-medium">{message.mast_height || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Devices (Count & Weight)</label>
                <div className="font-medium">{message.devices_count ? `${message.devices_count} devices` : 'N/A'} {message.devices_weight ? `(${message.devices_weight})` : ''}</div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase">Heard About Us</label>
                <div className="font-medium">{message.hear_about_us || 'N/A'}</div>
              </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Detailed Requirements</label>
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {message.project_requirements || 'No details provided.'}
                </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4">Admin Actions</h2>
            
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4A6B35] bg-gray-50"
              >
                <option value="New">New</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Responded">Responded</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Private Notes</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4A6B35] resize-none bg-gray-50"
                placeholder="Add private notes here..."
              />
            </div>

            <button 
              onClick={handleSave}
              disabled={isSaving || isDeleting}
              className="w-full py-3 bg-black text-white rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 mb-3"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button 
              onClick={handleDelete}
              disabled={isSaving || isDeleting}
              className="w-full py-3 bg-red-50 text-red-600 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-red-100 transition-colors disabled:opacity-50 border border-red-200"
            >
              {isDeleting ? 'Deleting...' : 'Delete Message'}
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-xs text-gray-500">
            <p><strong>Message ID:</strong> <br/>{message.id}</p>
            <p className="mt-2"><strong>Submitted:</strong> <br/>{mounted ? new Date(message.created_at).toLocaleString() : message.created_at.split('T')[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
