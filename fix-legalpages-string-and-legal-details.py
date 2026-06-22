from pathlib import Path
from datetime import datetime
import re
import json

root = Path.cwd()
stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup = root / f"_backup_before_fix_legalpages_string_{stamp}"
backup.mkdir(exist_ok=True)

legal_line = "SRH SWASTH SEVA is a healthcare service segment operated by M/S AMBEY SALES."
legal_details = (
    "Legal Business Name: M/S AMBEY SALES\n"
    "Legal Owner Name: SANJAY KUMAR SINGH\n"
    "Brand / Healthcare Segment: SRH SWASTH SEVA\n"
    "GSTIN: 20BARPS8776D1Z8\n"
    "Website: https://srh.ambeysales.com/\n"
    "Contact Number: +91 92344 65621"
)
address = (
    "Ground Floor, Building No./Flat No. 0, P.O. - Sarjamda, P.S. - Parsudih, "
    "Village - Bamangora, Near Salgajhuri Cabin, Parsudih, Jamshedpur, "
    "East Singhbhum, Jharkhand - 831002, India"
)

targets = [
    root / "src" / "pages" / "LegalPages.tsx",
    root / "src" / "App.tsx",
    root / "src" / "components" / "ServiceInquiryForm.tsx",
    root / "index.html",
    root / "public" / "favicon" / "site.webmanifest",
]

for p in targets:
    if p.exists():
        rel = p.relative_to(root)
        bp = backup / rel
        bp.parent.mkdir(parents=True, exist_ok=True)
        bp.write_text(p.read_text(encoding="utf-8"), encoding="utf-8")

legal_path = root / "src" / "pages" / "LegalPages.tsx"
txt = legal_path.read_text(encoding="utf-8")

# Fix accidental broken heading injection:
# heading: '9. Contact\nLegal Business Name: ...
txt = re.sub(
    r"(heading\s*:\s*)'([^']*Contact)\\nLegal Business Name: M/S AMBEY SALES[\s\S]*?(?=\n\s*(?:content|body|text|paragraphs|items|points)\s*:)",
    r"\1'\2',",
    txt,
)

# Also fix if raw newline got inserted after Contact without escaped \n
txt = re.sub(
    r"(heading\s*:\s*)'([^']*Contact)\nLegal Business Name: M/S AMBEY SALES[\s\S]*?(?=\n\s*(?:content|body|text|paragraphs|items|points)\s*:)",
    r"\1'\2',",
    txt,
)

# Insert legal details into the Contact policy section content array, safely as escaped strings.
if legal_line not in txt:
    insert_items = [
        legal_line,
        legal_details,
        "Address: " + address,
    ]
    insertion = "\n            " + ",\n            ".join(json.dumps(x) for x in insert_items) + ","

    pattern = r"(heading\s*:\s*['\"](?:\d+\.\s*)?Contact['\"]\s*,\s*\n\s*content\s*:\s*\[)"
    txt, count = re.subn(pattern, lambda m: m.group(1) + insertion, txt, count=1)

    if count == 0:
        print("WARNING: Could not find Contact content array in LegalPages.tsx. Build fix still applied.")

# Safe replacements inside LegalPages.
replacements = {
    "Ambey Sales Office, 123, Health Avenue, Sector 12, Noida, Uttar Pradesh - 201301 India": address,
    "Ambey Sales Office, 123, Health Avenue, Sector 12, Noida, Uttar Pradesh - 201301": address,
    "123, Health Avenue, Sector 12, Noida, Uttar Pradesh - 201301 India": address,
    "+91 98765 43210": "+91 92344 65621",
    "+91 9876543210": "+91 92344 65621",
    "98765 43210": "92344 65621",
    "+91 120 456 7890": "+91 92344 65621",
    "120 456 7890": "92344 65621",
    "https://mydojo.co.in/srh/": "https://srh.ambeysales.com/",
    "https://mydojo.co.in/srh": "https://srh.ambeysales.com",
}
for old, new in replacements.items():
    txt = txt.replace(old, new)

legal_path.write_text(txt, encoding="utf-8")

# Clean the same old address/contact/domain text in other files without adding multiline JSX.
for p in targets:
    if not p.exists() or p == legal_path:
        continue

    content = p.read_text(encoding="utf-8")
    for old, new in replacements.items():
        content = content.replace(old, new)

    content = content.replace("Operated by Ambey Sales", "Operated by M/S AMBEY SALES")
    content = content.replace("operated by Ambey Sales", "operated by M/S AMBEY SALES")
    content = content.replace("by Ambey Sales", "by M/S AMBEY SALES")
    content = content.replace("Ambey Sales Healthcare Services", "M/S AMBEY SALES Healthcare Services")

    p.write_text(content, encoding="utf-8")

print("LegalPages string error fixed and Ambey Sales legal details applied safely.")
print("Backup created at:", backup)
