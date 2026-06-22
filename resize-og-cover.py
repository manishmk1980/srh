from PIL import Image
from pathlib import Path

src = Path("public/og/srh-og-cover.jpg")
out = Path("public/og/srh-og-cover.jpg")

target_w, target_h = 1200, 630

img = Image.open(src).convert("RGB")
src_w, src_h = img.size

target_ratio = target_w / target_h
src_ratio = src_w / src_h

if src_ratio > target_ratio:
    # image too wide, crop sides
    new_w = int(src_h * target_ratio)
    left = (src_w - new_w) // 2
    img = img.crop((left, 0, left + new_w, src_h))
else:
    # image too tall, crop top/bottom
    new_h = int(src_w / target_ratio)
    top = (src_h - new_h) // 2
    img = img.crop((0, top, src_w, top + new_h))

img = img.resize((target_w, target_h), Image.LANCZOS)
img.save(out, "JPEG", quality=88, optimize=True, progressive=True)

print("Saved:", out)
print("Final size:", Image.open(out).size)
