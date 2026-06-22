from pathlib import Path
from datetime import datetime

root = Path.cwd()
stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup = root / f"_backup_before_force_reachaimedtech_notice_{stamp}"
backup.mkdir(exist_ok=True)

files = []
for pattern in ["src/**/*.tsx", "src/**/*.ts", "index.html"]:
    files.extend(root.glob(pattern))

for p in files:
    rel = p.relative_to(root)
    bp = backup / rel
    bp.parent.mkdir(parents=True, exist_ok=True)
    bp.write_text(p.read_text(encoding="utf-8"), encoding="utf-8")

legal_line = "SRH SWASTH SEVA is a healthcare service segment operated by M/S AMBEY SALES."
tech_line = "Technical platform and product technology support is provided by ReachAIMedTech."
operations_line = "M/S AMBEY SALES handles healthcare service enquiries, booking/payment coordination, and healthcare service operations. SRH SWASTH SEVA does not provide technical platform support."

combined = legal_line + " " + tech_line + " " + operations_line

contact_line = "Technical Platform Support: ReachAIMedTech"

changed = []

for p in files:
    txt = p.read_text(encoding="utf-8")
    old = txt

    # Add support clarification wherever the legal line exists.
    if legal_line in txt and "ReachAIMedTech" not in txt:
        txt = txt.replace(legal_line, combined)

    # Add support clarification near contact number if present.
    if "+91 92344 65621" in txt and contact_line not in txt:
        txt = txt.replace(
            "+91 92344 65621",
            "+91 92344 65621 | " + contact_line
        )

    # Clean incorrect ownership wording.
    wrong_map = {
        "M/S AMBEY SALES provides technical support": "ReachAIMedTech provides technical platform support",
        "SRH SWASTH SEVA provides technical support": "ReachAIMedTech provides technical platform support",
        "technical support by M/S AMBEY SALES": "technical platform support by ReachAIMedTech",
        "technical support by SRH SWASTH SEVA": "technical platform support by ReachAIMedTech",
        "technology support by M/S AMBEY SALES": "technology support by ReachAIMedTech",
        "technology support by SRH SWASTH SEVA": "technology support by ReachAIMedTech",
        "platform support by M/S AMBEY SALES": "platform support by ReachAIMedTech",
        "platform support by SRH SWASTH SEVA": "platform support by ReachAIMedTech",
    }

    for wrong, right in wrong_map.items():
        txt = txt.replace(wrong, right)

    if txt != old:
        p.write_text(txt, encoding="utf-8")
        changed.append(str(p.relative_to(root)))

print("Changed files:")
for c in changed:
    print(" -", c)

print("Backup:", backup)
