import json
import re

BROKEN = r"C:\Users\mimod\OneDrive\Bureau\Courses.tv\src\data\dorardata\dorar6\dataDrV.json"
FIXED  = r"C:\Users\mimod\OneDrive\Bureau\Courses.tv\src\data\dorardata\dorar6\dataDrV_REPAIRED.json"

with open(BROKEN, "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

chunks = re.split(r'"id"\s*:\s*"', text)

videos = []

for chunk in chunks[1:]:
    try:
        vid = chunk[:11]

        # TITLE
        title_match = re.search(r'"title"\s*:\s*"([^"]+)', chunk)
        title = title_match.group(1) if title_match else "NO_TITLE"

        # URL
        url_match = re.search(r'"url"\s*:\s*"([^"]+)', chunk)
        url = url_match.group(1) if url_match else f"https://www.youtube.com/watch?v={vid}"

        # THUMBNAILS (bloc complet)
        thumbs_match = re.search(r'"thumbnails"\s*:\s*(\[[\s\S]*?\])', chunk)
        thumbnails = []

        if thumbs_match:
            thumbs_text = thumbs_match.group(1)

            # nettoyer virgules cassées
            thumbs_text = re.sub(r",\s*]", "]", thumbs_text)

            try:
                thumbnails = json.loads(thumbs_text)
            except:
                pass

        video = {
            "id": vid,
            "title": title,
            "url": url,
            "thumbnails": thumbnails
        }

        videos.append(video)

    except:
        continue

print("Vidéos reconstruites :", len(videos))

with open(FIXED, "w", encoding="utf-8") as f:
    json.dump(videos, f, ensure_ascii=False, indent=2)

print("✅ JSON reconstruit avec thumbnails :", FIXED)