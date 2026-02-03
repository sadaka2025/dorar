import { useState, useEffect, useRef } from 'react';
import { Music, Pause, Play } from 'lucide-react';
import surahNames from '../dataQuran/surahNames';
import { reciters } from '../dataQuran/reciters';
import { maherJson } from '../dataQuran/maherJson';

export default function MusicPlayer() {
  const [reciterIndex, setReciterIndex] = useState(0);
  const [allSurahs, setAllSurahs] = useState([]);
  const [surahIndex, setSurahIndex] = useState(0);
  const [verses, setVerses] = useState([]);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);

  // =============================
  // Charger les sourates
  // =============================
  useEffect(() => {
    const reciter = reciters[reciterIndex];

    if (reciter.id === 'maher-al-muaiqly') {
      setAllSurahs(maherJson);
      setSurahIndex(0);
    } else {
      fetch(reciter.jsonUrl)
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data)) data = Object.values(data);
          setAllSurahs(data);
          setSurahIndex(0);
        })
        .catch((err) => {
          console.error('Erreur JSON réciteur:', err);
          setAllSurahs([]);
        });
    }
  }, [reciterIndex]);

  // =============================
  // Charger les versets selon sourate et réciteur
  // =============================
  useEffect(() => {
    if (!allSurahs.length) return;
    const surah = allSurahs[surahIndex];
    const reciter = reciters[reciterIndex];

    if (reciter.id === 'maher-al-muaiqly') {
      // Maher → un seul fichier par sourate
      setVerses([surah.verses[0]]);
    } else {
      // Autres récitateurs → par ayah
      setVerses(surah.verses || []);
    }

    setCurrentAyah(0);
  }, [surahIndex, allSurahs, reciterIndex]);

  // =============================
  // Lecture continue
  // =============================
  useEffect(() => {
    if (!playing || !audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    const t = setTimeout(
      () => audioRef.current.play().catch((e) => console.log('play error', e)),
      120
    );
    return () => clearTimeout(t);
  }, [currentAyah, playing]);

  // =============================
  // Fin audio
  // =============================
  const handleEnded = () => {
    if (reciters[reciterIndex].id === 'maher-al-muaiqly') {
      setPlaying(false);
      return;
    }
    if (currentAyah < verses.length - 1) setCurrentAyah((v) => v + 1);
    else setPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  const getAudioUrl = (verse, reciter) => {
    if (!verse) return '';

    if (reciter.id === 'maher-al-muaiqly') {
      return verse.audio_url; // Maher
    }

    return verse.audio_url || verse.audio?.online || '';
  };

  const getSurahName = (surah, index) => {
    let num = surah.surah_number;
    if (!num && surah.verses?.length) {
      num = parseInt(surah.verses[0].verse_key.split(':')[0], 10);
    }
    return surahNames[num - 1] || `Sourate ${index + 1}`;
  };

  return (
    <div
      className="bg-gray-200/70 backdrop-blur-md border rounded-2xl shadow-md px-4 py-3 flex items-center space-x-3 fixed z-[9999]"
      style={{ bottom: '20px', left: '20px' }}
    >
      <Music className="text-blue-700 w-5 h-5" />
      <select
        className="border px-2 py-1"
        value={reciterIndex}
        onChange={(e) => setReciterIndex(Number(e.target.value))}
      >
        {reciters.map((r, i) => (
          <option key={i} value={i}>
            {r.name}
          </option>
        ))}
      </select>
      <select
        className="border px-2 py-1"
        value={surahIndex}
        onChange={(e) => setSurahIndex(Number(e.target.value))}
        dir="rtl"
        lang="ar"
        style={{ fontFamily: "'Amiri', serif" }}
      >
        {allSurahs.map((s, i) => (
          <option key={i} value={i}>
            {getSurahName(s, i)}
          </option>
        ))}
      </select>
      <button
        onClick={togglePlay}
        className="p-1 rounded-full hover:bg-blue-100"
      >
        {playing ? (
          <Pause className="text-blue-700 w-6 h-6" />
        ) : (
          <Play className="text-blue-700 w-6 h-6" />
        )}
      </button>
      <audio ref={audioRef} onEnded={handleEnded}>
        {verses[currentAyah] && (
          <source
            src={getAudioUrl(verses[currentAyah], reciters[reciterIndex])}
            type="audio/mpeg"
          />
        )}
      </audio>
    </div>
  );
}
