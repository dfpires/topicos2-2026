import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {useState} from 'react'

export default function App(){
    // variáveis de estado
    const [nome, setNome] = useState("")
    const [mensagem, setMensagem] = useState("") 
    // funções
    const saudar = () => {
        setMensagem(`Bem-vindo, ${nome}`)
    }
    const limpar = () => {
        setNome("")
        setMensagem("")
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.titulo}> Boas-Vindas </Text>
            <Text style={styles.subtitulo}> Digite seu nome e clique em "Saudar" </Text>
            <View style={styles.card}>
                <Text> Seu nome </Text>
                <TextInput style={styles.input} placeholder="Ex: Maria" 
                    value={nome} onChangeText={setNome}/>
                <TouchableOpacity style={styles.botao} onPress={saudar}>
                    <Text style={styles.textoBotao}> Saudar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={limpar}>
                    <Text style={styles.textoBotao}> Limpar </Text>
                </TouchableOpacity>
                <View>
                    <Text> 
                        {mensagem || "A saudação aparecerá aqui"} 
                    </Text>
                </View>
            </View>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#F3F4F6",
        justifyContent: "center", padding: 24
    },
    titulo: {
        fontSize: 26, textAlign: "center"
    },
    subtitulo: {
        fontSize: 14, textAlign: "center"
    },
    card: {
        backgroundColor: "#AABBFF",
        borderRadius: 12,
        padding: 16,
        margin: 10
    },
    input: {
        height: 30, borderRadius: 10, 
        backgroundColor: "#fff", margin: 5
    },
    botao: {
        justifyContent: "center", alignItems: "center",
        height: 48, borderRadius: 10, 
        backgroundColor: "#003366", margin: 10 
    },
    textoBotao: {
        color: "#fff"
    }
})