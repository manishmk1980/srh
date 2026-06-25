import React, { useState } from 'react';
import { Activity, ArrowRight, Building, Building2, ClipboardPlus, Clock, Cpu, FileText, HeartHandshake, Mail, MapPin, MapPinned, Menu, MonitorSmartphone, Phone, ShieldCheck, Stethoscope, Users2, X } from 'lucide-react';

import Logo from './components/Logo';
import KioskSimulator from './components/KioskSimulator';
import ServiceInquiryForm from './components/ServiceInquiryForm';
import HealthScoreCalculator from './components/HealthScoreCalculator';
import ProgramCardsSection from './components/ProgramCardsSection';
import { ServiceType } from './types';

// @ts-ignore
import vanityModelImg from './assets/images/vanity_model_1782106728077.jpg';
// @ts-ignore
import linearActuatorImg from './assets/images/linear_actuator_model_1782106748197.jpg';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleOpenBooking = (_serviceId: ServiceType | null = null) => {
    const contact = document.getElementById('contact-panel');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }

    setMobileMenuOpen(false);
  };

  const getContactHref = (model: 'Vanity Model' | 'Linear Actuator Model') =>
    `/?model=${encodeURIComponent(model)}#contact-panel`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Curated list of B2C services
  const servicesList = [
    {
      id: ServiceType.VITAL_SCREENING,
      title: 'Vital Screening Protocol',
      tagline: 'Elementary Metrics',
      duration: '15 Mins duration',
      desc: 'Our essential diagnostic series. Collects core vital signs using medical-grade clinical hardware panels to output immediate results summary.',
      icon: <Activity className="w-6 h-6 text-rose-600" />,
      benefits: [
        'Electrocardiogram (ECG) pulse trace',
        'Cuff-based Systolic/Diastolic Blood Pressure',
        'Photodiode Blood Oxygen (SpO2%) registers',
        'Thermal infrared Body Temperature read',
        'Immediate standardized health report print'
      ],
      colorTheme: 'rose'
    },
    {
      id: ServiceType.VITALS_CONSULTATION,
      title: 'Vitals + Doctor Consultation',
      tagline: 'Highly Recommended',
      duration: '30 Mins duration',
      desc: 'Extends vital screening checks with live remote general physician advice. Seamlessly links you to licensed medical experts directly.',
      icon: <Stethoscope className="w-6 h-6 text-[#0E7490]" />,
      benefits: [
        'Includes all 5 primary vital measurements',
        'Secure video teleconsultation on-screen',
        'Real-time prescription synchronization',
        'Personal clinical wellness assessment guidelines',
        'Safe digital file records backup (am_sales)'
      ],
      colorTheme: 'cyan',
      featured: true
    },
    {
      id: ServiceType.FOLLOW_UP,
      title: 'Follow-up Consultation',
      tagline: 'Continuous Continuity',
      duration: '20 Mins duration',
      desc: 'Ensure proper tracking of test outcomes. Discuss secondary reports, lifestyle changes, and progress checkpoints with digital physicians.',
      icon: <Activity className="w-6 h-6 text-emerald-600" />,
      benefits: [
        'Clinical progress chart comparison',
        'Prescription refit & dosage adjustments',
        'Interpretation of external pathology reports',
        'Chronic lifestyle habit tracking reviews',
        'Assisted medical helpline support access'
      ],
      colorTheme: 'emerald'
    },
    {
      id: ServiceType.SPECIALIST,
      title: 'Specialist Consultation',
      tagline: 'In-Depth Diagnostics',
      duration: '40 Mins duration',
      desc: 'Direct consultation with seasoned medical specialists (Cardiologists, Diabetologists, General Surgeons) for complex diagnostics analysis.',
      icon: <Users2 className="w-6 h-6 text-[#1D4ED8]" />,
      benefits: [
        'Full review of medical history records',
        'Extended specialist video consultation',
        'Targeted diagnostic advisory directives',
        'Referral recommendations if clinically required',
        'Top priority slots in Ambey Sales partner clinics'
      ],
      colorTheme: 'indigo'
    }
  ];

  // Curated FAQ list
  const faqs = [
    {
      q: 'Who operates SRH SWASTH SEVA?',
      a: 'SRH SWASTH SEVA is a healthcare service and kiosk deployment segment operated by M/S AMBEY SALES. M/S AMBEY SALES handles healthcare service enquiries, B2B kiosk deployment enquiries, booking/payment coordination, local operations, and distribution-related coordination. Technical platform and product technology support is provided by ReachAIMedTech.'
    },
    {
      q: 'What is the Linear Actuator Model Kiosk?',
      a: 'The Linear Actuator Model is our flagship medical checkup kiosk. It houses automated medical-grade sensors to check high-precision vitals (ECG, blood pressure, blood oxygen, temperature, body weight) and features a high-speed teleconsultation video panel.'
    },
    {
      q: 'Can clinics, hospitals, NGOs, and CSR teams enquire?',
      a: 'Yes. SRH SWASTH SEVA supports enquiries from clinics, hospitals, diagnostic centers, NGOs, CSR programs, industrial wellness teams, rural healthcare networks, and channel partners.'
    },
    {
      q: 'Can NGOs and Corporate spaces request kiosk camps?',
      a: 'Yes. NGOs, corporate HR teams, CSR sponsors, and industrial wellness teams can discuss screening camps, referral workflows, and telemedicine supported kiosk deployment needs with M/S AMBEY SALES.'
    },
    {
      q: 'How do I download my vital screening reports?',
      a: 'As soon as your assessment session at an Ambey Sales kiosk finishes, you will immediately receive a physical thermal slip print. Additionally, a synchronized digital copy is instantly pushed to your registered mobile number and email ID.'
    }
  ];

  return (
    <div className="min-h-screen bg-bg-light text-text-navy selection:bg-primary-teal selection:text-white" id="srh-main-app-root">
      
      {/* 1. TOP ACCESS PANEL (Alert block about secure booking status) */}
      <div id="srh-topbar" className="bg-[#072033] text-white py-2 px-3 sm:px-6 border-b border-white/5 text-center text-[10px] sm:text-[11px] font-mono tracking-wide font-semibold select-none z-50 relative flex flex-nowrap justify-center items-center gap-2 sm:gap-3 overflow-hidden whitespace-nowrap">
        <span className="flex items-center gap-1.5 text-[#FABC09]">
          <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED HEALTHCARE SERVICES
        </span>
        <span className="hidden md:inline text-slate-400">•</span>
        <span className="hidden sm:inline">Secure Service Enquiry Support Available</span>
        <span className="hidden md:inline text-slate-400">•</span>
        <span className="hidden md:inline text-cyan-400 font-bold">M/S AMBEY SALES Healthcare Services</span>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#D7E7EA] min-h-[68px] sm:min-h-[84px] z-50 transition-all shadow-xs" id="srh-main-nav">
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Logo with clean compact alignment */}
          <Logo variant="compact" size={52} className="cursor-pointer" />
          
          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-text-muted" aria-label="Main Navigation">
            <button onClick={() => scrollToSection('about-narrative')} className="hover:text-primary-teal focus:text-primary-teal outline-none transition-colors">About</button>
            <button onClick={() => scrollToSection('clinical-plans')} className="hover:text-primary-teal focus:text-primary-teal outline-none transition-colors">Services</button>
            <button onClick={() => scrollToSection('digital-kiosk')} className="hover:text-primary-teal focus:text-primary-teal outline-none transition-colors">Technology</button>
            <button onClick={() => scrollToSection('onboarding-timeline')} className="hover:text-primary-teal focus:text-primary-teal outline-none transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('faq-block')} className="hover:text-primary-teal focus:text-primary-teal outline-none transition-colors">FAQs</button>
            <button onClick={() => scrollToSection('contact-panel')} className="hover:text-primary-teal focus:text-primary-teal outline-none transition-colors">Contact</button>
          </nav>

          {/* Right Action Trigger CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => handleOpenBooking()}
              className="px-5 py-2.5 bg-primary-teal hover:bg-[#072033] text-white text-[11px] font-extrabold uppercase tracking-widest rounded-full transition-all duration-200 select-none shadow-md flex items-center gap-2 outline-none focus:ring-2 focus:ring-[#FABC09]"
              id="top-cta-book-service"
            >
              <Stethoscope className="w-3.5 h-3.5 shrink-0" /> Enquire Now
            </button>
          </div>

          {/* Handheld Device Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-bg-soft rounded-xl transition-colors text-text-navy outline-none"
            aria-label="Toggle mobile menu navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Dynamic Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#D7E7EA] p-6 space-y-4 shadow-xl animate-fade-in" id="mobile-nav-links-box">
            <div className="flex flex-col gap-3 font-heading font-extrabold text-[#0B1633] tracking-wide text-sm">
              <button onClick={() => scrollToSection('about-narrative')} className="text-left py-2 border-b border-slate-100 hover:text-primary-teal">About</button>
              <button onClick={() => scrollToSection('clinical-plans')} className="text-left py-2 border-b border-slate-100 hover:text-primary-teal">Services</button>
              <button onClick={() => scrollToSection('digital-kiosk')} className="text-left py-2 border-b border-slate-100 hover:text-primary-teal">Our Health Technology</button>
              <button onClick={() => scrollToSection('onboarding-timeline')} className="text-left py-2 border-b border-slate-100 hover:text-primary-teal">How It Works</button>
              <button onClick={() => scrollToSection('faq-block')} className="text-left py-2 border-b border-slate-100 hover:text-primary-teal">FAQs</button>
              <button onClick={() => scrollToSection('contact-panel')} className="text-left py-2 border-b border-slate-100 hover:text-primary-teal">Contact</button>
            </div>
            
            <button
              onClick={() => handleOpenBooking()}
              className="w-full py-3 bg-primary-teal text-white rounded-xl text-xs font-heading font-extrabold text-center uppercase tracking-wider block"
            >
              Enquire Now
            </button>
          </div>
        )}
      </header>

      {/* 3. GRAND HERO CONTAINER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-bg-soft/20 to-bg-light" id="hero-fold">
        {/* Subtle decorative background waves */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-100/10 rounded-full blur-2xl pointer-events-none -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-8 lg:gap-12 items-center">
            
            {/* Left Copy block elements */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-1.5 p-1 px-3 bg-[#EEF8FA] rounded-full border border-teal-200/50 text-[#0E7490] font-sans font-bold text-xs">
                <Stethoscope className="w-3.5 h-3.5 text-primary-teal" /> 
                <span>PREVENTIVE HEALTH SCREENING SUPPORT</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-5xl xl:text-6xl text-text-navy leading-[1.05] tracking-tight">
                  SRH Swasth Seva
                  <span className="block text-primary-teal mt-1 font-extrabold">Har Din Swasth</span>
                </h1>
                
                <p className="font-sans font-semibold text-[#0E7490] text-base sm:text-lg tracking-wide max-w-xl mx-auto lg:mx-0">
                  Preventive healthcare services and telemedicine supported kiosk deployment support for clinics, hospitals, NGOs, CSR programs, industrial wellness teams, and community health initiatives.
                </p>
              </div>

              <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                SRH SWASTH SEVA is a healthcare service and kiosk deployment segment operated by M/S AMBEY SALES. We support community screening initiatives, healthcare service coordination, and B2B deployment/distribution enquiries for telemedicine supported healthcare kiosks. Technical platform and product technology support is provided by ReachAIMedTech.
              </p>

              {/* Action shortcuts */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-3">
                <button
                  onClick={() => handleOpenBooking()}
                  className="w-full sm:w-auto p-4 px-8 bg-primary-teal hover:bg-[#072033] text-white font-heading font-extrabold text-xs tracking-widest uppercase rounded-full transition-all duration-200 select-none shadow-lg flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-[#FABC09]"
                >
                  <Stethoscope className="w-4 h-4" /> Enquire for Kiosk / Service
                </button>

                <button
                  onClick={() => scrollToSection('contact-panel')}
                  className="w-full sm:w-auto p-4 px-8 bg-white border border-[#D7E7EA] hover:border-primary-teal text-text-navy font-heading font-extrabold text-xs tracking-widest uppercase rounded-full transition-all duration-200 select-none shadow-xs flex items-center justify-center gap-2 outline-none"
                >
                  <Mail className="w-4 h-4 text-[#0E7490]" /> Plan Health Camp / CSR Program
                </button>
              </div>

              {/* Quick trust counts */}
              <div className="pt-6 border-t border-[#D7E7EA] flex flex-wrap gap-8 justify-center lg:justify-start">
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-text-navy font-mono">B2B</span>
                  <span className="text-[10px] uppercase font-bold text-text-light">Deployment Enquiries</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-text-navy font-mono">Digital</span>
                  <span className="text-[10px] uppercase font-bold text-text-light">Assisted Workflow</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-text-navy font-mono">Secure</span>
                  <span className="text-[10px] uppercase font-bold text-text-light">Coordination Support</span>
                </div>
              </div>

            </div>

            {/* Right Interactive living simulator column */}
            <div className="lg:col-span-7 xl:col-span-7 w-full">
              <div className="relative max-w-[820px] lg:ml-auto">
                {/* Visual frame highlights */}
                <div className="absolute -inset-1.5 bg-[#FABC09] rounded-[34px] opacity-10 blur-xl"></div>
                
                {/* Embed the living technology kiosk checkup console */}
                <div className="relative z-10">
                  <KioskSimulator />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CORE TRUST BADGES BLOCK */}
      <section className="bg-white py-12 border-y border-[#D7E7EA]" id="core-trust-strip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 bg-bg-light border border-[#D7E7EA] rounded-2xl flex gap-4 items-start shadow-xs">
              <div className="p-2.5 bg-[#072033] rounded-xl text-[#FABC09] shrink-0 mt-0.5">
                <Building className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="font-heading font-black text-[#0B1633] text-sm">Operated by M/S AMBEY SALES</h5>
                <p className="text-xs text-text-muted leading-relaxed">Healthcare service, distribution enquiry, and local coordination partner.</p>
              </div>
            </div>

            <div className="p-5 bg-bg-light border border-[#D7E7EA] rounded-2xl flex gap-4 items-start shadow-xs">
              <div className="p-2.5 bg-[#072033] rounded-xl text-[#FABC09] shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="font-heading font-black text-[#0B1633] text-sm">Secure Enquiry</h5>
                <p className="text-xs text-text-muted leading-relaxed">Service enquiry support with clear follow-up and confirmation process.</p>
              </div>
            </div>

            <div className="p-5 bg-bg-light border border-[#D7E7EA] rounded-2xl flex gap-4 items-start shadow-xs">
              <div className="p-2.5 bg-[#072033] rounded-xl text-[#FABC09] shrink-0 mt-0.5">
                <Activity className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="font-heading font-black text-[#0B1633] text-sm">Digital Health Workflow</h5>
                <p className="text-xs text-text-muted leading-relaxed">Instant thermal printing of metrics sync’d directly to registered SMS and emails.</p>
              </div>
            </div>

            <div className="p-5 bg-bg-light border border-[#D7E7EA] rounded-2xl flex gap-4 items-start shadow-xs">
              <div className="p-2.5 bg-[#072033] rounded-xl text-[#FABC09] shrink-0 mt-0.5">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="font-heading font-black text-[#0B1633] text-sm">Preventative Wellness</h5>
                <p className="text-xs text-text-muted leading-relaxed">Early-stage vital checkups to track indices, prevent escalation & secure healthier tomorrows.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. ABOUT NARRATIVE FOLD */}
      <section className="py-14 sm:py-16 lg:py-20 bg-bg-light relative" id="about-narrative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Graphic placeholder */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm rounded-[32px] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                <div className="absolute inset-0 bg-linear-to-tr from-primary-teal/20 to-transparent"></div>
                {/* Elegant placeholder illustrating health camp with kiosk */}
                <div className="p-8 text-center bg-[#072033] text-white space-y-4 py-16">
                  <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl text-[#FABC09]">
                    <Logo variant="full" size={76} />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#FABC09] font-bold tracking-widest uppercase font-mono">MISSION STATEMENT</span>
                    <h4 className="font-heading font-black text-xl">Har Din Swasth</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-xs mx-auto">
                    To make basic, life-saving vital screenings accessible and affordable to every single person in the Indian subcontinent.
                  </p>
                  <div className="pt-2">
                    <span className="p-1 px-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider">
                      ISO 9001:2015 REGISTERED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Editorial Copy elements */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">COMMUNITY ORIENTED PREVENTION</span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-navy tracking-tight leading-tight">
                  About SRH Swasth Seva
                </h2>
                <div className="w-16 h-1.5 bg-primary-teal rounded-full"></div>
              </div>

              <div className="space-y-4 font-sans text-sm md:text-base text-text-muted leading-relaxed">
                <p>
                  SRH SWASTH SEVA represents a next-generation healthcare initiative committed to early preventative diagnosis. We realize that most complex cardiac, respiratory, and diabetic crises can be safely mitigated if initial vitals indicators are tracked routinely.
                </p>
                <p>
                  Operated as a healthcare service and kiosk deployment segment by <span className="font-bold text-text-navy">M/S AMBEY SALES</span>, SRH SWASTH SEVA supports assisted screening, consultation coordination, and B2B deployment enquiries. Technical platform and product technology support is provided by ReachAIMedTech.
                </p>
                <p>
                  Whether you are an individual wanting quick peace of mind checkup, an NGO planning health camps for rural communities, or a corporate HR department coordinating employee medical screening programs, SRH Swasth Seva provides structured trust.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-[#D7E7EA] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-text-navy">Assisted Screening Workflow</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#D7E7EA] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-text-navy">Consultation Coordination</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#D7E7EA] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-text-navy">Camp & Clinic Deployment</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#D7E7EA] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-text-navy">Digital Record Workflow</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. HEALTHCARE DEPLOYMENT & OUTREACH PROGRAMS */}
      <ProgramCardsSection onEnquire={() => handleOpenBooking()} />

      {/* 7. SERVICES GRID */}
      <section className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#D7E7EA]" id="service-options">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">PREVENTIVE SCREENING SERVICES</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-navy tracking-tight leading-tight">
              Healthcare Services & Kiosk Support Options
            </h2>
            <p className="text-xs text-text-muted max-w-3xl mx-auto font-sans leading-relaxed">
              SRH SWASTH SEVA helps individuals and organizations plan assisted screening workflows, consultation coordination, and next-step service enquiries through M/S AMBEY SALES.
            </p>
          </div>

          {/* Services cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {servicesList.map((srv) => (
              <div 
                key={srv.id}
                className={`relative bg-[#F7FBFC] border border-[#D7E7EA] rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden group hover:shadow-xl hover:-translate-y-1 ${
                  srv.featured ? 'ring-2 ring-primary-teal bg-white' : ''
                }`}
                id={`plan-card-${srv.id}`}
              >
                {srv.featured && (
                  <div className="absolute top-0 right-0 bg-primary-teal text-[#FABC09] text-[9px] font-extrabold uppercase p-1.5 px-3.5 rounded-bl-xl font-mono tracking-wider">
                    RECOMMENDED PLAN
                  </div>
                )}

                <div className="space-y-4">
                  {/* Icon + Title block */}
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white border border-[#D7E7EA] rounded-2xl shadow-xs text-primary-teal">
                      {srv.icon}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-text-light mt-1.5">
                      {srv.tagline}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <h4 className="font-heading font-black text-text-navy text-base leading-tight">
                      {srv.title}
                    </h4>
                    <span className="inline-block p-0.5 px-2 bg-[#EEF8FA] rounded text-[10px] font-mono font-bold text-[#0E7490]">
                      {srv.duration}
                    </span>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed font-sans font-medium line-clamp-3">
                      {srv.desc}
                    </p>
                  </div>

                  <hr className="border-[#D7E7EA]/50" />

                  {/* Benefits Checklist layout matching WCAG contrast requirements */}
                  <ul className="space-y-2 text-left text-xs font-sans text-text-navy font-medium">
                    {srv.benefits.map((b, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs">
                        <span className="text-emerald-500 font-extrabold text-[10px] shrink-0 mt-0.5">✓</span>
                        <span className="leading-tight text-text-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-5 border-t border-[#D7E7EA]/50 text-left space-y-4">
                  <p className="text-[12px] text-text-muted leading-relaxed font-medium">
                    Service scope, deployment fit, and next steps will be confirmed by our support team after enquiry.
                  </p>

                  <button
                    onClick={() => handleOpenBooking(srv.id)}
                    className={`w-full py-3 rounded-full font-heading font-extrabold text-xs tracking-wider uppercase transition-all select-none shadow-md outline-none focus:ring-2 focus:ring-[#FABC09] ${
                      srv.featured 
                        ? 'bg-primary-teal hover:bg-[#072033] text-white' 
                        : 'bg-white border border-slate-300 hover:border-primary-teal text-text-navy'
                    }`}
                  >
                    Request Recommendation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS TIMELINE SECTION */}
      <section className="py-14 sm:py-16 lg:py-20 bg-bg-light" id="onboarding-timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 max-w-xl mx-auto mb-12">
            <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">4-STEP WELLNESS ONBOARDING</span>
            <h2 className="font-heading font-black text-3xl text-text-navy tracking-tight">How It Works</h2>
            <p className="text-xs text-text-muted font-sans leading-relaxed">
              Follow our simple, streamlined preventative health care workflow to securely calculate vitals and consult doctors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Horizontal timeline connector lines for desktop */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-[#D7E7EA] -z-10"></div>

            <div className="p-5 text-center bg-white border border-[#D7E7EA] rounded-2xl relative shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-primary-teal text-white rounded-full font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4 border-2 border-[#FABC09] shadow-md">
                  1
                </div>
                <h4 className="font-heading font-black text-[#0B1633] text-sm mb-2">Choose Service</h4>
                <p className="text-xs text-text-muted font-sans leading-relaxed">
                  Browse or use our dynamic assessment calculator to select the preventative screening program matching your diagnostic needs.
                </p>
              </div>
            </div>

            <div className="p-5 text-center bg-white border border-[#D7E7EA] rounded-2xl relative shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-[#072033] text-white rounded-full font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4 border-2 border-[#CBD5E1] shadow-md">
                  2
                </div>
                <h4 className="font-heading font-black text-[#0B1633] text-sm mb-2">Submit Service Enquiry</h4>
                <p className="text-xs text-text-muted font-sans leading-relaxed">
                  Submit your service enquiry. Our support team will confirm service availability, scope, and next steps.
                </p>
              </div>
            </div>

            <div className="p-5 text-center bg-white border border-[#D7E7EA] rounded-2xl relative shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-primary-teal text-white rounded-full font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4 border-2 border-[#FABC09] shadow-md">
                  3
                </div>
                <h4 className="font-heading font-black text-[#0B1633] text-sm mb-2">Clinical Vitals Test</h4>
                <p className="text-xs text-text-muted font-sans leading-relaxed">
                  Screen vitals through assisted kiosk workflows coordinated by M/S AMBEY SALES. The supported models help capture screening parameters.
                </p>
              </div>
            </div>

            <div className="p-5 text-center bg-white border border-[#D7E7EA] rounded-2xl relative shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-[#072033] text-white rounded-full font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4 border-2 border-[#CBD5E1] shadow-md">
                  4
                </div>
                <h4 className="font-heading font-black text-[#0B1633] text-sm mb-2">Get Reports & Advice</h4>
                <p className="text-xs text-text-muted font-sans leading-relaxed">
                  Receive screening records with service guidance, and discuss consultation coordination where applicable.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PRODUCT SHOWCASE SECTION */}
      <section className="py-14 sm:py-16 lg:py-20 bg-white border-y border-[#E5E2DB]" id="digital-kiosk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 max-w-xl mx-auto mb-16">
            <span className="text-xs text-primary-teal font-extrabold uppercase tracking-widest font-mono">OUR ADVANCED HARDWARE</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-navy tracking-tight leading-none">Our Health Kiosks</h2>
            <div className="w-12 h-1 bg-primary-teal mx-auto mt-4 rounded-full"></div>
            <p className="text-xs text-text-muted leading-relaxed font-sans max-w-md mx-auto mt-2">
              Telemedicine supported healthcare kiosk options for service coordination, B2B deployment enquiries, and community screening workflows. Technical platform and product technology support is provided by ReachAIMedTech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* 1. Vanity Model Card */}
            <div className="bg-white rounded-3xl border border-[#E5E2DB] overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
              <div className="relative aspect-video w-full overflow-hidden bg-bg-light flex items-center justify-center p-4 border-b border-[#E5E2DB]/50">
                <img 
                  src={vanityModelImg} 
                  alt="Vanity Model" 
                  className="object-cover w-full h-full rounded-2xl group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4 text-left">
                  <div>
                    <h3 className="font-heading font-black text-2xl text-text-navy tracking-tight">Vanity Model</h3>
                    <p className="text-xs text-text-muted font-sans mt-1.5 leading-relaxed">
                      Entry-level kiosk for small clinics, rural centers, NGO programs, and community screening points.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8A7650] font-mono block">Ideal For:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-[#EDEBDF] text-primary-teal rounded-full font-sans">Small Clinics</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-[#EDEBDF] text-primary-teal rounded-full font-sans">Rural Healthcare</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-[#EDEBDF] text-primary-teal rounded-full font-sans">NGOs</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8A7650] font-mono block">Key Features:</span>
                    <ul className="grid grid-cols-1 gap-1.5 text-xs text-text-muted font-sans font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal shrink-0"></span>
                        <span>Telemedicine support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal shrink-0"></span>
                        <span>Basic vital signs capture</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal shrink-0"></span>
                        <span>Patient registration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal shrink-0"></span>
                        <span>Cloud storage</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E2DB]/60 text-left">
                  <a 
                    href="/vanity-model"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0E7490] hover:text-primary-teal transition-all group/btn"
                  >
                    <span>View Deployment Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href={getContactHref('Vanity Model')}
                    className="ml-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-text-navy hover:text-primary-teal transition-all"
                  >
                    Enquire for Vanity Model
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Linear Actuator Model Card */}
            <div className="bg-white rounded-3xl border border-[#E5E2DB] overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
              <div className="relative aspect-video w-full overflow-hidden bg-bg-light flex items-center justify-center p-4 border-b border-[#E5E2DB]/50">
                <img 
                  src={linearActuatorImg} 
                  alt="Linear Actuator Model" 
                  className="object-cover w-full h-full rounded-2xl group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4 text-left">
                  <div>
                    <h3 className="font-heading font-black text-2xl text-text-navy tracking-tight">Linear Actuator Model</h3>
                    <p className="text-xs text-text-muted font-sans mt-1.5 leading-relaxed">
                      Advanced kiosk for hospitals, multi-specialty clinics, CSR programs, and institutional healthcare networks.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8A7650] font-mono block">Ideal For:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-[#EDEBDF] text-primary-teal rounded-full font-sans">Hospitals</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-[#EDEBDF] text-primary-teal rounded-full font-sans">Multi-Specialty Clinics</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-[#EDEBDF] text-primary-teal rounded-full font-sans">CSR Programs</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8A7650] font-mono block">Key Features:</span>
                    <ul className="grid grid-cols-1 gap-1.5 text-xs text-text-muted font-sans font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal shrink-0"></span>
                        <span>Advanced diagnostics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal shrink-0"></span>
                        <span>EMR integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal shrink-0"></span>
                        <span>Analytics dashboard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal shrink-0"></span>
                        <span>Multi-location management</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E2DB]/60 text-left">
                  <a 
                    href="/linear-actuator-model"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0E7490] hover:text-primary-teal transition-all group/btn"
                  >
                    <span>View Deployment Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href={getContactHref('Linear Actuator Model')}
                    className="ml-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-text-navy hover:text-primary-teal transition-all"
                  >
                    Enquire for Linear Actuator Model
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. TECHNOLOGY READINESS & SERVICE TRANSPARENCY SECTION */}
      <section className="py-14 sm:py-16 lg:py-20 bg-bg-light relative overflow-hidden border-b border-[#E5E2DB] medical-grid-pattern" id="certifications-compliance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 p-1 px-4 bg-[#EDEBDF] border border-[#E5E2DB] rounded-full text-[10px] font-mono font-extrabold tracking-widest text-[#8A7650]">
              <span>READINESS - TRANSPARENCY - SUPPORT</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-navy tracking-tight">
              Technology Readiness & Service Transparency
            </h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans max-w-lg mx-auto">
              Clear, enquiry-led information for assisted screening workflows, telemedicine support coordination, and B2B kiosk deployment coordination.
            </p>
            <span className="block text-[10px] font-extrabold text-primary-teal tracking-widest uppercase font-mono mt-6">
              Service Transparency
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              {
                title: 'Assisted Screening Workflow',
                description: 'Structured support for preventive screening and enquiry-led service coordination.',
                badge: 'ENQUIRY-LED',
                icon: ClipboardPlus,
              },
              {
                title: 'Telemedicine Support Coordination',
                description: 'Assisted consultation coordination where service scope and availability permit.',
                badge: 'ENQUIRY-LED',
                icon: MonitorSmartphone,
              },
              {
                title: 'Digital Record Coordination',
                description: 'Helps organize screening records and follow-up communication workflows.',
                badge: 'ENQUIRY-LED',
                icon: FileText,
              },
              {
                title: 'B2B Deployment Enquiry Support',
                description: 'For clinics, hospitals, NGOs, CSR programs, and channel partners evaluating kiosk deployment.',
                badge: 'ENQUIRY-LED',
                icon: Building2,
              },
              {
                title: 'Community Health Camp Readiness',
                description: 'Supports discussion and planning for outreach camps and local screening drives.',
                badge: 'ENQUIRY-LED',
                icon: MapPinned,
              },
              {
                title: 'Technical Platform Support by ReachAIMedTech',
                description: 'Technical platform and product technology support is attributed to ReachAIMedTech.',
                badge: 'ENQUIRY-LED',
                icon: Cpu,
              },
            ].map(({ title, description, badge, icon: Icon }) => (
              <div key={title} className="group bg-white rounded-2xl border border-[#E5E2DB] p-5 sm:p-6 flex flex-col justify-between items-center text-center shadow-xs min-h-[240px] relative transition-all duration-300 hover:-translate-y-1 hover:border-[#C0AC87]/70 hover:shadow-lg">
                <div className="absolute top-2.5 right-2.5">
                  <span className="w-2 h-2 rounded-full bg-primary-teal flex animate-pulse-slow"></span>
                </div>
                <div className="w-16 h-16 rounded-full bg-bg-light border border-[#E5E2DB] flex items-center justify-center text-primary-teal shadow-inner mb-5 transition-colors duration-300 group-hover:bg-[#EDEBDF] group-hover:text-[#314136]" aria-hidden="true">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-heading font-black text-text-navy text-sm sm:text-base leading-tight">{title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed font-medium font-sans">{description}</p>
                </div>
                <div className="mt-5 p-1 px-2.5 bg-[#EDEBDF] rounded-md text-[8px] font-extrabold text-primary-teal tracking-wider font-mono">
                  {badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE SELF-ASSESSMENT GRID SEGMENT */}
      <section className="py-14 sm:py-16 lg:py-20 bg-white border-y border-[#D7E7EA]" id="patient-self-test-fold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Embed self-check assessment scorecard */}
            <div className="lg:col-span-6 w-full">
              <HealthScoreCalculator onSelectRecommendedService={(serviceId) => handleOpenBooking(serviceId)} />
            </div>

            {/* Right Column: Neutral service transparency content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">SERVICE TRANSPARENCY</span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-text-navy tracking-tight leading-tight">
                  Enquiry-led screening and deployment guidance
                </h3>
              </div>

              <div className="space-y-5">
                <div className="p-5 bg-bg-light border border-[#D7E7EA] rounded-2xl relative">
                  <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                    SRH SWASTH SEVA supports preventive screening, consultation coordination, and B2B kiosk deployment enquiries. Service scope, model fit, and next steps are confirmed after enquiry review by the M/S AMBEY SALES coordination team.
                  </p>
                  <div className="mt-3 flex justify-between items-center gap-3">
                    <span className="text-xs font-bold text-text-navy">Community and B2B readiness</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded font-mono">ENQUIRY FIRST</span>
                  </div>
                </div>

                <div className="p-5 bg-bg-light border border-[#D7E7EA] rounded-2xl relative">
                  <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                    Technical platform and product technology support is provided by ReachAIMedTech. M/S AMBEY SALES handles healthcare service enquiries, local coordination, booking/payment coordination, and distribution-related coordination.
                  </p>
                  <div className="mt-3 flex justify-between items-center gap-3">
                    <span className="text-xs font-bold text-text-navy">Clear responsibility split</span>
                    <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded font-mono">TRANSPARENT</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION */}
      <section className="py-14 sm:py-16 lg:py-20 bg-bg-light" id="faq-block">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">RESOLVING YOUR INQUIRIES</span>
            <h2 className="font-heading font-black text-3xl text-text-navy tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs text-text-muted font-sans font-medium">
              Find straightforward clarifications on service coordination, kiosk deployment enquiries, community programs, and Ambey Sales support workflows.
            </p>
          </div>

          <div className="space-y-3" id="faq-accordion-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-[#D7E7EA] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 md:p-5 text-left font-heading font-black text-text-navy text-xs sm:text-sm flex justify-between items-center gap-4 hover:bg-bg-soft/50 outline-none focus:bg-bg-soft/70"
                  aria-expanded={activeFaq === idx}
                >
                  <span>{faq.q}</span>
                  <span className="text-primary-teal text-base font-bold select-none leading-none shrink-0">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="p-5 pt-0 border-t border-slate-100 font-sans text-xs sm:text-sm text-text-muted leading-relaxed animate-fade-in font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. GET IN TOUCH AND SUPPORT PANEL HEADER */}
      <section className="py-14 sm:py-16 lg:py-20 bg-white border-t border-[#D7E7EA]" id="contact-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Contact details list */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">SECURE COMMUNICATIONS</span>
                <h2 className="font-heading font-black text-3xl text-text-navy tracking-tight leading-none">Get in Touch</h2>
                <p className="text-xs text-text-muted leading-relaxed font-sans font-medium">
                  Send service, deployment, partnership, CSR, clinic, hospital, NGO, distributor, or screening enquiries to the M/S AMBEY SALES coordination team.
                </p>
              </div>

              <div className="space-y-5">
                
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-[#EEF8FA] text-[#0E7490] rounded-xl shrink-0 mt-0.5 border border-[#D7E7EA]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-text-navy uppercase tracking-wider text-[10px]">Headquarter Address</span>
                    <div className="grid grid-cols-1 gap-1 text-text-muted font-sans font-medium">
                      <p><span className="font-bold text-text-navy">Legal Business Name:</span> M/S AMBEY SALES</p>
                      <p><span className="font-bold text-text-navy">Brand / Healthcare Segment:</span> SRH SWASTH SEVA</p>
                      <p><span className="font-bold text-text-navy">GSTIN:</span> 20BARPS8776D1Z8</p>
                      <p><span className="font-bold text-text-navy">Website:</span> https://srh.ambeysales.com/</p>
                      <p><span className="font-bold text-text-navy">Contact Number:</span> +91 92344 65621</p>
                      <p><span className="font-bold text-text-navy">Technical Platform Support:</span> ReachAIMedTech</p>
                    </div>
                    <p className="text-text-muted leading-relaxed font-sans font-medium">
                      Ground Floor, Building No./Flat No. 0, P.O. - Sarjamda, P.S. - Parsudih, Village - Bamangora, Near Salgajhuri Cabin, Parsudih, Jamshedpur, East Singhbhum, Jharkhand - 831002, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-[#EEF8FA] text-[#0E7490] rounded-xl shrink-0 mt-0.5 border border-[#D7E7EA]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-text-navy uppercase tracking-wider text-[10px]">Calling Helplines:</span>
                    <p className="text-text-muted font-sans font-medium leading-relaxed">
                      Hotline 1: <a href="tel:+919876543210" className="text-primary-teal font-mono hover:underline font-bold">+91 92344 65621</a><br />
                      Hotline 2: <a href="tel:+911204567890" className="text-primary-teal font-mono hover:underline font-bold">+91 92344 65621</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-[#EEF8FA] text-[#0E7490] rounded-xl shrink-0 mt-0.5 border border-[#D7E7EA]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-text-navy uppercase tracking-wider text-[10px]">Official Support Emails:</span>
                    <p className="text-text-muted font-sans font-medium leading-relaxed">
                      Temporary enquiry email: <a href="mailto:contactmanishm@gmail.com" className="text-primary-teal font-mono hover:underline font-bold">contactmanishm@gmail.com</a><br />
                      Corporate hub: <a href="mailto:info@srhswasthseva.com" className="text-primary-teal font-mono hover:underline font-bold">info@srhswasthseva.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-[#EEF8FA] text-[#0E7490] rounded-xl shrink-0 mt-0.5 border border-[#D7E7EA]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-text-navy uppercase tracking-wider text-[10px]">Office Support Hours:</span>
                    <p className="text-text-muted font-sans font-medium leading-relaxed">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday Support slot: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>

              </div>

              {/* Safety banner */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-800 font-sans leading-relaxed font-semibold">
                This form is for service, deployment, partnership, and screening enquiry coordination only. For emergencies, contact emergency medical services or visit the nearest hospital.
              </div>
            </div>

            {/* Right Column: Service inquiry submission form */}
            <div className="lg:col-span-7 bg-[#F7FBFC] p-6 sm:p-8 rounded-[32px] border border-[#D7E7EA] shadow-xs relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="space-y-1 mb-6 border-b border-[#D7E7EA] pb-3">
                <span className="text-[10px] font-extrabold uppercase font-mono text-[#0E7490]">Service Enquiry Desk</span>
                <h4 className="font-heading font-black text-[#0B1633] text-lg">Send Service Enquiry</h4>
              </div>

              {/* Import form handler for enquiry submissions */}
              <ServiceInquiryForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
