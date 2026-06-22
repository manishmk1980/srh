from PIL import Image
from pathlib import Path

for p in Path("public/og").glob("*"):
    if p.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]:
        img = Image.open(p)
        print(f"{p.name}: {img.size[0]} x {img.size[1]}")
