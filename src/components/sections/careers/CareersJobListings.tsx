"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Briefcase, Clock, Building2, UploadCloud, CheckCircle2, X } from "lucide-react";

// --- Data Models ---
type Job = {
  id: string;
  title: string;
  experience: string;
  department: string;
  location: string;
  type: string;
  description: string[];
  skills: string;
};

const JOBS: Job[] = [
  {
    id: "design-engineer",
    title: "Design Engineer / Quality Engineer",
    experience: "1–3 Years",
    department: "Engineering",
    location: "Hyderabad",
    type: "Full Time",
    description: [
      "Prepare engineering drawings.",
      "Perform quality inspections.",
      "Maintain documentation.",
      "Coordinate with production teams."
    ],
    skills: "AutoCAD, Engineering Drawings, Quality Inspection, Problem Solving.",
  },
  {
    id: "cnc-programmer",
    title: "CNC Programmer / CNC Operator",
    experience: "2–10 Years",
    department: "Production",
    location: "Hyderabad",
    type: "Full Time",
    description: [
      "Program CNC machines.",
      "Operate machining centers.",
      "Maintain machining quality.",
      "Optimize machining processes."
    ],
    skills: "CNC Programming, Fanuc, Siemens, G-Code, Machine Setup.",
  },
  {
    id: "cnc-edm",
    title: "CNC EDM / Wire Cut Operator",
    experience: "1–5 Years",
    department: "Manufacturing",
    location: "Hyderabad",
    type: "Full Time",
    description: [
      "Operate EDM and Wire Cut machines.",
      "Read technical drawings.",
      "Ensure machining accuracy.",
      "Perform preventive maintenance."
    ],
    skills: "EDM, Wire Cut, Precision Machining, Engineering Drawings.",
  },
  {
    id: "helpers",
    title: "Helpers",
    experience: "0 Years (Freshers Welcome)",
    department: "Production",
    location: "Hyderabad",
    type: "Full Time",
    description: [
      "Assist production staff.",
      "Material handling.",
      "Machine support.",
      "Maintain workplace cleanliness."
    ],
    skills: "Hardworking, Teamwork, Willingness to Learn.",
  }
];

const FILTERS = ["All Jobs", "Engineering", "Manufacturing", "Production"];

// --- Main Component ---
const CareersJobListings = () => {
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = JOBS.filter(job =>
    activeFilter === "All Jobs" ? true : job.department === activeFilter
  );

  return (
    <section id="job-openings" className="w-full bg-gray-50 py-24 relative min-h-screen">

      {/* Banner */}
      <div className="max-w-[1920px] mx-auto px-5 md:px-10 mb-16">
        <div className="bg-[#4A6B35] rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Join Excel Ardor and build the future of precision engineering.
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">Open Positions</h2>
            <span className="px-4 py-1.5 bg-[#4A6B35]/10 text-[#4A6B35] font-bold text-sm rounded-full">
              {filteredJobs.length} Active {filteredJobs.length === 1 ? 'Opening' : 'Openings'}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeFilter === f
                  ? "bg-[#4A6B35] text-white shadow-md"
                  : "bg-white text-gray-500 hover:bg-gray-200"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={job.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-black leading-tight">
                      {job.title}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full shrink-0">
                      Hiring Now
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5"><Briefcase size={16} /> {job.experience}</div>
                    <div className="flex items-center gap-1.5"><Building2 size={16} /> {job.department}</div>
                    <div className="flex items-center gap-1.5"><Clock size={16} /> {job.type}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-black mb-2 uppercase tracking-wide">Responsibilities:</p>
                    <ul className="text-gray-600 text-sm space-y-1 mb-4">
                      {job.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4A6B35] mt-1.5 shrink-0" />
                          {desc}
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm font-bold text-black mb-1 uppercase tracking-wide">Skills Required:</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{job.skills}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full py-4 bg-gray-100 text-black font-bold uppercase tracking-widest text-sm rounded-xl group-hover:bg-[#4A6B35] group-hover:text-white transition-colors duration-300"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Application Modal Component ---
const ApplicationModal = ({ job, onClose }: { job: Job, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    company: "",
    location: "",
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.location) newErrors.location = "Current location is required";
    if (!file) newErrors.file = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      const subject = `Job Application - ${job.title} - ${formData.name}`;
      const body = `Dear Hiring Team,

Please find my job application details below.

---------------------------------------
Candidate Details
---------------------------------------

Full Name:
${formData.name}

Email:
${formData.email}

Phone:
${formData.phone}

Position Applied:
${job.title}

Years of Experience:
${formData.experience}

Current Company:
${formData.company || "N/A"}

Current Location:
${formData.location}

Cover Letter:
${formData.message || "N/A"}

Thank you.

Regards,
${formData.name}`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=excelardor@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, "_blank");

      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-[95%] md:max-w-[700px] lg:max-w-[900px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
      >
        {/* Fixed Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-5 md:px-8 md:py-6 flex justify-between items-start shrink-0 z-10">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-black tracking-tight mb-1 pr-8">Apply for {job.title}</h3>
            <p className="text-gray-500 font-medium text-sm">Please fill out the form below. All fields marked with * are required.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shrink-0 ml-4 absolute top-5 right-5 md:top-6 md:right-8"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            {/* Scrollable Form Body */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 min-h-0 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-4 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:border-[#4A6B35] transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-4 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:border-[#4A6B35] transition-colors`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full p-4 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:border-[#4A6B35] transition-colors`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Position</label>
                  <input
                    type="text"
                    disabled
                    value={job.title}
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Years of Exp *</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className={`w-full p-4 rounded-xl border ${errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:border-[#4A6B35] transition-colors`}
                    placeholder="e.g. 3 Years"
                  />
                  {errors.experience && <p className="text-red-500 text-xs mt-1 font-medium">{errors.experience}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Current Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#4A6B35] transition-colors"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full p-4 rounded-xl border ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:border-[#4A6B35] transition-colors`}
                    placeholder="City, State"
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1 font-medium">{errors.location}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Resume Upload * (PDF/DOCX)</label>
                <div className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer relative ${errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud size={32} className={file ? "text-[#4A6B35] mb-2" : "text-gray-400 mb-2"} />
                  <span className="text-sm font-medium text-gray-600">
                    {file ? file.name : "Click or drag file to this area to upload"}
                  </span>
                </div>
                {errors.file && <p className="text-red-500 text-xs mt-1 font-medium">{errors.file}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Cover Letter / Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#4A6B35] transition-colors resize-none"
                  placeholder="Tell us why you'd be a good fit..."
                />
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="bg-white border-t border-gray-100 p-6 md:p-8 shrink-0 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 md:py-5 bg-[#4A6B35] text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-green-800 transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 overflow-y-auto overscroll-contain p-12 flex flex-col items-center text-center justify-center min-h-[400px]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h3 className="text-3xl font-black text-black tracking-tight mb-4">Thank You!</h3>
            <p className="text-gray-600 text-lg max-w-sm mb-8">
              Gmail has been opened in a new tab. <br /><br />
              <strong>Please attach your resume manually before sending the email.</strong>
            </p>
            <button
              onClick={onClose}
              className="px-8 py-4 bg-gray-100 text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-gray-200 transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CareersJobListings;
