import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors'; 
import * as Haptics from 'expo-haptics'; 

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [resposta, setResposta] = useState("Chacoalhe para decidir!");
  const [subscription, setSubscription] = useState(null); // Nome correto da variável

  const opcoes = [
    "Sim, com certeza! ✅",
    "Não conte com isso ❌",
    "Talvez mais tarde... ⏳",
    "FOCO! Vá estudar! 📚",
    "A resposta é 42 🤖",
    "Sinais apontam que sim 🌟"
  ];

  const _subscribe = () => {
    // Ativa o sensor e guarda a inscrição no estado
    const sub = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
    setSubscription(sub);
    Accelerometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    // Remove a inscrição se ela existir
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  const aceleracaoTotal = Math.abs(x) + Math.abs(y) + Math.abs(z);

  useEffect(() => {
    // Se chacoalhar forte (limiar 3.5), gera resposta
    if (aceleracaoTotal > 3.5) { 
      const itemAleatorio = opcoes[Math.floor(Math.random() * opcoes.length)];
      setResposta(itemAleatorio);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [aceleracaoTotal]);

  return (
    <View style={styles.container}>
      <Text style={styles.instrucao}>O Oráculo Mobile</Text>
      
      <View style={styles.card}>
        <Text style={styles.textoResposta}>{resposta}</Text>
      </View>

      <Text style={styles.debug}>
        Força G: {aceleracaoTotal.toFixed(2)}
      </Text>
      
      <TouchableOpacity 
        onPress={subscription ? _unsubscribe : _subscribe} 
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {subscription ? 'Pausar Sensor' : 'Ativar Sensor'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#1E1E2E' },
  instrucao: { textAlign: 'center', color: '#FFF', fontSize: 18, marginBottom: 20 },
  card: { backgroundColor: '#6366F1', padding: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', minHeight: 200, elevation: 10 },
  textoResposta: { color: '#FFF', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  debug: { marginTop: 20, color: '#555', textAlign: 'center' },
  button: { marginTop: 50, alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 10 },
  buttonText: { color: '#1E1E2E', fontWeight: 'bold' }
});