import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics'; // Biblioteca de vibração
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {

  // Função para sucesso (vibração curta e leve)
  const tocarSucesso = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  // Função para erro (vibração em sequência/alerta)
  const tocarErro = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.titulo}>Teste de Haptics</Text>
      <Text style={styles.subtitulo}>Sinta a resposta física do celular</Text>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={[styles.botao, styles.btnSucesso]} onPress={tocarSucesso}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#FFF" />
          <Text style={styles.txtBotao}>Vibração de Sucesso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.btnErro]} onPress={tocarErro}>
          <MaterialCommunityIcons name="alert-octagon" size={24} color="#FFF" />
          <Text style={styles.txtBotao}>Vibração de Erro</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  subtitulo: { fontSize: 16, color: '#64748B', marginBottom: 40 },
  areaBotoes: { width: '80%' },
  botao: { 
    flexDirection: 'row', padding: 20, borderRadius: 15, 
    alignItems: 'center', justifyContent: 'center', marginBottom: 15 
  },
  btnSucesso: { backgroundColor: '#10B981' },
  btnErro: { backgroundColor: '#EF4444' },
  txtBotao: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 }
});