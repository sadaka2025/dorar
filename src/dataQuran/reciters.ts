// src/data/reciters.ts
export type Reciter = {
  id: string;
  name: string;
  jsonUrl?: string;
  moshaf?: { server: string }[];
};

export const reciters: Reciter[] = [
  {
    id: 'abdulbasit-murattal',
    name: 'Abdul Basit (Murattal)',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/abdulbasit-murattal.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/abdulbasit/murattal/001.mp3',
      },
    ],
  },
  {
    id: 'abdulbasit-mujawwad',
    name: 'Abdul Basit (Mujawwad)',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/abdulbasit-mujawwad.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/abdulbasit/mujawwad/001.mp3',
      },
    ],
  },
  {
    id: 'abdurrahman-sudais',
    name: 'Abdurrahmaan As-Sudais',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/abdurrahman-sudais.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/abdurrahman-as-sudais/murattal/001.mp3',
      },
    ],
  },
  {
    id: 'abu-bakr-ash-shaatree',
    name: 'Abu Bakr Ash-Shaatree',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/abu-bakr-ash-shaatree.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/abu-bakr-ash-shaatree/murattal/001.mp3',
      },
    ],
  },
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/alafasy.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/mishary-rashid-alafasy/murattal/001.mp3',
      },
    ],
  },

  {
    id: 'hani-rifai',
    name: 'Hani Rifai',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/hani-rifai.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/hani-rifai/murattal/001.mp3',
      },
    ],
  },
  {
    id: 'husary-muallim',
    name: 'Husary (Muallim)',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/husary-muallim.json',
    moshaf: [
      {
        server: 'https://download.quranicaudio.com/qdc/husary/muallim/001.mp3',
      },
    ],
  },
  {
    id: 'husary',
    name: 'Al-Husary',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/husary.json',
    moshaf: [
      {
        server: 'https://download.quranicaudio.com/qdc/husary/murattal/001.mp3',
      },
    ],
  },
  {
    id: 'minshawy-mujawwad',
    name: 'Minshawy (Mujawwad)',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/minshawy-mujawwad.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/minshawy/mujawwad/001.mp3',
      },
    ],
  },
  {
    id: 'minshawy-murattal',
    name: 'Minshawy (Murattal)',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/minshawy-murattal.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/minshawy/murattal/001.mp3',
      },
    ],
  },
  {
    id: 'mohammad-tablaway',
    name: 'Mohammad al-Tablaway',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/mohammad-tablaway.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/mohammad-al-tablaway/murattal/001.mp3',
      },
    ],
  },
  {
    id: 'saood-shuraym',
    name: 'Saood ash-Shuraym',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/saood-shuraym.json',
    moshaf: [
      {
        server:
          'https://download.quranicaudio.com/qdc/saood-ash-shuraym/murattal/001.mp3',
      },
    ],
  },
  {
    id: 'maher-al-muaiqly',
    name: 'Maher Al-Muaiqly',
    jsonUrl:
      'https://ejokvgavnyhaoyjhwztt.supabase.co/storage/v1/object/public/tajweed/jsonquranPro/maher-al-muaiqly.json',
  },
];
