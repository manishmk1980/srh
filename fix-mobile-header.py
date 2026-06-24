from pathlib import Path
from datetime import datetime

p = Path("src/App.tsx")
txt = p.read_text(encoding="utf-8")

backup = Path(f"_backup_before_mobile_header_fix_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
backup.mkdir(exist_ok=True)
(backup / "App.tsx").write_text(txt, encoding="utf-8")

# 1) Fix topbar: no wrap on mobile, hide extra text on small screens.
txt = txt.replace(
'''      <div id="srh-topbar" className="bg-[#072033] text-white py-2 px-6 border-b border-white/5 text-center text-[11px] font-mono tracking-wide font-semibold select-none z-50 relative flex flex-wrap justify-center items-center gap-3">''',
'''      <div id="srh-topbar" className="bg-[#072033] text-white py-2 px-3 sm:px-6 border-b border-white/5 text-center text-[10px] sm:text-[11px] font-mono tracking-wide font-semibold select-none z-50 relative flex flex-nowrap justify-center items-center gap-2 sm:gap-3 overflow-hidden whitespace-nowrap">'''
)

txt = txt.replace(
'''        <span>Secure Service Enquiry Support Available</span>''',
'''        <span className="hidden sm:inline">Secure Service Enquiry Support Available</span>'''
)

txt = txt.replace(
'''        <span className="text-cyan-400 font-bold">M/S AMBEY SALES Healthcare Services</span>''',
'''        <span className="hidden md:inline text-cyan-400 font-bold">M/S AMBEY SALES Healthcare Services</span>'''
)

# 2) Fix main header height/padding for mobile.
txt = txt.replace(
'''      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#D7E7EA] min-h-[84px] z-50 transition-all shadow-xs" id="srh-main-nav">''',
'''      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#D7E7EA] min-h-[68px] sm:min-h-[84px] z-50 transition-all shadow-xs" id="srh-main-nav">'''
)

txt = txt.replace(
'''        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">''',
'''        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-3">'''
)

# 3) Make logo/brand smaller and stable on mobile.
txt = txt.replace(
'''            <div className="relative shrink-0 rounded-full overflow-hidden bg-[#071201] border-2 border-[#FABC09]/70 shadow-lg ring-2 ring-[#071201]/10" style={{ width: '52px', height: '52px' }}>''',
'''            <div className="relative shrink-0 rounded-full overflow-hidden bg-[#071201] border-2 border-[#FABC09]/70 shadow-lg ring-2 ring-[#071201]/10" style={{ width: '44px', height: '44px' }}>'''
)

txt = txt.replace(
'''            <span className="font-heading font-extrabold text-base sm:text-lg leading-tight tracking-tight uppercase text-[#0B1633]">SRH SWASTH SEVA</span>''',
'''            <span className="font-heading font-extrabold text-[13px] sm:text-lg leading-tight tracking-tight uppercase text-[#0B1633]">SRH SWASTH SEVA</span>'''
)

txt = txt.replace(
'''            <span className="font-sans font-semibold text-[10px] sm:text-xs tracking-wider uppercase text-[#4A6650]">HAR DIN SWASTH</span>''',
'''            <span className="font-sans font-semibold text-[9px] sm:text-xs tracking-wider uppercase text-[#4A6650]">HAR DIN SWASTH</span>'''
)

# 4) Hide desktop CTA on very small screens so hamburger has breathing space.
txt = txt.replace(
'''          <button onClick={() => scrollToSection('contact-panel')} className="hidden md:inline-flex''',
'''          <button onClick={() => scrollToSection('contact-panel')} className="hidden lg:inline-flex'''
)

p.write_text(txt, encoding="utf-8")
print("Mobile header fix applied.")
print("Backup:", backup)
