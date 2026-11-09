import React, { 
  useMemo, 
  useState, 
} from 'react'; 
 
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
} from 'react-native'; 
 
import { 
  useRouter, 
} from 'expo-router'; 
 
import { 
  useEntries, 
} from '../../src/context/EntriesContext'; 
 
import DiaryCard from '../../src/components/DiaryCard'; 
 
import { 
  COLORS, 
  SPACE, 
  TYPO, 
} from '../../src/styles/tokens'; 
 
export default function HomeScreen() { 
  const router = useRouter(); 
 
  const { 
    entries, 
    likedIds, 
    toggleLike, 
  } = useEntries(); 
 
  const [query, setQuery] = 
    useState(''); 
 
  const data = useMemo(() => { 
    const q = 
      query.trim().toLowerCase(); 
 
    if (!q) return entries; 
 
    return entries.filter( 
      (entry) => 
        entry.title 
          .toLowerCase() 
          .includes(q) || 
        entry.preview 
          .toLowerCase() 
          .includes(q) || 
        entry.date 
          .toLowerCase() 
          .includes(q) 
    ); 
  }, [entries, query]); 
 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.header}> 
        Buku Harian 
      </Text> 
 
      <TextInput 
        style={styles.search} 
        placeholder="Cari catatan..." 
        placeholderTextColor={COLORS.muted} 
        value={query} 
        onChangeText={setQuery} 
      /> 
 
      <FlatList 
        data={data} 
        keyExtractor={(item) => 
          String(item.id) 
        } 
        contentContainerStyle={ 
          styles.list 
        } 
        renderItem={({ item }) => ( 
          <DiaryCard 
            title={item.title}
            date={item.date}
            preview={item.preview}
            moodImage={item.moodImage}
            liked={likedIds.has(item.id)}
            onToggleLike={() => 
              toggleLike(item.id) 
            } 
            onPress={() => 
              router.push({ 
                pathname: 
                  '/detail/[id]', 
                params: { 
                  id: String(item.id), 
                }, 
              }) 
            } 
          /> 
        )} 
      /> 
    </View> 
  ); 
} 
 
const styles = 
  StyleSheet.create({ 
    container: { 
      flex: 1, 
      padding: SPACE.l, 
      backgroundColor: 
        COLORS.surface, 
    }, 
    header: { 
      fontSize: TYPO.h1, 
      fontWeight: '700', 
      color: COLORS.text, 
      marginBottom: SPACE.m, 
    }, 
    search: { 
      borderWidth: 1, 
      borderColor: COLORS.border, 
      borderRadius: 12, 
      padding: 10, 
      marginBottom: SPACE.m, 
      color: COLORS.text,
      backgroundColor: COLORS.surface,
    }, 
    list: { 
      gap: SPACE.m, 
      paddingBottom: SPACE.xl, 
    }, 
  });