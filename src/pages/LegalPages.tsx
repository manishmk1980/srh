import React from 'react';
import {
  ArrowLeft,
  CalendarCheck,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import Logo from '../components/Logo';

type LegalSlug =
  | 'privacy-policy'
  | 'terms-service-conditions'
  | 'cancellation-refund-policy'
  | 'shipping-delivery-policy'
  | 'medical-diagnostic-disclaimer';

type PolicySection = {
  heading: string;
  body: string[];
};

type PolicyPageData = {
  title: string;
  subtitle: string;
  effectiveDate: string;
  sections: PolicySection[];
};

const CONTACT_EMAIL = 'support@srhswasthseva.com';
const CONTACT_PHONE = '+91 98765 43210';

export function getLegalPageSlug(): LegalSlug | null {
  const knownSlugs: LegalSlug[] = [
    'privacy-policy',
    'terms-service-conditions',
    'cancellation-refund-policy',
    'shipping-delivery-policy',
    'medical-diagnostic-disclaimer',
  ];

  const base = import.meta.env.BASE_URL || '/';
  let path = window.location.pathname;

  if (base !== '/' && path.startsWith(base)) {
    path = path.slice(base.length);
  }

  path = path.replace(/^\/+|\/+$/g, '');

  return knownSlugs.includes(path as LegalSlug) ? (path as LegalSlug) : null;
}

const policyPages: Record<LegalSlug, PolicyPageData> = {
  'privacy-policy': {
    title: 'Privacy Policy Agreement',
    subtitle:
      'How SRH SWASTH SEVA collects, uses, protects, and manages user information for healthcare service booking and consultation support.',
    effectiveDate: 'Effective from: 22 June 2026',
    sections: [
      {
        heading: '1. Introduction',
        body: [
          'SRH SWASTH SEVA is a healthcare service brand operated by Ambey Sales. This Privacy Policy explains how we collect, use, store, and protect information shared by users while booking vital screening, consultation support, follow-up consultation, specialist consultation, or contacting our support team.',
          'By using this website or submitting a service inquiry, you agree to the practices described in this Privacy Policy.',
        ],
      },
      {
        heading: '2. Information We May Collect',
        body: [
          'We may collect personal details such as name, mobile number, email address, organization name, service interest, message details, appointment preference, and basic information required to coordinate healthcare screening or consultation support.',
          'Where applicable, users may voluntarily share basic health-related information only for service coordination, consultation booking, screening support, or follow-up communication.',
        ],
      },
      {
        heading: '3. Purpose of Collection',
        body: [
          'Information is collected to process service inquiries, coordinate bookings, provide support, confirm payments, manage consultation requests, share service updates, and respond to refund or cancellation-related queries.',
          'We may also use submitted details to improve service quality, maintain internal records, prevent misuse, and comply with applicable legal or operational requirements.',
        ],
      },
      {
        heading: '4. Payment Information',
        body: [
          'Payments may be processed through approved third-party payment gateway providers. SRH SWASTH SEVA does not store complete card numbers, UPI PINs, net banking passwords, or sensitive payment credentials on this website.',
          'Payment status, transaction reference, service selection, and booking confirmation details may be retained for accounting, support, and refund processing purposes.',
        ],
      },
      {
        heading: '5. Data Sharing',
        body: [
          'User information may be shared only with authorized staff, service coordinators, healthcare professionals, technology partners, payment gateway providers, or support teams strictly for service delivery and operational purposes.',
          'We do not sell user personal information to advertisers or unrelated third parties.',
        ],
      },
      {
        heading: '6. Data Security',
        body: [
          'We follow reasonable technical and organizational safeguards to protect user information against unauthorized access, misuse, loss, or alteration.',
          'However, no internet-based system can be guaranteed to be completely secure. Users should avoid sharing highly sensitive medical or financial information through open text fields unless required for service coordination.',
        ],
      },
      {
        heading: '7. Data Retention',
        body: [
          'We may retain service inquiries, booking details, support communication, payment references, and related records for as long as required for service delivery, legal compliance, accounting, dispute resolution, or operational record-keeping.',
        ],
      },
      {
        heading: '8. User Rights',
        body: [
          'Users may contact us to request correction, update, or reasonable deletion of their personal information, subject to service, legal, accounting, or compliance requirements.',
          `For privacy-related requests, contact us at ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: '9. Contact',
        body: [
          `For questions regarding this Privacy Policy, please contact SRH SWASTH SEVA support at ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
        ],
      },
    ],
  },

  'terms-service-conditions': {
    title: 'Terms & Service Conditions',
    subtitle:
      'Terms governing the use of SRH SWASTH SEVA website, service booking, healthcare screening, and consultation support.',
    effectiveDate: 'Effective from: 22 June 2026',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: [
          'By accessing this website, submitting an inquiry, booking a healthcare service, or making a payment, you agree to these Terms & Service Conditions.',
          'SRH SWASTH SEVA is a healthcare service brand operated by Ambey Sales.',
        ],
      },
      {
        heading: '2. Services Offered',
        body: [
          'SRH SWASTH SEVA provides vital screening, vitals-based consultation, follow-up consultation, and specialist consultation support through a digital and assisted healthcare service model.',
          'Service availability, pricing, consultation type, location, and delivery mode may vary based on operational feasibility, healthcare professional availability, and service scope.',
        ],
      },
      {
        heading: '3. User Responsibility',
        body: [
          'Users must provide accurate personal, contact, booking, and health-related information wherever required for service coordination.',
          'Users should not submit false, misleading, abusive, unlawful, or irrelevant information through website forms or support channels.',
        ],
      },
      {
        heading: '4. Booking and Payment',
        body: [
          'Users may book available healthcare services and make payments through the website or approved payment channels.',
          'A booking is considered received only after successful submission of required information and, where applicable, successful payment confirmation.',
        ],
      },
      {
        heading: '5. Service Delivery',
        body: [
          'Service delivery may include assisted screening, consultation coordination, digital communication, appointment confirmation, follow-up support, or report-sharing where applicable.',
          'Timelines may vary depending on selected service, user availability, location, healthcare professional availability, or operational constraints.',
        ],
      },
      {
        heading: '6. Healthcare Limitations',
        body: [
          'The website and services are intended for preventive healthcare screening, consultation support, and service coordination.',
          'SRH SWASTH SEVA does not provide emergency medical services through this website. In case of emergency, users must contact a nearby hospital, emergency helpline, or qualified medical professional immediately.',
        ],
      },
      {
        heading: '7. Pricing and Changes',
        body: [
          'Prices shown on the website may be starting prices or service-specific charges. Final pricing may depend on service type, specialist category, location, and selected package.',
          'SRH SWASTH SEVA may update service details, pricing, features, or availability from time to time.',
        ],
      },
      {
        heading: '8. Cancellation and Refund',
        body: [
          'Cancellation and refund requests are governed by the Cancellation & Refund Policy published on this website.',
        ],
      },
      {
        heading: '9. Contact',
        body: [
          `For service, booking, or payment-related support, contact ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
        ],
      },
    ],
  },

  'cancellation-refund-policy': {
    title: 'Cancellation & Refund Policy',
    subtitle:
      'Rules for cancellation, rescheduling, failed payments, duplicate payments, and refunds for SRH SWASTH SEVA services.',
    effectiveDate: 'Effective from: 22 June 2026',
    sections: [
      {
        heading: '1. Overview',
        body: [
          'This Cancellation & Refund Policy applies to services booked through SRH SWASTH SEVA, including vital screening, vitals + consultation, follow-up consultation, and specialist consultation.',
        ],
      },
      {
        heading: '2. Cancellation by User',
        body: [
          'Users may request cancellation before the scheduled service time by contacting support with booking details and payment reference.',
          'Cancellation eligibility depends on whether the service has already been initiated, completed, or reserved with a healthcare professional or service team.',
        ],
      },
      {
        heading: '3. Rescheduling',
        body: [
          'Where feasible, users may request rescheduling instead of cancellation. Rescheduling is subject to availability of service slot, healthcare professional, and operational team.',
          'Repeated rescheduling requests may be treated as cancellation depending on service status and internal approval.',
        ],
      },
      {
        heading: '4. Refund Eligibility',
        body: [
          'Refunds may be considered for duplicate payments, failed transactions where amount was debited, service unavailability after confirmed payment, or cancellation requests approved before service initiation.',
          'Refunds are generally not applicable once screening, consultation, follow-up support, specialist consultation, or digital service coordination has been completed.',
        ],
      },
      {
        heading: '5. No-Show Cases',
        body: [
          'If a user does not attend a confirmed appointment or does not respond during the scheduled service window, the case may be treated as a no-show.',
          'No-show cases may not be eligible for refund. Rescheduling may be offered at the discretion of SRH SWASTH SEVA support.',
        ],
      },
      {
        heading: '6. Refund Timeline',
        body: [
          'Approved refunds are normally processed within 5–7 working days from approval. Actual bank or payment gateway credit time may vary depending on the payment method and banking partner.',
        ],
      },
      {
        heading: '7. How to Request Cancellation or Refund',
        body: [
          `To request cancellation or refund, contact ${CONTACT_EMAIL} with your name, phone number, selected service, payment reference, booking date, and reason for cancellation/refund.`,
        ],
      },
    ],
  },

  'shipping-delivery-policy': {
    title: 'Shipping & Delivery Policy',
    subtitle:
      'Delivery model for service confirmations, consultation coordination, reports, and digital communication.',
    effectiveDate: 'Effective from: 22 June 2026',
    sections: [
      {
        heading: '1. No Standard Physical Shipping',
        body: [
          'SRH SWASTH SEVA primarily provides healthcare screening and consultation support services. No standard physical product is shipped for regular service bookings unless specifically stated for a particular service.',
        ],
      },
      {
        heading: '2. Digital Delivery',
        body: [
          'Service confirmations, appointment details, support communication, consultation coordination, and applicable digital updates may be shared through phone, WhatsApp, email, website, or app-based communication where available.',
        ],
      },
      {
        heading: '3. Report or Record Sharing',
        body: [
          'Where applicable, screening summaries, consultation notes, or service-related records may be shared digitally or provided during the service process.',
          'Report availability and format may vary based on the service type, screening setup, technology partner, healthcare professional, and operational workflow.',
        ],
      },
      {
        heading: '4. Service Delivery Timeline',
        body: [
          'Service delivery timelines depend on selected service, appointment slot, location, user availability, specialist availability, and support coordination.',
          'Users will be informed about confirmed appointment or service details after successful booking and/or payment confirmation.',
        ],
      },
      {
        heading: '5. Physical Delivery Exceptions',
        body: [
          'If any physical material, kit, document, or device-related item is ever offered in the future, applicable shipping charges, delivery timelines, and return rules will be communicated separately before payment.',
        ],
      },
      {
        heading: '6. Delivery Support',
        body: [
          `For service confirmation, appointment update, or report-delivery support, contact ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
        ],
      },
    ],
  },

  'medical-diagnostic-disclaimer': {
    title: 'Medical & Diagnostic Disclaimer',
    subtitle:
      'Important healthcare limitations, emergency guidance, and responsibility notice for SRH SWASTH SEVA users.',
    effectiveDate: 'Effective from: 22 June 2026',
    sections: [
      {
        heading: '1. General Healthcare Support',
        body: [
          'SRH SWASTH SEVA provides preventive healthcare screening, consultation support, follow-up coordination, and specialist consultation booking support.',
          'Information on this website is provided for general service understanding and does not replace direct medical examination, diagnosis, or treatment from a qualified healthcare professional.',
        ],
      },
      {
        heading: '2. Not an Emergency Service',
        body: [
          'This website and its service booking flow are not intended for medical emergencies.',
          'In case of chest pain, breathlessness, severe bleeding, loss of consciousness, stroke symptoms, serious injury, pregnancy emergency, or any urgent medical concern, immediately contact a nearby hospital, emergency helpline, ambulance service, or qualified medical professional.',
        ],
      },
      {
        heading: '3. Screening Limitation',
        body: [
          'Vital screening and digital healthcare workflows may help capture basic health parameters or support consultation coordination.',
          'Screening results should not be treated as a final diagnosis unless reviewed and interpreted by a qualified healthcare professional as part of appropriate medical care.',
        ],
      },
      {
        heading: '4. No Guaranteed Outcome',
        body: [
          'SRH SWASTH SEVA does not guarantee cure, treatment success, specific medical outcome, complete diagnosis, or prevention of any disease.',
          'Any healthcare advice, prescription, or treatment recommendation should be followed only as directed by the relevant qualified healthcare professional.',
        ],
      },
      {
        heading: '5. User Responsibility',
        body: [
          'Users are responsible for sharing accurate information and informing the healthcare professional about existing conditions, allergies, medications, pregnancy status, prior diagnosis, or other relevant medical history.',
        ],
      },
      {
        heading: '6. Specialist Availability',
        body: [
          'Specialist consultation availability may vary based on location, timing, doctor availability, and selected service category.',
        ],
      },
      {
        heading: '7. Contact',
        body: [
          `For service-related questions, contact ${CONTACT_EMAIL} or ${CONTACT_PHONE}. For urgent medical issues, contact emergency medical services immediately.`,
        ],
      },
    ],
  },
};

