import React, { createContext, useContext, useMemo, useState } from 'react';

export type Entry = {
  id: number;
  title: string;
  date: string;
  preview: string;
  body: string;
  moodImage: any;
};

type EntriesContextType = {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, 'id'>) => void;
  getById: (id: string | number) => Entry | undefined;
  likedIds: Set<number>;
  toggleLike: (id: number) => void;
};

const EntriesContext = createContext<EntriesContextType | null>(null);

const INITIAL_ENTRIES: Entry[] = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-24',
    preview: 'Jalan pagi 20 menit dan menikmati udara segar.',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit.',
    moodImage: require('../../assets/moods/happy.png'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-23',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim.',
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai.',
    moodImage: require('../../assets/moods/focus.png'),
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-22',
    preview: 'Membaca buku sambil menikmati suasana senja.',
    body: 'Sore ini saya menikmati waktu di taman sambil membaca buku.',
    moodImage: require('../../assets/moods/calm.png'),
  },
];

export function EntriesProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>(INITIAL_ENTRIES);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const addEntry = (entry: Omit<Entry, 'id'>) => {
    setEntries((prev) => [
      {
        id: Date.now(),
        ...entry,
      },
      ...prev,
    ]);
  };

  const getById = (id: string | number) => {
    return entries.find((entry) => entry.id === Number(id));
  };

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      entries,
      addEntry,
      getById,
      likedIds,
      toggleLike,
    }),
    [entries, likedIds]
  );

  return (
    <EntriesContext.Provider value={value}>
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const value = useContext(EntriesContext);

  if (!value) {
    throw new Error('useEntries harus berada di dalam EntriesProvider');
  }

  return value;
}