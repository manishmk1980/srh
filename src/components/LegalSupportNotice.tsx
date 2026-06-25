import React from 'react';

const MAP_URL = 'https://www.google.com/maps?q=22.758472,86.226361';
const MAP_EMBED_URL = 'https://maps.google.com/maps?q=22.758472,86.226361&z=16&output=embed';

const LOCATION_TEXT =
  'M/S AMBEY SALES / SRH SWASTH SEVA location: Ground Floor, Building No./Flat No. 0, P.O. - Sarjamda, P.S. - Parsudih, Village - Bamangora, Near Salgajhuri Cabin, Parsudih, Jamshedpur, East Singhbhum, Jharkhand - 831002, India';

function MapIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4" />
      <path d="m15.4 6.5-6.8 4" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.48 15.03L2.3 21.7l4.79-1.25A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-2.84.74.76-2.75-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.1 4.05c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.98 2.62 1.12 2.8c.14.18 1.9 3.05 4.72 4.15 2.34.92 2.82.74 3.33.7.51-.04 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.33-.07-.12-.25-.19-.53-.33-.28-.14-1.65-.81-1.9-.9-.25-.09-.44-.14-.62.14-.18.28-.72.9-.88 1.08-.16.18-.32.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53Z" />
    </svg>
  );
}

export default function LegalSupportNotice() {
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${LOCATION_TEXT}\n${MAP_URL}`)}`;

  const shareLocation = async () => {
    const shareData = {
      title: 'M/S AMBEY SALES / SRH SWASTH SEVA Location',
      text: LOCATION_TEXT,
      url: MAP_URL,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${LOCATION_TEXT}\n${MAP_URL}`);
        alert('Location link copied. You can now share it.');
        return;
      }

      window.open(MAP_URL, '_blank', 'noopener,noreferrer');
    } catch {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${LOCATION_TEXT}\n${MAP_URL}`);
        alert('Location link copied. You can now share it.');
      }
    }
  };

  return (
    <section
      id="legal-support-notice"
      className="bg-[#061826] text-white border-t border-white/10"
      aria-label="Legal, address, map, and technical support information"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 sm:p-5 shadow-2xl shadow-black/20">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.2em] uppercase text-[#FABC09]">
                Visit Location
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                M/S AMBEY SALES / SRH SWASTH SEVA Location
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
                Open the map for directions, share the location link, or send it directly on WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#FABC09] px-4 text-xs font-black uppercase tracking-wide text-[#061826] shadow-lg shadow-black/20"
              >
                <MapIcon />
                Open Maps
              </a>

              <button
                type="button"
                onClick={shareLocation}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-xs font-black uppercase tracking-wide text-[#061826] shadow-lg shadow-black/20"
              >
                <ShareIcon />
                Share
              </button>

              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-emerald-500 px-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-black/20"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10">
            <iframe
              title="M/S AMBEY SALES location on Google Maps"
              src={MAP_EMBED_URL}
              className="h-[300px] w-full sm:h-[360px] lg:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-black tracking-[0.2em] uppercase text-[#FABC09] mb-3">
              Legal Entity & Healthcare Segment
            </p>

            <p className="text-sm sm:text-base leading-7 text-white/85">
              SRH SWASTH SEVA is a healthcare service and kiosk deployment segment operated by
              <strong className="text-white"> M/S AMBEY SALES</strong>. M/S AMBEY SALES handles
              healthcare service enquiries, B2B kiosk deployment enquiries, booking/payment coordination,
              local operations, and distribution-related coordination.
            </p>

            <p className="text-sm sm:text-base leading-7 text-white/85 mt-3">
              Technical platform and product technology support is provided by
              <strong className="text-white"> ReachAIMedTech</strong>.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-white/6 border border-white/10 p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider font-bold">Legal Business Name</p>
              <p className="font-bold mt-1">M/S AMBEY SALES</p>
            </div>

            <div className="rounded-2xl bg-white/6 border border-white/10 p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider font-bold">Brand / Healthcare Segment</p>
              <p className="font-bold mt-1">SRH SWASTH SEVA</p>
            </div>

            <div className="rounded-2xl bg-white/6 border border-white/10 p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider font-bold">GSTIN</p>
              <p className="font-bold mt-1">20BARPS8776D1Z8</p>
            </div>

            <div className="rounded-2xl bg-white/6 border border-white/10 p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider font-bold">Contact Number</p>
              <p className="font-bold mt-1">+91 92344 65621</p>
            </div>

            <div className="rounded-2xl bg-white/6 border border-white/10 p-4 sm:col-span-2">
              <p className="text-white/50 text-xs uppercase tracking-wider font-bold">Website</p>
              <p className="font-bold mt-1">
                <a className="underline underline-offset-4" href="https://srh.ambeysales.com/">
                  https://srh.ambeysales.com/
                </a>
              </p>
            </div>

            <div className="rounded-2xl bg-white/6 border border-white/10 p-4 sm:col-span-2">
              <p className="text-white/50 text-xs uppercase tracking-wider font-bold">Registered Address</p>
              <p className="font-medium mt-1 leading-6 text-white/85">
                Ground Floor, Building No./Flat No. 0, P.O. - Sarjamda, P.S. - Parsudih,
                Village - Bamangora, Near Salgajhuri Cabin, Parsudih, Jamshedpur,
                East Singhbhum, Jharkhand - 831002, India
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center">
        <p className="text-xs leading-6 text-white/45">
          © 2026 SRH SWASTH SEVA. All Rights Reserved. Operated by M/S AMBEY SALES.
          <span className="hidden sm:inline"> Made with care for preventive community health and accessible digital care.</span>
        </p>
      </div>
    </section>
  );
}
