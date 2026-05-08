import re
import json
from docx import Document

# =============================
# المسار عندك
# =============================

FILE_PATH = r"C:\Users\mimod\OneDrive\Bureau\newsDocx\part-1.docx"


# =============================
# قراءة ملف Word
# =============================

def read_docx(path):
    doc = Document(path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return "\n".join(full_text)


# =============================
# تقسيم الحلقات
# (نفترض أن كل حلقة تبدأ بعنوان واضح)
# =============================

def split_episodes(text):
    # تقسيم تقريبي حسب وجود رابط يوتيوب
    episodes = re.split(r'https://www\.youtube\.com/watch\?v=', text)
    return [e.strip() for e in episodes if len(e.strip()) > 300]


# =============================
# تنظيف النص
# =============================

def clean_text(text):
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# =============================
# استخراج الآية
# =============================

def extract_ayah(text):
    patterns = [
        r"قال تعالى (.+?) ",
        r"في قوله تعالى (.+?) ",
        r"قوله تعالى (.+?) "
    ]

    for p in patterns:
        match = re.search(p, text)
        if match:
            return match.group(1)[:120]
    return None


# =============================
# تصنيف النوع
# =============================

def detect_type(text):
    if "ما الفرق" in text or "فرق بين" in text:
        return "فرق دلالي"
    if "اعراب" in text or "حذف" in text:
        return "ظاهرة نحوية"
    if "لماذا قال" in text:
        return "لمسة بيانية"
    return "تحليل لفظي"


# =============================
# استخراج الجمل المهمة
# =============================

def extract_semantic_sentences(text):
    keywords = [
        "في اللغة", "السياق", "يدل",
        "المقصود", "لا ينبغي",
        "الفرق", "يجوز"
    ]

    sentences = re.split(r'[.!؟]', text)
    selected = []

    for s in sentences:
        for k in keywords:
            if k in s:
                selected.append(s.strip())
                break

    return selected[:4]


# =============================
# توليد المحتوى النهائي
# =============================

def build_episode_output(text):

    text = clean_text(text)
    title = text[:60]

    ayah = extract_ayah(text)
    episode_type = detect_type(text)
    semantic_sentences = extract_semantic_sentences(text)

    summary = f"تتناول هذه الحلقة مسألة '{title}' ضمن إطار {episode_type}."
    if ayah:
        summary += f" وذلك في سياق قوله تعالى: ({ayah})."
    summary += " ويكشف التحليل عن دقة التعبير القرآني في اختيار الألفاظ."

    benefit = "تؤكد هذه الحلقة أن فهم القرآن يقتضي مراعاة الدلالة اللغوية والسياق البياني معًا."

    return {
        "العنوان المقترح": f"اللمسة البيانية في {title}",
        "نوع الحلقة": episode_type,
        "الآية": ayah,
        "الخلاصة": summary,
        "النقاط الدلالية": semantic_sentences,
        "الفائدة العلمية": benefit,
        "الوسوم": [
            "#اللمسات_البيانية",
            "#تدبر_القرآن",
            "#بلاغة_القرآن"
        ]
    }


# =============================
# التنفيذ الكامل
# =============================

def main():

    full_text = read_docx(FILE_PATH)
    episodes = split_episodes(full_text)

    results = []

    for ep in episodes:
        results.append(build_episode_output(ep))

    with open("output.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=4)

    print("✅ تم إنشاء ملف output.json بنجاح")


if __name__ == "__main__":
    main()
