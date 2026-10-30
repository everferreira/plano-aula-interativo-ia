#!/usr/bin/env python3
"""Gera o banner do projeto (images/banner.png) com Pillow.

Uso: ~/dio-venv/bin/python scripts/gerar_banner.py
"""
from PIL import Image, ImageDraw, ImageFont
import pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SAIDA = RAIZ / "images" / "banner.png"

W, H = 1280, 640
img = Image.new("RGB", (W, H), "#ffffff")
d = ImageDraw.Draw(img)

# gradiente diagonal indigo -> violeta -> fuchsia
cor_a = (49, 46, 129)   # #312e81
cor_b = (124, 58, 237)  # #7c3aed
cor_c = (162, 28, 175)  # #a21caf
for y in range(H):
    t = y / (H - 1)
    if t < 0.55:
        tt = t / 0.55
        c = tuple(int(cor_a[i] + (cor_b[i] - cor_a[i]) * tt) for i in range(3))
    else:
        tt = (t - 0.55) / 0.45
        c = tuple(int(cor_b[i] + (cor_c[i] - cor_b[i]) * tt) for i in range(3))
    d.line([(0, y), (W, y)], fill=c)

# bolhas decorativas
for (cx, cy, r) in [(150, 520, 90), (1150, 120, 70), (950, 540, 50), (280, 90, 40)]:
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, 18), outline=(255, 255, 255, 40), width=3)

# fonte (DejaVu presente no sistema WSL)
def fonte(tamanho, negrito=False):
    nome = "DejaVuSans-Bold.ttf" if negrito else "DejaVuSans.ttf"
    try:
        return ImageFont.truetype(f"/usr/share/fonts/truetype/dejavu/{nome}", tamanho)
    except OSError:
        return ImageFont.load_default()

def centralizar(texto, f, y):
    bbox = d.textbbox((0, 0), texto, font=f)
    larg = bbox[2] - bbox[0]
    x = (W - larg) // 2
    d.text((x, y), texto, font=f, fill=(255, 255, 255))

centralizar("🤖 Plano de Aula Interativo", fonte(64, True), 150)
centralizar("com Ecossistema IA", fonte(64, True), 245)
centralizar("Formação AI for Teachers · DIO & Santander", fonte(30), 400)
centralizar("Ever Ferreira — Instrutora Sênior · Ctrl+Play", fonte(24), 470)
centralizar("github.com/everferreira", fonte(24), 520)

img.save(SAIDA, "PNG")
print(f"✔ banner gerado: {SAIDA} ({img.size[0]}x{img.size[1]})")