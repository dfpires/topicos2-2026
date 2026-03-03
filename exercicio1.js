import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {
  // 1. Variáveis de estado
  const [valorConta, setValorConta] = useState("");
  const [resultado, setResultado] = useState("");

  // 2. Função para calcular os 10%
  const calcularGorjeta = () => {
    // Convertendo o texto do input para número decimal
    const conta = parseFloat(valorConta);

    // Validação simples: verifica se é um número e se é maior que zero
    if (!isNaN(conta) && conta > 0) {
      const gorjeta = conta * 0.10;
      const total = conta + gorjeta;
      
      // Atualiza a mensagem com o resultado formatado (2 casas decimais)
      setResultado(
        `Gorjeta (10%): R$ ${gorjeta.toFixed(2)}\nTotal: R$ ${total.toFixed(2)}`
      );
    } else {
      setResultado("Por favor, digite um valor válido!");
    }
  };

  // 3. Função para limpar os campos
  const limpar = () => {
    setValorConta("");
    setResultado("");
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.titulo}> Calculadora de Gorjeta </Text>
      <Text style={styles.subtitulo}> Digite o valor da conta abaixo </Text>

      <View style={styles.card}>
        <Text style={styles.label}> Valor da Conta (R$) </Text>
        
        <TextInput
          style={styles.input}
          placeholder="Ex: 150.50"
          keyboardType="numeric" // Abre o teclado numérico no celular
          value={valorConta}
          onChangeText={setValorConta}
        />

        <TouchableOpacity style={styles.botaoCalcular} onPress={calcularGorjeta}>
          <Text style={styles.textoBotao}> Calcular (10%) </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
          <Text style={styles.textoBotao}> Limpar </Text>
        </TouchableOpacity>

        <View style={styles.areaResultado}>
          <Text style={styles.textoResultado}>
            {resultado || "O cálculo aparecerá aqui"}
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    padding: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
  },
  subtitulo: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#FFFFFF", // Fundo branco para parecer um cartão real
    borderRadius: 15,
    padding: 20,
    elevation: 4, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#374151",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  botaoCalcular: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#10B981", // Verde para "sucesso/calcular"
    marginBottom: 10,
  },
  botaoLimpar: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#EF4444", // Vermelho para "limpar/erro"
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  areaResultado: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#9CA3AF",
  },
  textoResultado: {
    textAlign: "center",
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 24,
  },
});