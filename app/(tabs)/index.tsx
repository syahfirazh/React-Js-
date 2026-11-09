import { 
  useCallback, 
  useRef, 
} from "react"; 
 
import { 
  FlatList, 
  Pressable, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
} from "react-native"; 
 
import { 
  useRouter, 
} from "expo-router"; 
 
import { 
  useDiary, 
} from "../../src/context/DiaryContext"; 
 
import { 
  useDiarySearch, 
} from "../../src/hooks/useDiarySearch"; 
 
import DiaryCard from "../../src/components/DiaryCard"; 
 
import { 
  COLORS, 
  SPACE, 
  TYPO, 
} from "../../src/styles/tokens"; 
 
export default function HomeScreen() { 
  const router = useRouter(); 
 
  const { 
    entries, 
    likedIds, 
    toggleLike, 
  } = useDiary(); 
 
  const { 
    query, 
    setQuery, 
    filteredEntries, 
    resultCount, 
  } = useDiarySearch(entries); 
 
  const searchRef = useRef<TextInput>(null); 
 
  const openDetail = useCallback( 
    (id: number) => { 
      router.push({ 
        pathname: "/detail/[id]", 
        params: { 
          id: String(id), 
        }, 
      }); 
    }, 
    [router] 
  ); 
 
  const clearSearch = useCallback(() => { 
    setQuery(""); 
    searchRef.current?.focus(); 
  }, [setQuery]); 
 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.header}> 
        Buku Harian 
      </Text> 
 
      <View style={styles.searchRow}> 
        <TextInput 
          ref={searchRef}
          style={styles.search} 
          placeholder="Cari catatan..." 
          placeholderTextColor={COLORS.muted}
          value={query} 
          onChangeText={setQuery} 
        /> 
        {query.length > 0 && (
          <Pressable style={styles.clearButton} onPress={clearSearch}> 
            <Text>Clear</Text> 
          </Pressable> 
        )}
      </View> 
 
      <Text style={styles.counter}> 
        {resultCount} entri ditemukan 
      </Text> 
 
      <FlatList 
        data={filteredEntries} 
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
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => 
              openDetail(item.id) 
            } 
            onToggleLike={() => 
              toggleLike(item.id) 
            } 
          /> 
        )} 
        ListEmptyComponent={ 
          <Text style={styles.empty}> 
            Diary tidak ditemukan. 
          </Text> 
        } 
      /> 
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    padding: SPACE.l, 
    backgroundColor: 
      COLORS.background, 
  }, 
 
  header: { 
    fontSize: TYPO.h1, 
    fontWeight: "700", 
    color: COLORS.text, 
    marginBottom: SPACE.m, 
  }, 
 
  searchRow: { 
    flexDirection: "row", 
    gap: SPACE.s, 
  }, 
 
  search: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 12, 
    padding: 10, 
    backgroundColor: "#fff", 
    color: COLORS.text,
  }, 
 
  clearButton: { 
    justifyContent: "center", 
    paddingHorizontal: 14, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 12, 
    backgroundColor: "#fff", 
  }, 
 
  counter: { 
    color: COLORS.muted, 
    marginVertical: SPACE.s, 
  }, 
 
  list: { 
    gap: SPACE.m, 
    paddingBottom: SPACE.xl, 
  }, 
 
  empty: { 
    textAlign: "center", 
    color: COLORS.muted, 
    paddingTop: 40, 
  }, 
});