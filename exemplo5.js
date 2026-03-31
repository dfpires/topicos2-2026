import { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, 
  StyleSheet, Alert, StatusBar 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const STORAGE_KEY = "@meus_livros_v1";

export default function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [foiLido, setFoiLido] = useState(false); // Estado para o status de leitura
  const [livros, setLivros] = useState([]);

  // 1. Carregar dados ao iniciar
  useEffect(() => {
    (async () => {
      try {
        const salvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (salvo) setLivros(JSON.parse(salvo));
      } catch (e) {
        Alert.alert("Erro", "Falha ao carregar estante.");
      }
    })();
  }, []);

  // 2. Salvar dados sempre que a lista mudar
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(livros));
      } catch (e) {
        Alert.alert("Erro", "Falha ao salvar dados.");
      }
    })();
  }, [livros]);

  const adicionarLivro = () => {
    if (!titulo.trim() || !autor.trim()) {
      Alert.alert("Atenção", "Preencha o título e o autor.");
      return;
    }

    const novoLivro = {
      id: Date.now().toString(),
      titulo,
      autor,
      lido: foiLido // Salva o status escolhido no cadastro
    };

    setLivros([...livros, novoLivro]);
    
    // Limpar campos
    setTitulo("");
    setAutor("");
    setFoiLido(false);
  };

  const removerLivro = (id) => {
    setLivros(livros.filter(l => l.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.card, 
      { borderLeftColor: item.lido ? "#10B981" : "#3B82F6" } // Verde se lido, azul se lendo
    ]}>
      <View style={styles.infoLivro}>
        <MaterialCommunityIcons 
          name={item.lido ? "check-decagram" : "book-open-page-variant"} 
          size={24} 
          color={item.lido ? "#10B981" : "#3B82F6"} 
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.txtTitulo}>{item.titulo}</Text>
          <Text style={styles.txtAutor}>{item.autor}</Text>
          <Text style={[styles.badge, { color: item.lido ? "#10B981" : "#3B82F6" }]}>
            {item.lido ? "CONCLUÍDO" : "LENDO AGORA"}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => removerLivro(item.id)}>
        <MaterialCommunityIcons name="trash-can-outline" size={24} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Text style={styles.header}>📚 Minha Estante</Text>

      {/* ÁREA DE CADASTRO */}
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Título do Livro" 
          value={titulo} 
          onChangeText={setTitulo}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Autor" 
          value={autor} 
          onChangeText={setAutor}
        />
        
        {/* SELETOR DE STATUS (UI CHANGE) */}
        <TouchableOpacity 
          style={styles.selector} 
          onPress={() => setFoiLido(!foiLido)}
        >
          <MaterialCommunityIcons 
            name={foiLido ? "checkbox-marked" : "checkbox-blank-outline"} 
            size={24} 
            color="#6366F1" 
          />
          <Text style={styles.txtSelector}>Já terminei de ler este livro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSalvar} onPress={adicionarLivro}>
          <Text style={styles.txtBtn}>ADICIONAR À ESTANTE</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={livros}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Sua estante está vazia.</Text>}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F5F9", padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", color: "#1E293B", marginTop: 40, textAlign: 'center', marginBottom: 20 },
  form: { backgroundColor: "#FFF", padding: 15, borderRadius: 20, elevation: 4, marginBottom: 20 },
  input: { borderBottomWidth: 1, borderBottomColor: "#E2E8F0", padding: 12, fontSize: 16, marginBottom: 10 },
  selector: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  txtSelector: { marginLeft: 10, color: "#475569", fontSize: 15 },
  btnSalvar: { backgroundColor: "#6366F1", padding: 15, borderRadius: 12, alignItems: 'center' },
  txtBtn: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  card: { 
    flexDirection: 'row', backgroundColor: "#FFF", padding: 15, borderRadius: 12, 
    marginBottom: 10, alignItems: 'center', justifyContent: 'space-between',
    borderLeftWidth: 6
  },
  infoLivro: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  txtTitulo: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  txtAutor: { fontSize: 14, color: "#64748B" },
  badge: { fontSize: 11, fontWeight: "bold", marginTop: 4 },
  vazio: { textAlign: 'center', marginTop: 50, color: "#94A3B8" }
});