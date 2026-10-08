"""
Gera o favicon provisório (assinatura tipográfica) enquanto não há logo oficial.

    python scripts/make-icons.py

Saída em src/static/: favicon.svg e apple-touch-icon.png (180x180).
Quando o logo oficial chegar, substitua esses arquivos e preencha brand.logo em src/site.config.mjs.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

CARBON = (23, 25, 28)
GOLD = (195, 161, 106)
OUT = Path("src/static")

FAVICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="JG">
  <rect width="64" height="64" rx="14" fill="#17191C"/>
  <text x="32" y="43" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#C3A16A" letter-spacing="-1">JG</text>
</svg>
"""


def find_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/georgia.ttf",
        "C:/Windows/Fonts/times.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "favicon.svg").write_text(FAVICON_SVG, encoding="utf-8")

    size = 180
    image = Image.new("RGB", (size, size), CARBON)
    draw = ImageDraw.Draw(image)
    font = find_font(86)
    text = "JG"
    box = draw.textbbox((0, 0), text, font=font)
    width, height = box[2] - box[0], box[3] - box[1]
    draw.text(((size - width) / 2 - box[0], (size - height) / 2 - box[1]), text, font=font, fill=GOLD)
    image.save(OUT / "apple-touch-icon.png", "PNG", optimize=True)
    print(f"Ícones gerados em {OUT}/ (favicon.svg, apple-touch-icon.png)")


if __name__ == "__main__":
    main()
