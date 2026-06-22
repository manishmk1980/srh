import React from 'react';

export default function LegalSupportNotice() {
  return (
    <section
      id="legal-support-notice"
      className="bg-[#061826] text-white border-t border-white/10"
      aria-label="Legal and technical support information"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-black tracking-[0.2em] uppercase text-[#FABC09] mb-3">
              Legal Entity & Healthcare Segment
            </p>
            <p className="text-sm sm:text-base leading-7 text-white/85">
              SRH SWASTH SEVA is a healthcare service segment operated by
              <strong className="text-white"> M/S AMBEY SALES</strong>. M/S AMBEY SALES handles
              healthcare service enquiries, booking/payment coordination, and healthcare service operations.
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
              <p className="font-bold mt-1">https://srh.ambeysales.com/</p>
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
    </section>
  );
}