function getHomeHref() {
  return import.meta.env.BASE_URL || '/';
}

function PolicyContent({ data }: { data: PolicyPageData }) {
  return (
    <main className="bg-[#F7FBFC] min-h-screen text-[#0B1633]">
      <header className="bg-white border-b border-[#D7E7EA] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <a href={getHomeHref()} className="inline-flex items-center gap-3">
            <Logo variant="compact" size={44} />
          </a>

          <a
            href={getHomeHref()}
            className="inline-flex items-center gap-2 rounded-full border border-[#D7E7EA] px-4 py-2 text-sm font-bold text-[#04496D] hover:bg-[#EEF8FA] focus:outline-none focus:ring-2 focus:ring-[#04496D] focus:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4">
            <div className="bg-[#072033] text-white rounded-[28px] p-7 md:p-8 sticky top-28 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#FABC09]/15 border border-[#FABC09]/30 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-[#FABC09]" />
              </div>

              <p className="text-xs uppercase tracking-[0.22em] text-[#FABC09] font-black mb-3">
                Policies & Legal Terms
              </p>

              <h1 className="font-heading text-3xl md:text-4xl font-black leading-tight">
                {data.title}
              </h1>

              <p className="text-[#D7E7EA] mt-4 leading-relaxed text-sm md:text-base">
                {data.subtitle}
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 text-sm text-[#D7E7EA] space-y-3">
                <p className="flex items-start gap-3">
                  <CalendarCheck className="w-4 h-4 text-[#FABC09] mt-0.5 shrink-0" />
                  <span>{data.effectiveDate}</span>
                </p>
                <p className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-[#FABC09] mt-0.5 shrink-0" />
                  <span>Brand operated by Ambey Sales</span>
                </p>
                <p className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FABC09] mt-0.5 shrink-0" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white underline underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#FABC09] mt-0.5 shrink-0" />
                  <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="hover:text-white underline underline-offset-4">
                    {CONTACT_PHONE}
                  </a>
                </p>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-8 bg-white rounded-[28px] border border-[#D7E7EA] shadow-sm p-6 md:p-10">
            <div className="prose prose-slate max-w-none">
              {data.sections.map((section) => (
                <section key={section.heading} className="mb-9 last:mb-0">
                  <h2 className="font-heading text-2xl md:text-3xl font-black text-[#0B1633] mb-4">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[#475569] leading-8 text-base md:text-[17px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-[#EEF8FA] border border-[#D7E7EA] p-5 text-sm text-[#475569] leading-relaxed">
              <strong className="text-[#0B1633]">Note:</strong> This page is part of the SRH SWASTH SEVA public web presence for service transparency, user support, payment readiness, and legal/policy disclosure. Users should read all applicable policies before booking a healthcare service.
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export function LegalPage({ slug }: { slug: LegalSlug }) {
  return <PolicyContent data={policyPages[slug]} />;
}
