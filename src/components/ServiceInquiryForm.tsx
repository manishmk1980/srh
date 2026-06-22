import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Database, PhoneCall, Trash2, HelpCircle } from 'lucide-react';
import { InquiryFormValues, ServiceType } from '../types';

export default function ServiceInquiryForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [userSegment, setUserSegment] = useState<'clinic' | 'ngo' | 'csr' | 'corporate' | 'individual'>('individual');
  const [selectedService, setSelectedService] = useState<string>('VITAL_SCREENING');

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedInquiries, setSavedInquiries] = useState<any[]>([]);

  // Load old persistent client inquiries from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('srh_swasth_inquiries');
      if (saved) {
        setSavedInquiries(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading previous inquiries: ', e);
    }
  }, []);

  const validateForm = () => {
    const errs: string[] = [];
    if (!firstName.trim()) errs.push('First Name is required.');
    if (!lastName.trim()) errs.push('Last Name is required.');
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.push('Please enter a valid email address.');
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.trim())) errs.push('Please enter a valid 10-digit Indian phone number.');
    if (!message.trim() || message.length < 10) errs.push('Message is required and must exceed 10 characters.');
    if ((userSegment !== 'individual') && !companyName.trim()) {
      errs.push('Organization/Company Name is required for B2B clinical partnerships.');
    }
    setFormErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormErrors([]);

    // Simulate backend submission timer block
    setTimeout(() => {
      const ticketId = 'TKT_' + Math.floor(100000 + Math.random() * 900000);
      const newInquiry = {
        id: ticketId,
        firstName,
        lastName,
        email,
        phone,
        companyName,
        message,
        userSegment,
        selectedService,
        createdAt: new Date().toLocaleString()
      };

      try {
        const updated = [newInquiry, ...savedInquiries];
        localStorage.setItem('srh_swasth_inquiries', JSON.stringify(updated));
        setSavedInquiries(updated);
      } catch (err) {
        console.error('Error writing inquiries to persistent local storage: ', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear inputs
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCompanyName('');
      setMessage('');
      
      // Auto close success message after 5 seconds to allow other entries
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleDeleteInquiry = (id: string) => {
    try {
      const filtered = savedInquiries.filter(item => item.id !== id);
      localStorage.setItem('srh_swasth_inquiries', JSON.stringify(filtered));
      setSavedInquiries(filtered);
    } catch (e) {
      console.error('Error deleting local storage records: ', e);
    }
  };

  return (
    <div className="space-y-8" id="inquiry-system-form">
      {isSuccess && (
        <div className="p-4 bg-emerald-50 border-1 border-emerald-300 text-emerald-800 rounded-2xl flex items-center gap-3 animate-fade-in shadow-xs">
          <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-sm block">Service Enquiry Submitted Successfully!</span>
            Our support team will contact you shortly for service details, availability, and next steps.
          </div>
        </div>
      )}

      {formErrors.length > 0 && (
        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 rounded-r-xl text-xs space-y-1 font-medium">
          <span className="font-bold text-rose-900 block text-sm">Form validation unresolved:</span>
          <ul className="list-disc list-inside space-y-0.5">
            {formErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Primary HTML Form satisfying WCAG contrast patterns */}
      <form onSubmit={handleSubmit} className="space-y-4" id="service-inquiry-html-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="first-name">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="first-name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Ramesh"
              className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy placeholder:text-text-light/70"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="last-name">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="last-name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Kumar"
              className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy placeholder:text-text-light/70"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="email-address">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              id="email-address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ramesh.kumar@gmail.com"
              className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy placeholder:text-text-light/70"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="phone-number">
              Mobile Phone <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-light font-mono select-none pointer-events-none">+91</span>
              <input
                id="phone-number"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                placeholder="9876543210"
                className="w-full pl-12 pr-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-mono font-medium text-text-navy"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="user-segment">
              Organization Segment <span className="text-rose-500">*</span>
            </label>
            <select
              id="user-segment"
              value={userSegment}
              onChange={(e) => setUserSegment(e.target.value as any)}
              className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy"
            >
              <option value="individual">Individual Patient Checkup</option>
              <option value="clinic">Community Care & Clinic setup</option>
              <option value="ngo">NGO health campaign</option>
              <option value="csr">Corporate CSR funding initiatives</option>
              <option value="corporate">Corporate Staff Wellness health scheme</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="interest-service">
              Service of Interest <span className="text-rose-500">*</span>
            </label>
            <select
              id="interest-service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy"
            >
              <option value="VITAL_SCREENING">Vital Screening</option>
              <option value="VITALS_CONSULTATION">Vitals + Consultation</option>
              <option value="FOLLOW_UP">Follow-up Consultation</option>
              <option value="SPECIALIST">Specialist Consultation</option>
              <option value="KIOSK_DEPLOYMENT">Clinical Kiosk Setup / B2B Purchase</option>
              <option value="OTHER">General Corporate / NGO Partnership Inquiry</option>
            </select>
          </div>
        </div>

        {userSegment !== 'individual' && (
          <div className="animate-fade-in">
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="company-name">
              Organization / Company Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="company-name"
              type="text"
              required={userSegment !== 'individual'}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Ambey Sales Corporate Hub"
              className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="message-body">
            How can we assist you? (Minimum 10 chars) <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message-body"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your requirement here..."
            className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy placeholder:text-text-light/70"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-3 bg-primary-teal hover:bg-primary-teal/95 text-white rounded-xl font-heading font-extrabold text-xs tracking-wider uppercase transition-all select-none shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Submitting Enquiry...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit Service Enquiry
            </>
          )}
        </button>
      </form>

      {/* Persistent Registry of Local Storage Queries - Demonstrates genuine persistent states */}
      {savedInquiries.length > 0 && (
        <div className="p-5 bg-[#EEF8FA] rounded-2xl border border-[#D7E7EA] space-y-4 shadow-inner" id="inquiry-saved-history">
          <div className="flex items-center gap-2 text-[#0E7490] font-bold border-b border-[#D7E7EA] pb-2">
            <Database className="w-4 h-4 shrink-0" />
            <h6 className="font-heading font-extrabold text-xs uppercase tracking-wider">Saved Inquiry Queue (LocalStorage Database)</h6>
          </div>
          
          <div className="max-h-52 overflow-y-auto space-y-3 pr-1">
            {savedInquiries.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-3.5 rounded-xl border border-[#D7E7EA]/60 flex justify-between items-start text-xs shadow-xs"
              >
                <div className="space-y-1.5 flex-1 pr-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-text-navy">{item.firstName} {item.lastName}</span>
                    <span className="p-0.5 px-2 bg-slate-100 border border-slate-200 text-[9px] rounded font-mono font-bold text-text-light uppercase">
                      {item.userSegment}
                    </span>
                    <span className="font-mono text-[9px] text-[#0E7490] font-semibold">TICKET: {item.id}</span>
                  </div>
                  <p className="text-[11px] text-text-light font-mono leading-none">
                    Email: {item.email} • WhatsApp: +91 {item.phone}
                  </p>
                  <p className="text-[11.5px] text-text-muted italic bg-slate-50 p-2 rounded border border-slate-100">
                    "{item.message}"
                  </p>
                  <span className="block text-[9px] text-slate-400 font-mono">Submitted: {item.createdAt}</span>
                </div>
                
                <button
                  onClick={() => handleDeleteInquiry(item.id)}
                  className="p-1 px-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-all"
                  title="Remove persistent ticket"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
