
import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import { COLORS, SPACE, TYPO } from '../styles/tokens';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

// DATA AWAL BUKU HARIAN
const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-18',
    preview: 'Jalan pagi 20 menit dan menikmati udara segar.',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit.',
    moodImage: require('../../assets/moods/happy.png'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-17',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim.',
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai.',
    moodImage: require('../../assets/moods/focus.png'),
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-16',
    preview: 'Membaca buku sambil menikmati suasana senja.',
    body: 'Sore ini saya menikmati waktu di taman sambil membaca buku.',
    moodImage: require('../../assets/moods/calm.jpg'),
  },
];

export default function DiaryListScreen() {
  // STATE UTAMA
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);

  // FILTER DATA BERDASARKAN PENCARIAN
  const filtered = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      return entries;
    }

    return entries.filter((entry) => {
      const title = entry.title?.toLowerCase() ?? '';
      const preview = entry.preview?.toLowerCase() ?? '';
      const body = entry.body?.toLowerCase() ?? '';
      const date = entry.date?.toLowerCase() ?? '';

      return (
        title.includes(searchText) ||
        preview.includes(searchText) ||
        body.includes(searchText) ||
        date.includes(searchText)
      );
    });
  }, [entries, query]);

  // FUNGSI LIKE / FAVORIT
  const toggleLike = useCallback((id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  // FUNGSI MENAMBAHKAN ENTRI
  const addEntry = useCallback((newEntry) => {
    if (!newEntry) {
      return;
    }

    setEntries((prev) => {
      const entryWithId = {
        ...newEntry,
        id: newEntry.id ?? Date.now(),
      };

      return [entryWithId, ...prev];
    });
  }, []);

  // FUNGSI MEMBUKA DETAIL DIARY
  const openDetail = useCallback((entry) => {
    setSelected(entry);
  }, []);

  // FUNGSI MENUTUP DETAIL DIARY
  const closeDetail = useCallback(() => {
    setSelected(null);
  }, []);

  // RENDER ITEM FLATLIST
  const renderItem = useCallback(
    ({ item }) => (
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodImage={item.moodImage}
        liked={likedIds.has(item.id)}
        onToggleLike={() => toggleLike(item.id)}
        onPress={() => openDetail(item)}
      />
    ),
    [likedIds, toggleLike, openDetail]
  );

  // KEY EXTRACTOR
  const keyExtractor = useCallback(
    (item) => String(item.id),
    []
  );

  // KOMPONEN KETIKA DATA KOSONG
  const renderEmpty = () => (
    <Text style={styles.empty}>
      {query.trim()
        ? 'Tidak ada entri yang cocok.'
        : 'Belum ada entri.'}
    </Text>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>
        Buku Harian
      </Text>

      {/* SEARCH BAR */}
      <SearchBar onChange={setQuery} />

      {/* FORM TAMBAH DIARY */}
      <EntryForm onSubmit={addEntry} />

      {/* DAFTAR DIARY */}
      <FlatList
        data={filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      {/* MODAL DETAIL DIARY */}
      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={closeDetail}
      />
    </View>
  );
}

// STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },

  listContent: {
    padding: SPACE.l,
    gap: SPACE.m,
    paddingTop: SPACE.m,
    flexGrow: 1,
  },

  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
  },
});
