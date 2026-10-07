import React from 'react'; 
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
} from 'react-native'; 

const diaryEntries = [ 
  { 
    id: 1, 
    title: 'Pagi yang Tenang', 
    date: '2025-10-06', 
    preview: 
      'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...', 
    moodUri: 'https://picsum.photos/seed/happy/80', 
  }, 
  { 
    id: 2, 
    title: 'Produktif di Kampus', 
    date: '2025-10-05', 
    preview: 
      'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...', 
    moodUri: 'https://picsum.photos/seed/focus/80', 
  }, 
  { 
    id: 3, 
    title: 'Senja di Taman', 
    date: '2025-10-04', 
    preview: 
      'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...', 
    moodUri: 'https://picsum.photos/seed/calm/80', 
  }, 
]; 

export default function DiaryListScreen() { 
  return ( 
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content} 
    > 
      <Text style={styles.header}>Buku Harian</Text> 

      {diaryEntries.map((entry) => ( 
        <View key={entry.id} style={styles.card}> 
          <Image 
            source={{ uri: entry.moodUri }} 
            style={styles.mood} 
          /> 

          <View style={styles.cardContent}> 
            <Text style={styles.title} numberOfLines={1}> 
              {entry.title} 
            </Text> 
            <Text style={styles.date}>{entry.date}</Text> 
            <Text 
              style={styles.preview} 
              numberOfLines={3} 
              ellipsizeMode="tail" 
            > 
              {entry.preview} 
            </Text> 
          </View> 
        </View> 
      ))} 
    </ScrollView> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff', 
  }, 
  content: { 
    padding: 16, 
  }, 
  header: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 12, 
  }, 
  card: { 
    flexDirection: 'row', 
    gap: 12, 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    borderRadius: 12, 
    marginBottom: 12, 
  }, 
  mood: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
  }, 
  cardContent: { 
    flex: 1, 
  }, 
  title: { 
    fontSize: 16, 
    fontWeight: '700', 
  }, 
  date: { 
    fontSize: 12, 
    color: '#6b7280', 
    marginBottom: 6, 
  }, 
  preview: { 
    fontSize: 14, 
  }, 
});