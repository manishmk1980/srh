import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';

type InquiryFormState = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  organizationName: string;
  organizationType: string;
  requirementType: string;
  modelOfInterest: string;
  deploymentLocation: string;
  message: string;
};

const initialForm: InquiryFormState = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  organizationName: '',
  organizationType: 'Clinic',
  requirementType: 'Healthcare Kiosk Deployment',
  modelOfInterest: 'Not sure - need recommendation',
  deploymentLocation: '',
  message: '',
};

const organizationTypes = [
  'Clinic',
  'Hospital',
  'Diagnostic Center',
  'NGO / Foundation',
  'CSR / Corporate Program',
  'Industrial / Factory Health Program',
  'Government / Public Health Partner',
  'Distributor / Channel Partner',
  'Individual / Patient Enquiry',
  'Other',
];

const requirementTypes = [
  'Healthcare Kiosk Deployment',
  'Vanity Model Enquiry',
  'Linear Actuator Model Enquiry',
  'Community Health Camp',
  'CSR Health Screening Program',
  'Clinic / Hospital Partnership',
  'Technical / Product Discussion',
  'Service / Screening Enquiry',
  'Other',
];

const modelOptions = [
  'Vanity Model',
  'Linear Actuator Model',
  'Not sure - need recommendation',
  'Multiple models / network deployment',
  'Not applicable',
];

const contactEndpoint =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT || 'https://formsubmit.co/ajax/contactmanishm@gmail.com';

function getPrefillFromUrl(): Partial<InquiryFormState> {
  const params = new URLSearchParams(window.location.search);
  const model = params.get('model') || params.get('modelOfInterest');
  const requirement = params.get('requirementType');

  if (model === 'Vanity Model') {
    return {
      requirementType: requirement || 'Vanity Model Enquiry',
      modelOfInterest: 'Vanity Model',
      message: 'I am interested in the Vanity Model for healthcare kiosk deployment. Please share suitable next steps.',
    };
  }

  if (model === 'Linear Actuator Model') {
    return {
      requirementType: requirement || 'Linear Actuator Model Enquiry',
      modelOfInterest: 'Linear Actuator Model',
      message: 'I am interested in the Linear Actuator Model for institutional healthcare kiosk deployment. Please share suitable next steps.',
    };
  }

  if (requirement) {
    return { requirementType: requirement };
  }

  return {};
}

