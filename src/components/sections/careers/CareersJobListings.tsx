"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Briefcase, Clock, Building2, UploadCloud, CheckCircle2, X, FileText, Trash2, AlertCircle } from "lucide-react";

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
          <p className="text-white/80 font-medium text-sm md:text-base max-w-2xl mx-auto mt-4">
            We are always looking for passionate engineers, operators, and creators to push the boundaries of manufacturing.
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-5 md:px-10">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[#4A6B35] font-bold uppercase tracking-widest text-xs mb-2 block">
              Current Openings
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">
              Explore Available Roles
            </h2>
          </div>

          {/* Department Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#4A6B35] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B35] bg-[#4A6B35]/10 px-4 py-1.5 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-black tracking-tight mb-4 group-hover:text-[#4A6B35] transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={16} className="text-gray-400" /> {job.experience}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-gray-400" /> {job.location}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {job.description.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B35] mt-2 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Required Skills</h4>
                    <p className="text-sm font-medium text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {job.skills}
                    </p>
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
const ApplicationModal = ({ job, onClose }: { job: Job; onClose: () => void }) => {
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // --- Validation Rules ---
  const validateName = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return "Full Name is required";
    if (trimmed.length < 3) return "Full Name must be at least 3 characters";
    if (!/^[A-Za-z\s'-]+$/.test(trimmed)) {
      return "Full Name can only contain letters, spaces, hyphens and apostrophes";
    }
    const letters = trimmed.match(/[A-Za-z]/g) || [];
    if (letters.length < 2) {
      return "Full Name must contain valid letters";
    }
    return "";
  };

  const validateEmail = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return "Email Address is required";
    if (/\s/.test(trimmed)) return "Email Address cannot contain spaces";
    const atCount = (trimmed.match(/@/g) || []).length;
    if (atCount !== 1) return "Email Address must contain exactly one @ symbol";
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!emailRegex.test(trimmed)) {
      return "Please enter a valid email address with a valid domain (e.g. name@example.com)";
    }
    return "";
  };

  const validatePhone = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return "Phone Number is required";
    if (!/^\d+$/.test(trimmed)) return "Phone Number must contain only numbers";
    if (trimmed.length !== 10) return "Phone Number must be exactly 10 digits";
    if (/^0{10}$/.test(trimmed)) return "Phone Number cannot contain only zeros";
    return "";
  };

  const validateExperience = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return "Years of Experience is required";
    if (!/^\d+(\.\d+)?$/.test(trimmed)) {
      return "Experience must be a positive number (decimals allowed, e.g. 2.5)";
    }
    const num = parseFloat(trimmed);
    if (isNaN(num) || num < 0) return "Experience cannot be negative";
    if (num > 50) return "Experience cannot exceed 50 years";
    return "";
  };

  const validateCompany = (val: string): string => {
    if (val.length > 0 && !val.trim()) {
      return "Company name cannot be only whitespace";
    }
    const trimmed = val.trim();
    if (trimmed && !/^[A-Za-z0-9\s&.,'()-]+$/.test(trimmed)) {
      return "Company name contains invalid characters";
    }
    if (trimmed.length > 100) return "Company name must not exceed 100 characters";
    return "";
  };

  const validateLocation = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return "Location is required";
    if (trimmed.length < 2) return "Location must be at least 2 characters";
    if (!/^[A-Za-z\s,-]+$/.test(trimmed)) {
      return "Location can only contain letters, spaces, commas and hyphens";
    }
    const letters = trimmed.match(/[A-Za-z]/g) || [];
    if (letters.length < 2) {
      return "Location must contain a valid city, state or country name";
    }
    if (trimmed.length > 100) return "Location must not exceed 100 characters";
    return "";
  };

  const validateMessage = (val: string): string => {
    if (val.length > 0 && !val.trim()) {
      return "Message cannot contain only whitespace";
    }
    if (val.length > 2000) return "Message must not exceed 2,000 characters";
    return "";
  };

  const validateResume = (selectedFile: File | null): string => {
    if (!selectedFile) return "Resume upload is required (.pdf or .docx)";
    const nameLower = selectedFile.name.toLowerCase();
    const isPdf = nameLower.endsWith(".pdf");
    const isDocx = nameLower.endsWith(".docx");
    if (!isPdf && !isDocx) {
      return "Invalid file format. Only PDF and DOCX files are allowed (.doc, images, and other formats are rejected)";
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      return "File size exceeds 5 MB. Please upload a smaller file";
    }
    if (selectedFile.size === 0) {
      return "Uploaded file is empty";
    }
    return "";
  };

  // --- Handlers ---
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let errorMsg = "";
    switch (field) {
      case "name": errorMsg = validateName(formData.name); break;
      case "email": errorMsg = validateEmail(formData.email); break;
      case "phone": errorMsg = validatePhone(formData.phone); break;
      case "experience": errorMsg = validateExperience(formData.experience); break;
      case "company": errorMsg = validateCompany(formData.company); break;
      case "location": errorMsg = validateLocation(formData.location); break;
      case "message": errorMsg = validateMessage(formData.message); break;
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleFileChange = (newFile: File | null) => {
    setTouched((prev) => ({ ...prev, file: true }));
    if (!newFile) {
      setFile(null);
      setErrors((prev) => ({ ...prev, file: "Resume upload is required (.pdf or .docx)" }));
      return;
    }
    const fileErr = validateResume(newFile);
    if (fileErr) {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrors((prev) => ({ ...prev, file: fileErr }));
    } else {
      setFile(newFile);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.file;
        return next;
      });
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      experience: validateExperience(formData.experience),
      company: validateCompany(formData.company),
      location: validateLocation(formData.location),
      message: validateMessage(formData.message),
      file: validateResume(file),
    };

    const filteredErrors: Record<string, string> = {};
    Object.entries(newErrors).forEach(([k, v]) => {
      if (v) filteredErrors[k] = v;
    });

    setErrors(filteredErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      experience: true,
      company: true,
      location: true,
      message: true,
      file: true,
    });

    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.submit;
      return next;
    });

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name.trim());
      formDataObj.append("email", formData.email.trim().toLowerCase());
      formDataObj.append("phone", formData.phone.trim());
      formDataObj.append("experience", formData.experience.trim());
      formDataObj.append("company", formData.company.trim());
      formDataObj.append("location", formData.location.trim());
      formDataObj.append("message", formData.message.trim());
      formDataObj.append("position", job.title);
      formDataObj.append("file", file as Blob);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (!response.ok) {
        // Form data is preserved upon failure
        setErrors((prev) => ({
          ...prev,
          submit: data.error || "Failed to submit application. Please review your details and try again.",
        }));
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "A network error occurred. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputStyle = (fieldName: string) => {
    const hasError = !!errors[fieldName];
    return `w-full p-4 rounded-xl border ${
      hasError
        ? "border-red-500 bg-red-50/50 text-gray-900 focus:border-red-500"
        : "border-gray-200 bg-gray-50 focus:border-[#4A6B35]"
    } focus:outline-none transition-colors`;
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
            <h3 className="text-xl md:text-2xl font-black text-black tracking-tight mb-1 pr-8">
              Apply for {job.title}
            </h3>
            <p className="text-gray-500 font-medium text-sm">
              Please fill out the form below. All fields marked with * are required.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shrink-0 ml-4 absolute top-5 right-5 md:top-6 md:right-8"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col flex-1 min-h-0">
            {/* Scrollable Form Body */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 min-h-0 relative">
              {errors.submit && (
                <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
                  <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
                  <span>{errors.submit}</span>
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({ ...prev, name: val }));
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: validateName(val) }));
                      }
                    }}
                    onBlur={() => handleBlur("name")}
                    className={getInputStyle("name")}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      // Automatically convert to lowercase and remove spaces
                      const val = e.target.value.toLowerCase().replace(/\s/g, "");
                      setFormData((prev) => ({ ...prev, email: val }));
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
                      }
                    }}
                    onBlur={() => handleBlur("email")}
                    className={getInputStyle("email")}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Position (IMPORTANT: Position kept exactly as is!) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest">
                      Phone Number *
                    </label>
                    <span
                      className={`text-xs font-semibold ${
                        formData.phone.length === 10 ? "text-[#4A6B35]" : "text-gray-400"
                      }`}
                    >
                      {formData.phone.length}/10
                    </span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => {
                      // Allow numeric input only, max 10 digits
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setFormData((prev) => ({ ...prev, phone: val }));
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: validatePhone(val) }));
                      }
                    }}
                    onBlur={() => handleBlur("phone")}
                    className={getInputStyle("phone")}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    disabled
                    value={job.title}
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Row 3: Years of Exp, Current Company, Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                    Years of Exp *
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => {
                      // Allow numbers and decimal point only
                      const raw = e.target.value.replace(/[^0-9.]/g, "");
                      const parts = raw.split(".");
                      const val = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : raw;
                      setFormData((prev) => ({ ...prev, experience: val }));
                      if (errors.experience) {
                        setErrors((prev) => ({ ...prev, experience: validateExperience(val) }));
                      }
                    }}
                    onBlur={() => handleBlur("experience")}
                    className={getInputStyle("experience")}
                    placeholder="e.g. 2.5"
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.experience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                    Current Company <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({ ...prev, company: val }));
                      if (errors.company) {
                        setErrors((prev) => ({ ...prev, company: validateCompany(val) }));
                      }
                    }}
                    onBlur={() => handleBlur("company")}
                    className={getInputStyle("company")}
                    placeholder="Company name"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({ ...prev, location: val }));
                      if (errors.location) {
                        setErrors((prev) => ({ ...prev, location: validateLocation(val) }));
                      }
                    }}
                    onBlur={() => handleBlur("location")}
                    className={getInputStyle("location")}
                    placeholder="City, State"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Resume Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                  Resume Upload * (PDF/DOCX)
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => {
                    const selected = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                    handleFileChange(selected);
                  }}
                  className="hidden"
                />

                {!file ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer relative ${
                      errors.file ? "border-red-300 bg-red-50/50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <UploadCloud size={32} className="text-gray-400 mb-2" />
                    <span className="text-sm font-semibold text-gray-700">
                      Click or drag resume here to upload
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      Only PDF and DOCX files are allowed (Maximum size: 5 MB)
                    </span>
                  </div>
                ) : (
                  <div className="w-full border-2 border-dashed border-[#4A6B35]/40 bg-emerald-50/40 rounded-xl p-5 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden pr-2">
                      <div className="w-10 h-10 rounded-lg bg-[#4A6B35]/10 flex items-center justify-center text-[#4A6B35] shrink-0">
                        <FileText size={22} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-800 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500 font-medium">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                          {file.name.toLowerCase().endsWith(".pdf") ? "PDF Document" : "DOCX Document"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                          setErrors((prev) => ({
                            ...prev,
                            file: "Resume upload is required (.pdf or .docx)",
                          }));
                        }}
                        className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        title="Remove resume"
                        aria-label="Remove resume"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {errors.file && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <span>•</span> {errors.file}
                  </p>
                )}
              </div>

              {/* Row 5: Cover Letter / Message */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest">
                    Cover Letter / Message <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <span
                    className={`text-xs font-semibold ${
                      formData.message.length > 1900 ? "text-amber-600" : "text-gray-400"
                    }`}
                  >
                    {formData.message.length}/2000
                  </span>
                </div>
                <textarea
                  value={formData.message}
                  maxLength={2000}
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 2000);
                    setFormData((prev) => ({ ...prev, message: val }));
                    if (errors.message) {
                      setErrors((prev) => ({ ...prev, message: validateMessage(val) }));
                    }
                  }}
                  onBlur={() => handleBlur("message")}
                  rows={3}
                  className={getInputStyle("message") + " resize-none"}
                  placeholder="Tell us why you'd be a good fit..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <span>•</span> {errors.message}
                  </p>
                )}
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="bg-white border-t border-gray-100 p-6 md:p-8 shrink-0 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 md:py-5 bg-[#4A6B35] text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-green-800 transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Submitting Application...</span>
                  </div>
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
            <h3 className="text-3xl font-black text-black tracking-tight mb-4">
              Application Submitted Successfully
            </h3>
            <p className="text-gray-600 text-lg max-w-sm mb-8">
              Thank you for submitting your application. <br /><br />
              <strong>
                Our team will review your details and contact you shortly. A confirmation email has been sent to your email address.
              </strong>
            </p>
            <button
              onClick={onClose}
              className="px-8 py-4 bg-gray-100 text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Back to Careers
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CareersJobListings;
