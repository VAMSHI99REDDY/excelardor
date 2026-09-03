"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updateApplicationAction, deleteApplicationAction } from '../../actions';

export function ApplicationDetailsClient({ application, resumeUrl }: { application: any, resumeUrl: string | null }) {
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.admin_notes || '');
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
      await updateApplicationAction(application.id, status, notes);
      alert('Application updated successfully');
      router.refresh();
    } catch (e) {
      alert('Failed to update application');
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to permanently delete this application? This will also delete the uploaded resume PDF. This action cannot be undone.')) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      await deleteApplicationAction(application.id, application.resume_file_path);
      router.push('/admin/applications');
      router.refresh();
    } catch (e) {
      alert('Failed to delete application');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/applications" className="text-gray-500 hover:text-black mb-2 inline-block font-bold uppercase text-xs tracking-wider">
            ← Back to Applications
          </Link>
          <h1 className="text-3xl font-black text-black">Application Details</h1>
        </div>
        <div className="flex gap-4">
          {resumeUrl && (
            <a 
              href={resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#4A6B35] text-white rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-green-800 transition-colors"
            >
              Download Resume
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Applicant Information</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <div className="font-medium text-lg">{application.full_name}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Email</label>
                <div className="font-medium">{application.email}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Phone</label>
                <div className="font-medium">{application.phone}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Location</label>
                <div className="font-medium">{application.city}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Professional Details</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Position Applied</label>
                <div className="font-bold text-[#4A6B35]">{application.position_applied}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Experience</label>
                <div className="font-medium">{application.years_experience}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Current Company</label>
                <div className="font-medium">{application.current_company || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Cover Message</h2>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {application.cover_message || 'No cover message provided.'}
            </p>
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
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
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
              {isDeleting ? 'Deleting...' : 'Delete Application'}
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-xs text-gray-500">
            <p><strong>App ID:</strong> <br/>{application.id}</p>
            <p className="mt-2"><strong>Submitted:</strong> <br/>{mounted ? new Date(application.created_at).toLocaleString() : application.created_at.split('T')[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
