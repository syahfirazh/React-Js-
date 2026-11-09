import React from 'react'; 
import { 
  View, 
  Text, 
  StyleSheet, 
} from 'react-native'; 
 
export default function SettingsScreen() { 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.title}> 
        Pengaturan 
      </Text> 
 
      <Text> 
        Halaman ini dapat dikembangkan 
        pada praktikum berikutnya. 
      </Text> 
    </View> 
  ); 
} 
 
const styles = 
  StyleSheet.create({ 
    container: { 
      flex: 1, 
      padding: 16, 
    }, 
    title: { 
      fontSize: 24, 
      fontWeight: '700', 
      marginBottom: 8, 
}, 
});