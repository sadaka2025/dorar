// src/data/maherJson.js

// Base URL de Supabase pour les fichiers audio Maher
const bucketUrl =
  'https://wjhwgybzljgwfxmzbgaf.supabase.co/storage/v1/object/public/audio/maher/';

// Nombre d'ayahs par sourate (utile si tu veux garder l'info)
const ayahsPerSurah = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111,
  110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45,
  83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55,
  78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20,
  56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21,
  11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6, 3, 5, 4,
  6,
];

// Générer JSON Maher par sourate
export const maherJson = Array.from({ length: 114 }, (_, s) => {
  const surahNumber = s + 1;
  const ayahCount = ayahsPerSurah[s];

  return {
    surah_number: surahNumber,
    reciter: 'Maher_AlMuaiqly_128kbps',
    verses: [
      {
        verse_key: `${surahNumber}:1`, // juste 1 pour compatibilité
        audio_url: `${bucketUrl}${String(surahNumber).padStart(3, '0')}001.mp3`,
        duration: 0, // tu peux ajouter la durée totale si tu veux
        text: '', // texte complet ou vide
        ayah_count: ayahCount, // utile si tu veux naviguer ayah par ayah dans le player
        page: 0,
        juz: 0,
        hizb: 0,
        rub: 0,
        thumn: 0,
      },
    ],
  };
});
