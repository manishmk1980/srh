import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type ProgramCard = {
  label: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  alt: string;
};

const imageBasePath = `${import.meta.env.BASE_URL}images/`;

const programCards: ProgramCard[] = [
  {
    label: 'Clinical Deployment',
    title: 'Clinic & Hospital Kiosk Deployment',
    description:
      'For healthcare providers in Jharkhand looking to add assisted digital screening, vitals capture, and teleconsultation support inside clinics and hospital workflows.',
    highlights: [
      'Assisted digital screening',
      'Teleconsultation workflow support',
      'Suitable for clinics and hospitals',
    ],
    image: 'clinic-hospital-kiosk-deployment-jharkhand-srh-swasth-seva.webp',
    alt: 'SRH Swasth Seva clinic and hospital kiosk deployment support in Jharkhand with assisted digital screening and teleconsultation workflow',
  },
  {
    label: 'Community Outreach',
    title: 'Community Health Screening',
    description:
      'For camps, preventive health drives, and local outreach programs focused on early detection, basic health screening, and community wellness support.',
    highlights: [
      'Camp-based screening support',
      'Preventive health outreach',
      'Ideal for local and rural coverage',
    ],
    image: 'community-health-screening-jharkhand-srh-swasth-seva.webp',
    alt: 'SRH Swasth Seva community health screening camp in Jharkhand for preventive wellness and early health checkups',
  },
  {
    label: 'CSR & NGO Programs',
    title: 'CSR / NGO Health Programs',
    description:
      'For CSR teams, NGOs, trusts, and outreach-led organizations planning structured health screening, awareness, and rural healthcare support programs.',
    highlights: [
      'CSR and NGO outreach support',
      'Rural and social health initiatives',
      'Awareness and screening coordination',
    ],
    image: 'csr-ngo-health-programs-jharkhand-srh-swasth-seva.webp',
    alt: 'SRH Swasth Seva CSR and NGO health program in Jharkhand for rural outreach, health screening, and community awareness',
  },
  {
    label: 'Workforce Wellness',
    title: 'Industrial & Workforce Wellness',
    description:
      'For industrial employers and workforce-intensive organizations planning periodic health camps, employee wellness screening, and referral coordination.',
    highlights: [
      'Employee health screening',
      'Periodic wellness camps',
      'Workforce-focused coordination',
    ],
    image: 'industrial-workforce-wellness-jharkhand-srh-swasth-seva.webp',
    alt: 'SRH Swasth Seva industrial and workforce wellness screening program in Jharkhand for employee health camps and periodic checkups',
  },
];

interface ProgramCardsSectionProps {
  onEnquire: () => void;
}

export default function ProgramCardsSection({ onEnquire }: ProgramCardsSectionProps) {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-white border-y border-[#D7E7EA]" id="clinical-plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 lg:mb-12">
          <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">
            Social healthcare + B2B deployment
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-navy tracking-tight leading-tight">
            Healthcare Deployment & Outreach Programs
          </h2>
          <p className="text-sm text-text-muted max-w-3xl mx-auto font-sans leading-relaxed">
            Use-case focused healthcare support for clinics, hospitals, CSR programs, communities, and workforce environments in Jharkhand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
          {programCards.map((card) => (
            <article
              key={card.title}
              className="group bg-[#F7FBFC] border border-[#D7E7EA] rounded-2xl overflow-hidden shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-bg-soft">
                <img
                  src={`${imageBasePath}${card.image}`}
                  alt={card.alt}
                  width={720}
                  height={405}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5 sm:p-6 lg:p-7 text-left flex flex-col gap-5">
                <div className="space-y-3">
                  <span className="inline-flex w-fit rounded-full border border-[#C0AC87]/50 bg-[#EDEBDF] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#6F5F40] font-mono">
                    {card.label}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-text-navy tracking-tight leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-2.5">
                  {card.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="min-h-11 rounded-xl bg-white border border-[#D7E7EA] px-3 py-2.5 text-xs font-bold text-text-navy leading-snug flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary-teal shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onEnquire}
                  className="mt-auto inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-full bg-primary-teal px-5 py-3 text-xs font-heading font-extrabold uppercase tracking-widest text-white shadow-md transition-all duration-200 hover:bg-[#072033] focus:outline-none focus:ring-2 focus:ring-[#FABC09]"
                >
                  Enquire for This Program
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
