import React, { 
  useState, 
} from 'react'; 
 
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  ScrollView, 
} from 'react-native'; 
 
import { 
  useRouter, 
} from 'expo-router'; 
 
import { 
  useDiary, 
} from '../../src/context/DiaryContext'; 
 
import { 
  COLORS, 
  SPACE, 
  RADIUS, 
} from '../../src/styles/tokens'; 
 
const MOODS = [ 
  '😊', 
  '💻', 
  '📖', 
  '🌟', 
]; 
 
export default function CreateScreen() { 
  const router = useRouter(); 
  const { addEntry } = useDiary(); 
 
  const [title, setTitle] = 
    useState(''); 
 
  const [date, setDate] = 
    useState('2026-11-02'); 
 
  const [body, setBody] = 
    useState(''); 
 
  const [mood, setMood] = 
    useState('😊'); 
 
  const canSave = 
    title.trim().length > 0 && 
    body.trim().length > 0; 
 
  const save = () => { 
    if (!canSave) return; 
 
    addEntry({ 
      title: title.trim(), 
      date: date.trim(), 
      preview: 
        body.trim().slice( 
          0, 
          80 
        ), 
      body: body.trim(), 
      mood, 
    }); 
 
    setTitle(''); 
    setBody(''); 
    setMood('😊'); 
 
    router.replace('/'); 
  }; 
 
  return ( 
    <ScrollView contentContainerStyle={styles.container}> 
      <Text style={styles.heading}> 
        Tambah Diary 
      </Text> 
 
      <TextInput 
        style={styles.input} 
        placeholder="Judul catatan..." 
        placeholderTextColor={COLORS.muted}
        value={title}
        onChangeText={setTitle}
      /> 
 
      <TextInput 
        style={styles.input} 
        placeholder="Tanggal (YYYY-MM-DD)" 
        placeholderTextColor={COLORS.muted}
        value={date}
        onChangeText={setDate}
      /> 
 
      <TextInput 
        style={[styles.input, styles.bodyInput]} 
        placeholder="Tuliskan isi diary di sini..." 
        placeholderTextColor={COLORS.muted}
        value={body}
        onChangeText={setBody}
        multiline
      /> 
 
      <Text style={styles.label}> 
        Mood 
      </Text> 
 
      <View style={styles.moodRow}> 
        {MOODS.map((item) => ( 
          <Pressable 
            key={item}
            onPress={() => setMood(item)} 
            style={[ 
              styles.moodButton, 
              mood === item && 
                styles.moodSelected, 
            ]} 
          > 
            <Text style={styles.moodText}> 
              {item} 
            </Text> 
          </Pressable> 
        ))} 
      </View> 
 
      <Pressable 
        style={[
          styles.saveButton,
          !canSave && styles.disabled
        ]}
        onPress={save}
        disabled={!canSave}
      > 
        <Text style={styles.saveText}> 
          Simpan 
        </Text> 
      </Pressable> 
    </ScrollView> 
  ); 
} 
 
const styles = 
  StyleSheet.create({ 
    container: { 
      flexGrow: 1, 
      padding: SPACE.l, 
      gap: SPACE.m, 
      backgroundColor: 
        COLORS.background, 
    }, 
    heading: { 
      fontSize: 24, 
      fontWeight: '700', 
      color: COLORS.text,
    }, 
    input: { 
      borderWidth: 1, 
      borderColor: COLORS.border, 
      borderRadius: RADIUS.card, 
      padding: 12, 
      backgroundColor: '#fff', 
      color: COLORS.text,
    }, 
    bodyInput: { 
      minHeight: 120, 
      textAlignVertical: 'top', 
    }, 
    label: { 
      fontWeight: '700', 
      color: COLORS.text,
    }, 
    moodRow: { 
      flexDirection: 'row', 
      gap: SPACE.s, 
    }, 
    moodButton: { 
      padding: 10, 
      borderWidth: 1, 
      borderColor: COLORS.border, 
      borderRadius: 12, 
      backgroundColor: '#fff', 
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 48,
    }, 
    moodSelected: { 
      borderColor: COLORS.accent, 
      borderWidth: 2, 
    }, 
    moodText: { 
      fontSize: 26, 
    }, 
    saveButton: { 
      padding: 14, 
      backgroundColor: COLORS.accent, 
      borderRadius: RADIUS.card, 
      alignItems: 'center', 
      marginTop: SPACE.s,
    }, 
    disabled: { 
      opacity: 0.45, 
    }, 
    saveText: { 
      color: '#fff', 
      fontWeight: '700', 
    }, 
  });