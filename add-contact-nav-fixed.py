from pathlib import Path
from datetime import datetime

p = Path("src/App.tsx")
txt = p.read_text(encoding="utf-8")

backup = Path(f"_backup_before_add_contact_nav_fixed_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
backup.mkdir(exist_ok=True)
(backup / "App.tsx").write_text(txt, encoding="utf-8")

desktop_faq = """            <button onClick={() => scrollToSection('faq-block')} className="hover:text-primary-teal focus:text-primary-teal outline-none transition-colors">FAQs</button>"""

desktop_contact = """            <button onClick={() => scrollToSection('contact-panel')} className="hover:text-primary-teal focus:text-primary-teal outline-none transition-colors">Contact</button>"""

if desktop_contact not in txt:
    if desktop_faq not in txt:
        raise SystemExit("Desktop FAQ nav line not found. App.tsx may have changed.")
    txt = txt.replace(desktop_faq, desktop_faq + "\n" + desktop_contact)
    print("Desktop Contact nav added after FAQs.")
else:
    print("Desktop Contact nav already exists.")

# Keep mobile label consistent: Contact instead of Contact Support
txt = txt.replace(">Contact Support</button>", ">Contact</button>")

p.write_text(txt, encoding="utf-8")
print("Backup:", backup)
