import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2, ClipboardList, Home, Mail, MapPin, Phone, ShieldCheck, Stethoscope } from 'lucide-react';

import Logo from '../components/Logo';
import SocialIcon from '../components/SocialIcon';
import vanityModelImg from '../assets/images/vanity_model_1782106728077.jpg';
import linearActuatorImg from '../assets/images/linear_actuator_model_1782106748197.jpg';

type ProductSlug = 'vanity-model' | 'linear-actuator-model';

const ownershipCopy = 'SRH SWASTH SEVA is a healthcare service and kiosk deployment segment operated by M/S AMBEY SALES. M/S AMBEY SALES handles healthcare service enquiries, B2B kiosk distribution/deployment enquiries, booking/payment coordination, local operations, and distribution-related coordination. Technical platform and product technology support is provided by ReachAIMedTech.';
const deploymentSupportCopy = 'SRH SWASTH SEVA, operated by M/S AMBEY SALES, supports interested organizations with model selection, B2B deployment discussion, local coordination, healthcare service workflow planning, and post-enquiry coordination. Technical platform and product technology support is provided by ReachAIMedTech.';

const productPages = {
  'vanity-model': {
    title: 'Vanity Model',
    h1: 'Vanity Model - Entry-Level Health Screening Kiosk',
    eyebrow: 'ENTRY-LEVEL COMMUNITY HEALTH KIOSK',
    subtitle: 'Compact preventive health screening setup for small clinics, rural healthcare points, NGO programs, and community camps.',
    body: 'The Vanity Model supports SRH SWASTH SEVA\'s community-first healthcare approach by supporting basic vitals screening, digital record capture, and consultation coordination in small-footprint environments. It is suitable for rural and semi-urban locations where early screening, quick referral, and simple patient flow matter more than a large hospital-grade setup.',
    metaTitle: 'Vanity Model | Rural Health Screening Kiosk in Jharkhand | SRH Swasth Seva',
    metaDescription: 'Explore the Vanity Model for SRH Swasth Seva: an entry-level health screening and telemedicine support setup for small clinics, rural healthcare centers, NGO programs, and community screening camps in Jharkhand.',
    canonical: 'https://srh.ambeysales.com/vanity-model',
    image: vanityModelImg,
    imageAlt: 'Vanity Model compact telemedicine kiosk for community health screening support',
    badges: ['Quick Deploy', 'Rural & Semi-Urban Fit', 'Teleconsultation Support', 'Basic Vitals Workflow'],
    suitableFor: ['Small clinics', 'Rural healthcare centers', 'NGO health programs', 'CSR screening camps', 'Local diagnostic support points', 'Community health entrepreneurs', 'Semi-urban wellness centers'],
    contextHeading: 'Designed for Jharkhand\'s community healthcare needs',
    context: [
      'Jharkhand\'s healthcare access needs are spread across rural, semi-urban, tribal, and industrial-adjacent communities. A compact kiosk model helps create a first screening point where people can check essential vitals, receive assisted digital workflow support, and be guided toward consultation or referral when required.',
      'For SRH SWASTH SEVA, the Vanity Model is best suited for community-level screening, basic wellness checks, outreach camps, and smaller service points where fast setup and simple operation are important.',
    ],
    contextCards: [
      ['Rural Clinics', 'For small clinics and first-touch healthcare points.'],
      ['Community Camps', 'For preventive screening drives and local outreach.'],
      ['NGO / CSR Programs', 'For structured health access initiatives.'],
      ['Referral Support', 'For cases that need doctor or specialist review.'],
    ],
    overviewHeading: 'Perfect for small deployments',
    overview: 'The Vanity Model is an entry-level telemedicine and diagnostics kiosk intended for smaller healthcare deployments. It supports essential screening workflows without requiring heavy infrastructure. This makes it useful for clinics, rural health centers, health camps, and partner-led outreach programs that need a practical way to start preventive screening services.',
    capabilities: ['ECG screening support', 'Blood glucose monitoring', 'Digital stethoscope workflow', 'Spirometry / PFT screening support', 'Electronic health record workflow', 'Telemedicine and consultation coordination', 'E-prescription workflow support', 'Basic dashboard and reporting', 'Referral coordination support', 'Role-based access workflow'],
    specs: [
      ['Display', '24" touchscreen'],
      ['Diagnostics', '5+ vital devices'],
      ['Connectivity', 'WiFi / 4G'],
      ['Storage', 'Cloud-based'],
      ['Deployment timeline', '1-2 weeks'],
      ['Training', 'Online and on-site'],
      ['Best fit', 'Small clinics, rural centers, NGO programs, community camps'],
    ],
    why: [
      ['Lower entry complexity', 'Useful where the goal is to start health screening without creating a large infrastructure burden.'],
      ['Faster rollout', 'Suitable for quick community deployments, health camps, and small healthcare points.'],
      ['Practical for rural and semi-urban locations', 'Works well where assisted screening and consultation coordination need to happen close to the community.'],
      ['Supports referral-led care', 'Helps identify cases that may need doctor consultation, follow-up, or specialist referral.'],
      ['Digital workflow readiness', 'Supports patient records, screening logs, and basic reporting workflows.'],
      ['Scalable start', 'A practical starting point before moving to larger institutional models.'],
    ],
    faqs: [
      ['Is the Vanity Model suitable for rural Jharkhand?', 'Yes. It is suitable for smaller, assisted screening environments such as rural clinics, community camps, NGO programs, and semi-urban health points.'],
      ['Does SRH manufacture the kiosk?', 'No. SRH SWASTH SEVA is a healthcare service segment operated by M/S AMBEY SALES. Technical platform and product technology support is provided by ReachAIMedTech.'],
      ['Can this model support health camps?', 'Yes. It is suitable for basic vitals screening, consultation coordination, and referral-oriented health camps.'],
      ['Are commercial details displayed online?', 'No. Commercial details depend on service scope, deployment location, support needs, and operational model. Visitors should submit an enquiry.'],
      ['Is this an emergency medical service?', 'No. SRH SWASTH SEVA supports preventive screening and consultation coordination. For emergencies, patients should contact emergency medical services or visit the nearest hospital.'],
    ],
    primaryCta: 'Enquire for Vanity Model',
    secondaryCta: 'Discuss Rural / Camp Deployment',
  },
  'linear-actuator-model': {
    title: 'Linear Actuator Model',
    h1: 'Linear Actuator Model - Advanced Health Screening Kiosk',
    eyebrow: 'ADVANCED INSTITUTIONAL HEALTH KIOSK',
    subtitle: 'Advanced telemedicine and diagnostics setup for hospitals, multi-specialty clinics, CSR health programs, and organized healthcare networks.',
    body: 'The Linear Actuator Model supports more advanced healthcare screening, consultation coordination, and multi-site service workflows. It is suitable for hospitals, larger clinics, industrial wellness programs, and CSR-backed healthcare initiatives that need a stronger diagnostic setup and more structured reporting.',
    metaTitle: 'Linear Actuator Model | Advanced Telemedicine Kiosk Jharkhand | SRH Swasth Seva',
    metaDescription: 'Learn about the Linear Actuator Model for SRH Swasth Seva: an advanced telemedicine and diagnostics kiosk setup for hospitals, multi-specialty clinics, CSR health programs, and institutional screening deployments in Jharkhand.',
    canonical: 'https://srh.ambeysales.com/linear-actuator-model',
    image: linearActuatorImg,
    imageAlt: 'Linear Actuator Model telemedicine kiosk for institutional health screening support',
    badges: ['12+ Diagnostics', 'Multi-Location Ready', 'EMR Workflow Ready', 'Hospital & CSR Fit'],
    suitableFor: ['Hospitals', 'Multi-specialty clinics', 'Diagnostic networks', 'CSR health programs', 'Industrial health teams', 'Institutional healthcare providers', 'Multi-location healthcare operators'],
    contextHeading: 'Built for larger healthcare and industrial catchments',
    context: [
      'East Singhbhum and the wider Jamshedpur region combine hospital access, industrial activity, surrounding villages, and workforce health needs. This makes structured screening, teleconsultation support, and referral workflows important for both community and institutional healthcare programs.',
      'The Linear Actuator Model is suitable where SRH SWASTH SEVA needs a stronger setup for larger screening volume, multi-location management, specialist referral coordination, and institutional healthcare partnerships.',
    ],
    contextCards: [
      ['Hospitals & Clinics', 'For structured screening and consultation coordination.'],
      ['Industrial Wellness', 'For employee and workforce health programs.'],
      ['CSR Health Programs', 'For larger community screening initiatives.'],
      ['Multi-Site Operations', 'For networks that need reporting and centralized visibility.'],
    ],
    overviewHeading: 'Built for growing healthcare organizations',
    overview: 'The Linear Actuator Model is a pro-grade telemedicine and diagnostics setup intended for healthcare organizations that require more advanced diagnostic coverage, stronger operational control, and scalable service delivery. It is a better fit when screening volumes are higher, reporting requirements are stronger, or multiple sites need to be coordinated.',
    capabilities: ['ECG screening support', 'Blood glucose monitoring', 'AI-powered digital stethoscope workflow', 'Spirometry / PFT screening support', 'Electronic medical record workflow', 'Telemedicine and specialist consultation support', 'E-prescription workflow support', 'Analytics and reporting dashboard', 'Multi-location management', 'Specialist referral support', 'Role-based access control', 'Institutional workflow support'],
    specs: [
      ['Display', '32" touchscreen'],
      ['Diagnostics', '12+ vital devices'],
      ['Connectivity', 'WiFi / 4G / Ethernet'],
      ['Storage', 'Hybrid: local + cloud'],
      ['Deployment timeline', '3-4 weeks'],
      ['Training', 'Comprehensive on-site training'],
      ['Best fit', 'Hospitals, clinics, CSR programs, institutional deployments'],
    ],
    why: [
      ['Broader diagnostic capability', 'Better suited for centers that need more than basic vitals capture.'],
      ['Designed for higher-volume use', 'Useful for hospitals, organized clinics, CSR health drives, and industrial wellness programs.'],
      ['Multi-location readiness', 'Supports coordinated deployment across multiple service points or partner locations.'],
      ['Stronger reporting and visibility', 'Useful for service monitoring, program reporting, and operational review.'],
      ['Better institutional fit', 'Works well where healthcare delivery requires more structured workflow, training, and integration readiness.'],
      ['Scalable service pathway', 'Can support SRH SWASTH SEVA as it grows from local screening to broader network-driven healthcare services.'],
    ],
    faqs: [
      ['Who should choose the Linear Actuator Model?', 'Hospitals, multi-specialty clinics, CSR programs, industrial wellness initiatives, and healthcare networks that need a more advanced screening setup.'],
      ['Is this suitable for Jamshedpur and East Singhbhum?', 'Yes. It is suitable for organized healthcare and workforce screening contexts in industrial, hospital, and semi-urban catchments.'],
      ['Does SRH provide technical platform support?', 'No. Technical platform and product technology support is provided by ReachAIMedTech. SRH SWASTH SEVA / M/S AMBEY SALES handles healthcare service coordination.'],
      ['Can it support multi-location programs?', 'Yes. It is better suited for deployments where multiple sites, reporting, and centralized coordination are required.'],
      ['Are commercial terms confirmed upfront?', 'No. Commercial terms are confirmed only after scope, location, service model, and deployment requirements are discussed.'],
    ],
    primaryCta: 'Enquire for Linear Actuator Model',
    secondaryCta: 'Discuss Institutional Deployment',
  },
} as const;

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(property ? 'property' : 'name', name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function contactHref(model: string) {
  return `/?model=${encodeURIComponent(model)}#contact-panel`;
}

export function getProductPageSlug(): ProductSlug | null {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return path === 'vanity-model' || path === 'linear-actuator-model' ? path : null;
}

export function ProductDetailPage({ slug }: { slug: ProductSlug }) {
  const page = productPages[slug];

  useEffect(() => {
    document.title = page.metaTitle;
    setMeta('description', page.metaDescription);
    setMeta('og:title', page.metaTitle, true);
    setMeta('og:description', page.metaDescription, true);
    setMeta('og:url', page.canonical, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', 'https://srh.ambeysales.com/og/srh-og-cover.jpg', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', page.metaTitle);
    setMeta('twitter:description', page.metaDescription);
    setMeta('twitter:image', 'https://srh.ambeysales.com/og/srh-og-cover.jpg');
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = page.canonical;
  }, [page]);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://srh.ambeysales.com/' },
        { '@type': 'ListItem', position: 2, name: 'Technology', item: 'https://srh.ambeysales.com/#digital-kiosk' },
        { '@type': 'ListItem', position: 3, name: page.title, item: page.canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${page.title} service enquiry`,
      provider: { '@type': 'Organization', name: 'M/S AMBEY SALES' },
      areaServed: 'Jharkhand, India',
      serviceType: 'Preventive health screening and consultation coordination',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'M/S AMBEY SALES',
      url: 'https://srh.ambeysales.com/',
      brand: 'SRH SWASTH SEVA',
      telephone: '+91 92344 65621',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: page.title,
      brand: { '@type': 'Brand', name: 'SRH SWASTH SEVA' },
      description: page.metaDescription,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-light text-text-navy selection:bg-primary-teal selection:text-white">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#D7E7EA] min-h-[68px] z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[68px] flex items-center justify-between gap-4">
          <a href="/" aria-label="SRH Swasth Seva home"><Logo variant="compact" size={52} /></a>
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-text-muted">
            <a href="/#clinical-plans" className="hover:text-primary-teal">Services</a>
            <a href="/#digital-kiosk" className="hover:text-primary-teal">Technology</a>
            <a href="/#faq-block" className="hover:text-primary-teal">FAQs</a>
            <a href="/#contact-panel" className="hover:text-primary-teal">Contact</a>
          </nav>
          <a href={contactHref(page.title)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-teal text-white text-[11px] font-extrabold uppercase tracking-widest rounded-full shadow-md">
            <Stethoscope className="w-3.5 h-3.5" /> Contact for Details
          </a>
        </div>
      </header>

      <main>
        <section className="bg-white border-b border-[#D7E7EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-text-muted">
              <a href="/" className="inline-flex items-center gap-1 hover:text-primary-teal"><Home className="w-3.5 h-3.5" /> Home</a>
              <span>/</span>
              <a href="/#digital-kiosk" className="hover:text-primary-teal">Technology</a>
              <span>/</span>
              <span className="text-text-navy">{page.title}</span>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-bg-light py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex px-3 py-1 bg-[#EEF8FA] border border-[#D7E7EA] rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#0E7490] font-mono">{page.eyebrow}</span>
              <div className="space-y-3">
                <h1 className="font-heading font-black text-4xl sm:text-5xl text-text-navy tracking-tight leading-tight">{page.h1}</h1>
                <p className="text-lg text-[#0E7490] font-bold leading-relaxed">{page.subtitle}</p>
              </div>
              <p className="text-sm text-text-muted leading-relaxed font-medium">{page.body}</p>
              <div className="flex flex-wrap gap-2">
                {page.badges.map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-white border border-[#D7E7EA] text-[10px] font-extrabold text-text-navy uppercase tracking-wide">{badge}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={contactHref(page.title)} className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-primary-teal hover:bg-[#072033] text-white rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md">
                  {page.primaryCta} <ArrowRight className="w-4 h-4" />
                </a>
                <a href={contactHref(page.title)} className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-white border border-[#D7E7EA] hover:border-primary-teal text-text-navy rounded-full text-xs font-extrabold uppercase tracking-widest">
                  {page.secondaryCta}
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-[#D7E7EA] bg-white p-3 shadow-md">
                <img src={page.image} alt={page.imageAlt} className="w-full aspect-[4/3] object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white border-y border-[#D7E7EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">Local Context</span>
              <h2 className="font-heading font-black text-3xl text-text-navy tracking-tight">{page.contextHeading}</h2>
              {page.context.map((text) => <p key={text} className="text-sm text-text-muted leading-relaxed font-medium">{text}</p>)}
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.contextCards.map(([title, text]) => (
                <div key={title} className="p-5 rounded-2xl border border-[#D7E7EA] bg-[#F7FBFC]">
                  <h3 className="font-heading font-black text-text-navy text-base">{title}</h3>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-heading font-black text-3xl text-text-navy tracking-tight">{page.overviewHeading}</h2>
              <p className="text-sm text-text-muted leading-relaxed font-medium">{page.overview}</p>
              <div className="p-5 bg-white border border-[#D7E7EA] rounded-2xl space-y-2">
                <h3 className="font-heading font-black text-base text-text-navy">Technical specifications</h3>
                {page.specs.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-t border-[#D7E7EA]/60 pt-2 text-xs">
                    <span className="font-bold text-text-muted">{label}</span>
                    <span className="font-extrabold text-text-navy text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 bg-white border border-[#D7E7EA] rounded-2xl">
                <h2 className="font-heading font-black text-xl text-text-navy mb-4">Key capabilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {page.capabilities.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-text-muted font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-primary-teal shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {page.why.map(([title, text], index) => (
                  <div key={title} className="p-5 bg-white border border-[#D7E7EA] rounded-2xl">
                    <span className="text-[10px] font-black text-primary-teal font-mono">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="font-heading font-black text-text-navy text-sm mt-1">{title}</h3>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white border-y border-[#D7E7EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">B2B Enquiry Fit</span>
              <h2 className="font-heading font-black text-3xl text-text-navy tracking-tight">Who should enquire for this model?</h2>
              <p className="text-sm text-text-muted leading-relaxed font-medium">
                This model is suitable for organizations and local healthcare operators evaluating service workflows, screening access, and telemedicine supported kiosk deployment needs.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {page.suitableFor.map((item) => (
                <div key={item} className="flex items-center gap-2 p-4 bg-[#F7FBFC] border border-[#D7E7EA] rounded-2xl text-xs font-bold text-text-navy">
                  <CheckCircle2 className="w-4 h-4 text-primary-teal shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D7E7EA] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <span className="text-xs text-[#0E7490] font-bold uppercase tracking-widest font-mono">Deployment Support</span>
                <h2 className="font-heading font-black text-3xl text-text-navy tracking-tight mt-2">How SRH supports deployment</h2>
              </div>
              <p className="lg:col-span-8 text-sm text-text-muted leading-relaxed font-medium">
                {deploymentSupportCopy}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white border-y border-[#D7E7EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#072033] text-white space-y-4">
              <ShieldCheck className="w-8 h-8 text-[#FABC09]" />
              <h2 className="font-heading font-black text-2xl">Service, Distribution & Technical Support Clarity</h2>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">{ownershipCopy}</p>
              <div className="space-y-2 text-xs text-slate-300 font-semibold">
                <p><strong className="text-white">Legal Business Name:</strong> M/S AMBEY SALES</p>
                <p><strong className="text-white">Brand / Healthcare Segment:</strong> SRH SWASTH SEVA</p>
                <p><strong className="text-white">Website:</strong> https://srh.ambeysales.com/</p>
                <p><strong className="text-white">Contact:</strong> +91 92344 65621</p>
                <p><strong className="text-white">Technical Platform Support:</strong> ReachAIMedTech</p>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-3">
              <h2 className="font-heading font-black text-2xl text-text-navy">Frequently asked questions</h2>
              {page.faqs.map(([q, a]) => (
                <div key={q} className="p-5 rounded-2xl bg-[#F7FBFC] border border-[#D7E7EA]">
                  <h3 className="font-heading font-black text-sm text-text-navy">{q}</h3>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed font-medium">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-bg-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <ClipboardList className="w-10 h-10 text-primary-teal mx-auto" />
            <h2 className="font-heading font-black text-3xl text-text-navy">Contact for more details</h2>
            <p className="text-sm text-text-muted leading-relaxed font-medium">
              Share your location, service scope, and deployment requirement. The SRH SWASTH SEVA support team will confirm model fit, availability, operational details, and next steps.
            </p>
            <a href={contactHref(page.title)} className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary-teal text-white rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md">
              Go to Contact Form and Address <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#072033] text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Logo variant="light-text" size={68} />
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{ownershipCopy}</p>
            </div>
            <div className="space-y-3 text-xs text-slate-300 font-medium">
              <h3 className="font-heading font-black text-white text-sm">Contact</h3>
              <p className="flex gap-2"><Phone className="w-4 h-4 text-[#FABC09] shrink-0" /> +91 92344 65621</p>
              <p className="flex gap-2"><Mail className="w-4 h-4 text-[#FABC09] shrink-0" /> contactmanishm@gmail.com</p>
              <p className="flex gap-2"><MapPin className="w-4 h-4 text-[#FABC09] shrink-0" /> Ground Floor, P.O. Sarjamda, Parsudih, Jamshedpur, Jharkhand - 831002</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-heading font-black text-white text-sm">Follow</h3>
              <div className="flex items-center gap-3">
                <a href="#facebook" className="p-2 bg-white/5 rounded-xl border border-white/10" aria-label="Facebook"><SocialIcon name="facebook" className="w-4 h-4" /></a>
                <a href="#instagram" className="p-2 bg-white/5 rounded-xl border border-white/10" aria-label="Instagram"><SocialIcon name="instagram" className="w-4 h-4" /></a>
                <a href="#linkedin" className="p-2 bg-white/5 rounded-xl border border-white/10" aria-label="LinkedIn"><SocialIcon name="linkedin" className="w-4 h-4" /></a>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">Not an emergency medical service. For emergencies, contact emergency services or visit the nearest hospital.</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-[10px] text-slate-500 font-mono text-center">
            Copyright 2026 SRH SWASTH SEVA. All Rights Reserved. Operated by M/S AMBEY SALES.
          </div>
        </div>
      </footer>
    </div>
  );
}