export default function ServiceInquiryForm() {
  const [form, setForm] = useState<InquiryFormState>(initialForm);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  useEffect(() => {
    setForm((current) => ({ ...current, ...getPrefillFromUrl() }));
  }, []);

  const updateField = (field: keyof InquiryFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!form.firstName.trim()) errors.push('First Name is required.');
    if (!form.lastName.trim()) errors.push('Last Name is required.');
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errors.push('Please enter a valid email address.');
    if (!form.mobile.trim() || !/^[6-9]\d{9}$/.test(form.mobile.trim())) errors.push('Please enter a valid 10-digit Indian mobile number.');
    if (!form.organizationName.trim()) errors.push('Organization Name is required.');
    if (!form.organizationType.trim()) errors.push('Organization Type is required.');
    if (!form.requirementType.trim()) errors.push('Requirement Type is required.');
    if (!form.modelOfInterest.trim()) errors.push('Model of Interest is required.');
    if (!form.deploymentLocation.trim()) errors.push('Deployment Location is required.');
    if (!form.message.trim() || form.message.trim().length < 10) errors.push('Message is required and must exceed 10 characters.');
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');
    setSuccessMessage('');

    const payload = {
      ...form,
      _subject: 'New SRH SWASTH SEVA Enquiry',
      _template: 'table',
      _captcha: 'false',
      sourcePage: window.location.href,
      referrer: document.referrer || 'Direct / not available',
      submittedAt: new Date().toLocaleString(),
      recipient: 'contactmanishm@gmail.com',
    };

    try {
      // FormSubmit may require one-time email activation before live delivery starts.
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Form endpoint returned ${response.status}`);
      }

      setSuccessMessage('Thank you. Your enquiry has been received. The SRH / M/S AMBEY SALES team will review your requirement and contact you shortly.');
      setForm(initialForm);
    } catch (error) {
      console.error('Error submitting SRH enquiry: ', error);
      setSubmitError('Sorry, the enquiry could not be submitted right now. Please try again or contact us at +91 92344 65621.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8" id="inquiry-system-form">
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl flex items-center gap-3 animate-fade-in shadow-xs">
          <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-xs font-semibold">{successMessage}</div>
        </div>
      )}

      {submitError && (
        <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 rounded-2xl flex items-center gap-3 animate-fade-in shadow-xs">
          <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
          <div className="text-xs font-semibold">{submitError}</div>
        </div>
      )}

      {formErrors.length > 0 && (
        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 rounded-r-xl text-xs space-y-1 font-medium">
          <span className="font-bold text-rose-900 block text-sm">Please complete these fields:</span>
          <ul className="list-disc list-inside space-y-0.5">
            {formErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" id="service-inquiry-html-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="first-name">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input id="first-name" type="text" required value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} placeholder="e.g. Ramesh" className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy placeholder:text-text-light/70" />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="last-name">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input id="last-name" type="text" required value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} placeholder="e.g. Kumar" className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy placeholder:text-text-light/70" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="email-address">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input id="email-address" type="email" required value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="name@example.com" className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy placeholder:text-text-light/70" />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="mobile-number">
              Mobile Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-light font-mono select-none pointer-events-none">+91</span>
              <input id="mobile-number" type="tel" required value={form.mobile} onChange={(event) => updateField('mobile', event.target.value.replace(/\D/g, '').substring(0, 10))} placeholder="9876543210" className="w-full pl-12 pr-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-mono font-medium text-text-navy" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="organization-name">
            Organization Name <span className="text-rose-500">*</span>
          </label>
          <input id="organization-name" type="text" required value={form.organizationName} onChange={(event) => updateField('organizationName', event.target.value)} placeholder="Clinic, hospital, NGO, company, or individual name" className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="organization-type">
              Organization Type <span className="text-rose-500">*</span>
            </label>
            <select id="organization-type" required value={form.organizationType} onChange={(event) => updateField('organizationType', event.target.value)} className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy">
              {organizationTypes.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="requirement-type">
              Requirement Type <span className="text-rose-500">*</span>
            </label>
            <select id="requirement-type" required value={form.requirementType} onChange={(event) => updateField('requirementType', event.target.value)} className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy">
              {requirementTypes.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="model-interest">
              Model of Interest <span className="text-rose-500">*</span>
            </label>
            <select id="model-interest" required value={form.modelOfInterest} onChange={(event) => updateField('modelOfInterest', event.target.value)} className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy">
              {modelOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="deployment-location">
              Deployment Location <span className="text-rose-500">*</span>
            </label>
            <input id="deployment-location" type="text" required value={form.deploymentLocation} onChange={(event) => updateField('deploymentLocation', event.target.value)} placeholder="City, district, state, or program area" className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-text-navy uppercase tracking-wider mb-1.5" htmlFor="message-body">
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea id="message-body" rows={5} required value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Tell us about your clinic, hospital, CSR program, health camp, or kiosk deployment requirement. Please do not submit emergency medical information through this form." className="w-full px-4 py-2.5 border border-[#D7E7EA] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#04496D] bg-white font-medium text-text-navy placeholder:text-text-light/70"></textarea>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full p-3 bg-primary-teal hover:bg-primary-teal/95 text-white rounded-xl font-heading font-extrabold text-xs tracking-wider uppercase transition-all select-none shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50">
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending Enquiry...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Enquiry
            </>
          )}
        </button>

        <p className="text-[11px] text-text-muted leading-relaxed font-semibold bg-white border border-[#D7E7EA] rounded-xl p-3">
          This form is for service, deployment, partnership, and screening enquiry coordination only. Please do not submit emergency medical details or sensitive reports through this form. For emergencies, contact emergency medical services or visit the nearest hospital.
        </p>
      </form>


    </div>
  );
}
