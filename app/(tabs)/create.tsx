import React, { 
  useState, 
} from 'react'; 
 
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
} from 'react-native'; 
 
import { 
  useRouter, 
} from 'expo-router'; 
 
import { 
  useEntries, 
} from '../../src/context/EntriesContext'; 
 
import { 
  COLORS, 
  SPACE, 
  RADIUS, 
} from '../../src/styles/tokens'; 
 
export default function CreateScreen() { 
  const router = useRouter(); 
  const { addEntry } = useEntries(); 
 
  const [title, setTitle] = 
    useState(''); 
 
  const [date, setDate] = 
    useState('2026-10-24'); 
 
  const [preview, setPreview] = 
    useState(''); 
 
  const canSave = 
    title.trim().length > 0 && 
    preview.trim().length > 0; 
 
  const save = () => { 
    if (!canSave) return; 
 
    addEntry({ 
      title: title.trim(), 
      date: date.trim(), 
      preview: preview.trim(), 
      body: preview.trim(), 
      moodImage: require( 
        '../../assets/moods/default.png' 
      ), 
    }); 
 
    setTitle(''); 
    setPreview(''); 
 
    router.replace('/'); 
  }; 
 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.title}> 
        Tambah Entri 
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
        style={[styles.input, styles.multiline]} 
        placeholder="Tuliskan isi catatan di sini..." 
        placeholderTextColor={COLORS.muted} 
        value={preview} 
        onChangeText={setPreview} 
        multiline 
      /> 
 
      <Pressable 
        style={[
          styles.button, 
          !canSave && styles.disabled
        ]} 
        onPress={save}
        disabled={!canSave}
      > 
        <Text style={styles.buttonText}> 
          Simpan 
        </Text> 
      </Pressable> 
    </View> 
  ); 
} 
 
const styles = 
  StyleSheet.create({ 
    container: { 
      flex: 1, 
      padding: SPACE.l, 
      gap: SPACE.m, 
      backgroundColor: 
        COLORS.surface, 
    }, 
    title: { 
      fontSize: 22, 
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
    multiline: { 
      minHeight: 120, 
      textAlignVertical: 'top', 
    }, 
    button: { 
      backgroundColor: COLORS.accent, 
      padding: SPACE.m, 
      borderRadius: RADIUS.card, 
      alignItems: 'center', 
      marginTop: SPACE.s,
    }, 
    disabled: { 
      opacity: 0.5, 
    }, 
    buttonText: { 
      color: '#fff', 
      fontWeight: '700', 
    }, 
  });