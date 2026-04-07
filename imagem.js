import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Biblioteca necessária
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [imagem, setImagem] = useState(null);

  const selecionarImagem = async () => {
    // 1. Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos.");
      return;
    }

    // 2. Abre a galeria
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite cortar a foto
      aspect: [1, 1], // Força um quadrado
      quality: 1,
    });

    // 3. Se o usuário não cancelou, salva a URI da imagem no estado
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Foto de Perfil</Text>

      <View style={styles.areaFoto}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.foto} />
        ) : (
          <View style={[styles.foto, styles.fotoVazia]}>
            <MaterialCommunityIcons name="camera-plus" size={50} color="#CBD5E1" />
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.botao} onPress={selecionarImagem}>
        <Text style={styles.txtBotao}>ALTERAR FOTO</Text>
      </TouchableOpacity>
      
      {imagem && (
        <TouchableOpacity onPress={() => setImagem(null)}>
          <Text style={styles.txtRemover}>Remover foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', marginBottom: 30 },
  areaFoto: { marginBottom: 30, elevation: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 15 },
  foto: { width: 180, height: 180, borderRadius: 90, borderWidth: 4, borderColor: '#FFF' },
  fotoVazia: { backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  botao: { backgroundColor: '#6366F1', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30 },
  txtBotao: { color: '#FFF', fontWeight: 'bold' },
  txtRemover: { marginTop: 20, color: '#EF4444', fontWeight: '500' }
});