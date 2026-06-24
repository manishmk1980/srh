from pathlib import Path
from datetime import datetime
import re

p = Path("src/App.tsx")
txt = p.read_text(encoding="utf-8")

backup = Path(f"_backup_before_add_contact_nav_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
backup.mkdir(exist_ok=True)
(backup / "App.tsx").write_text(txt, encoding="utf-8")

if re.search(r">\s*Contact\s*</button>", txt):
    print("Contact nav button already exists. No change needed.")
else:
    # Copy the existing FAQ button and convert it into Contact button.
    faq_button_match = re.search(
        r"(<button[^>]*(?:\n[^<]*)*?>\s*FAQs\s*</button>)",
        txt,
        flags=re.IGNORECASE
    )

    if not faq_button_match:
        raise SystemExit("Could not find FAQs button. Please paste the navigation block.")

    faq_button = faq_button_match.group(1)

    contact_button = faq_button
    contact_button = re.sub(r">\s*FAQs\s*</button>", ">Contact</button>", contact_button, flags=re.IGNORECASE)
    contact_button = re.sub(r"faqs", "contact", contact_button, flags=re.IGNORECASE)
    contact_button = re.sub(r"faq", "contact", contact_button, flags=re.IGNORECASE)

    txt = txt[:faq_button_match.end()] + "\n              " + contact_button + txt[faq_button_match.end():]

    p.write_text(txt, encoding="utf-8")
    print("Contact nav button added after FAQs.")
    print("Backup:", backup)
