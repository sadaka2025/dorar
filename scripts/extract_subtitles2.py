import json
import yt_dlp
import re
from pathlib import Path

JSON_PATH = r"C:\Users\mimod\OneDrive\Bureau\Courses.tv\src\data\dorardata\dorar6\dataDrV.json"
OUTPUT_PATH = r"C:\Users\mimod\OneDrive\Bureau\Courses.tv\src\data\dorardata\dorar6\dataDrV_with_subtitles.json"


# ---------- Utils ----------

def extract_video_id(url):
    match = re.search(r"(?:v=|youtu\.be/)([^&]+)", url)
    return match.group(1) if match else None


def clean_vtt(text: str) -> str:
    """Nettoie le VTT pour garder uniquement le texte arabe"""
    lines = []
    for line in text.splitlines():
        line = line.strip()

        # ignorer timestamps et métadonnées
        if not line:
            continue
        if "-->" in line:
            continue
        if line.isdigit():
            continue
        if "WEBVTT" in line:
            continue

        lines.append(line)

    clean = " ".join(lines)

    # sécuriser JSON
    clean = clean.replace('"', "'")
    clean = re.sub(r"\s+", " ", clean)

    return clean.strip()


def get_arabic_subtitle(video_id):
    ydl_opts = {
        "skip_download": True,
        "writesubtitles": False,
        "writeautomaticsub": False,
        "quiet": True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(
            f"https://www.youtube.com/watch?v={video_id}",
            download=False
        )

        subs = info.get("automatic_captions", {}).get("ar")

        if not subs:
            return ""

        sub_url = subs[0]["url"]
        raw = ydl.urlopen(sub_url).read().decode("utf-8")

        return clean_vtt(raw)


# ---------- Charger JSON proprement ----------

with open(JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

# Forcer ARRAY (sécurité)
if isinstance(data, dict):
    videos = list(data.values())
else:
    videos = data


# ---------- Traitement ----------

for video in videos:
    if video.get("subtitle"):  # déjà traité
        continue

    url = video.get("url") or video.get("link")
    if not url:
        continue

    vid = extract_video_id(url)
    if not vid:
        continue

    print("🔄 Extraction:", video.get("title"))

    try:
        subtitle = get_arabic_subtitle(vid)
        video["subtitle"] = subtitle
    except Exception as e:
        print("❌ erreur:", e)


# ---------- Sauvegarde JSON valide ----------

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(videos, f, ensure_ascii=False, indent=2)

print("✅ Terminé :", OUTPUT_PATH)