"""
Gera versões otimizadas das fotografias fornecidas pelo cliente.

Uso:
    python scripts/optimize-images.py --src originais --out src/img

Regras seguidas:
- Os originais nunca são alterados; apenas lidos.
- Nenhum espelhamento, retoque ou alteração de rosto/dentes/corpo.
- Recortes preservam o rosto inteiro, espaço acima da cabeça e o letreiro da fachada.
- Saída em WebP (principal) e JPEG (fallback), com nomes simples e um manifesto JSON
  consumido pelo build (src/img/manifest.json).
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image

WEBP_QUALITY = 80
JPEG_QUALITY = 82

# Mapa: nome simples -> arquivo original (nome exato fornecido pelo cliente)
SOURCES = {
    "retrato-principal": "WhatsApp Image 2026-09-15 at 20.58.16 (1).jpeg",   # braços cruzados, sem touca
    "retrato-sobre": "WhatsApp Image 2026-09-15 at 20.58.15 (1).jpeg",       # touca, olhar lateral
    "retrato-alternativo": "WhatsApp Image 2026-09-15 at 20.58.16.jpeg",     # touca, luz mais escura
    "fachada": "WhatsApp Image 2026-09-15 at 20.58.15.jpeg",                 # fachada Conceito
}

# Cada variante: (nome de saída, origem, caixa de recorte (l, t, r, b) ou None, larguras)
# As caixas foram escolhidas olhando as fotos: sem cortar cabeça, braços ou letreiro.
VARIANTS = [
    # Hero desktop: foto inteira (2:3), espaço acima da cabeça preservado.
    ("retrato-principal", "retrato-principal", None, [560, 840, 1066]),
    # Hero mobile: 4:5, começa 100px abaixo do topo (cabeça inicia ~180px) e termina abaixo dos braços.
    ("retrato-principal-m", "retrato-principal", (0, 100, 1066, 1432), [480, 720, 960]),
    # Sobre: 4:5 com folga acima da touca.
    ("retrato-sobre", "retrato-sobre", (0, 40, 1066, 1372), [480, 720, 1066]),
    # Alternativo (chamada final, desktop): 4:5 com folga acima da touca.
    ("retrato-alternativo", "retrato-alternativo", (0, 30, 1066, 1362), [480, 720]),
    # Fachada: 3:4 a partir do topo, mantendo letreiro, porta e plantas.
    ("fachada", "fachada", (0, 0, 900, 1200), [480, 720, 900]),
]

# Imagem para Open Graph (preview em redes/WhatsApp): recorte 4:5 do retrato principal.
OG_IMAGE = ("og-retrato", "retrato-principal", (0, 100, 1066, 1432), 1080)


def load(src_dir: Path, name: str) -> Image.Image:
    path = src_dir / SOURCES[name]
    if not path.exists():
        raise SystemExit(f"Arquivo original ausente: {path}")
    image = Image.open(path)
    return image.convert("RGB")


def resize(image: Image.Image, width: int) -> Image.Image:
    if width >= image.width:
        return image.copy()
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


def save_pair(image: Image.Image, out_dir: Path, stem: str) -> dict:
    webp_path = out_dir / f"{stem}.webp"
    jpg_path = out_dir / f"{stem}.jpg"
    image.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
    image.save(jpg_path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    return {
        "width": image.width,
        "height": image.height,
        "webp": webp_path.name,
        "jpg": jpg_path.name,
        "bytesWebp": webp_path.stat().st_size,
        "bytesJpg": jpg_path.stat().st_size,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--src", default="originais")
    parser.add_argument("--out", default="src/img")
    args = parser.parse_args()

    src_dir = Path(args.src)
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    manifest: dict[str, dict] = {}
    for out_name, source, box, widths in VARIANTS:
        image = load(src_dir, source)
        if box:
            image = image.crop(box)
        entry = {"width": image.width, "height": image.height, "sizes": []}
        for width in widths:
            variant = resize(image, width)
            entry["sizes"].append(save_pair(variant, out_dir, f"{out_name}-{width}"))
        manifest[out_name] = entry
        print(f"{out_name}: {image.width}x{image.height} -> {[s['width'] for s in entry['sizes']]}")

    og_name, og_source, og_box, og_width = OG_IMAGE
    og = resize(load(src_dir, og_source).crop(og_box), og_width)
    og_path = out_dir / f"{og_name}.jpg"
    og.save(og_path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    manifest[og_name] = {"width": og.width, "height": og.height, "jpg": og_path.name}
    print(f"{og_name}: {og.width}x{og.height}")

    (out_dir / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Manifesto gravado em {out_dir / 'manifest.json'}")


if __name__ == "__main__":
    main()
