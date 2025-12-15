import json
import os
from yt_dlp import YoutubeDL
from docx import Document
from fpdf import FPDF

# --- Fichiers d'entrée et sortie ---
input_json = "src/data/nour-alyakine.json"
output_dir = "src/data/transcripts"
os.makedirs(output_dir, exist_ok=True)

# --- Chemin vers le fichier cookies (exporté depuis le navigateur si nécessaire) ---
cookies_file = "cookies.txt"  # <-- Facultatif si vidéos publiques

# --- Options yt-dlp avec cookies ---
ydl_opts = {
    'skip_download': True,
    'writesubtitles': True,
    'writeautomaticsub': True,
    'subtitleslangs': ['all'],   # récupère toutes les sous-titres
    'subtitlesformat': 'vtt',
    'outtmpl': os.path.join(output_dir, '%(id)s.%(ext)s'),
    'cookiefile': cookies_file if os.path.exists(cookies_file) else None,
    'quiet': True,
    'ignoreerrors': True,  # <-- ignore les vidéos non accessibles
}

# --- Lecture du JSON ---
with open(input_json, "r", encoding="utf-8") as f:
    videos = json.load(f)

def find_best_arabic_subtitle(output_dir, youtube_id):
    candidates = [
        f"{youtube_id}.ar.vtt",
        f"{youtube_id}.ar-SA.vtt",
        f"{youtube_id}.ar-EG.vtt",
        f"{youtube_id}.ar-AR.vtt",
        f"{youtube_id}.asr.vtt",
        f"{youtube_id}.auto.vtt"
    ]
    for file in os.listdir(output_dir):
        if file.startswith(youtube_id) and file.endswith(".vtt"):
            if any(tag in file for tag in ["ar", "asr", "auto"]):
                return os.path.join(output_dir, file)
    for cand in candidates:
        path = os.path.join(output_dir, cand)
        if os.path.exists(path):
            return path
    return None

# --- Boucle principale ---
for video in videos:
    url = video['url']
    vid_id = video['id']

    print(f"\n📌 Processing video {vid_id}: {url}")

    try:
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if info is None:
                print(f"  ⚠️ Vidéo {vid_id} non accessible (privée ou supprimée).")
                continue

            youtube_id = info['id']

            # Trouver le fichier arabe
            subtitle_file = find_best_arabic_subtitle(output_dir, youtube_id)
            if not subtitle_file:
                print(f"  ⚠️ Aucun sous-titre AR trouvé pour vidéo {vid_id}.")
                continue

            print(f"  ✅ Sous-titre trouvé: {subtitle_file}")

            # Lire VTT → texte
            with open(subtitle_file, "r", encoding="utf-8") as f:
                lines = f.readlines()
            text_lines = [
                line.strip()
                for line in lines
                if "-->" not in line and line.strip() != "" and not line.startswith("WEBVTT")
            ]
            full_text = "\n".join(text_lines)
            full_text_with_desc = video.get("description", "") + "\n\n" + full_text

            # DOCX
            doc = Document()
            for line in full_text_with_desc.split("\n"):
                doc.add_paragraph(line)
            doc_path = os.path.join(output_dir, f"video{vid_id}.docx")
            doc.save(doc_path)

            # PDF
            pdf = FPDF()
            pdf.set_auto_page_break(auto=True, margin=15)
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            for line in full_text_with_desc.split("\n"):
                pdf.multi_cell(0, 8, line)
            pdf_path = os.path.join(output_dir, f"video{vid_id}.pdf")
            pdf.output(pdf_path)

            # Update JSON
            video['transcript_docx'] = doc_path
            video['transcript_pdf'] = pdf_path

            print(f"  📄 DOCX + PDF OK pour vidéo {vid_id}")

    except Exception as e:
        print(f"  ⚠️ Erreur pour vidéo {vid_id}: {e} — Vidéo ignorée.")

# --- Sauvegarde JSON ---
output_json = os.path.join(output_dir, "nour-alyakine-with-transcripts.json")
with open(output_json, "w", encoding="utf-8") as f:
    json.dump(videos, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Fini ! Fichier JSON mis à jour → {output_json}")
