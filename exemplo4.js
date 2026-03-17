import AsyncStorage from "@react-native-async-storage/async-storage"
import {Text, View, StatusBar, TouchableOpacity, TextInput, StyleSheet, FlatList} from "react-native"
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useState, useEffect} from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const STORAGEY_KEY = "@lista_tarefas"

export default function App(){
    const [tarefa, setTarefa] = useState("")
    const [tarefas, setTarefas] = useState([])
    // chamada toda vez que a aplicação carrega
    useEffect( () => {
        (async () => {
            try {
                // recupera o que tem no cookie @lista_tarefas
                const salvo = await AsyncStorage.getItem(STORAGEY_KEY)
                if (salvo){
                    // recupera o conteúdo do local storage
                    setTarefas(JSON.parse(salvo))
                }
            }
            catch (e){
                alert.alert("Erro", "Não foi possível carregas os dados")
            }
        })()
    }, [])

     // chamada toda vez que o vetor tarefas é atualizado
     useEffect( () => {
        (async () => {
            try {
                await AsyncStorage.setItem(STORAGEY_KEY, JSON.stringify(tarefas))
            }
            catch (e) {
                alert.alert("Erro", "Não foi possível salvar as tarefas")
            }
        })()
     }, [tarefas])
     
    const adicionaTarefa = () => {
        const nome = tarefa
        const nova = {
            id: Date.now().toString(),
            nome: nome
        }
        setTarefas([...tarefas, nova])
        setTarefa("")
    }
    const renderItem = ({item}) => (
        <View style={styles.itemLista}>
            <View style={styles.conteudoItem}>
                <MaterialCommunityIcons name="check-circle-outline" size={20} color="#6366F1"/>
                <Text style={styles.textoItem}> {item.nome} </Text>
            </View>
            <TouchableOpacity onPress={() => removerTarefa(item.id)} style={styles.botaoRemover}>
                <MaterialCommunityIcons name="trash-can-outline" size={22} collor="#EF4444"/>
            </TouchableOpacity>
        </View>
    )
    const removerTarefa = (id) => {
        // como alterou a lista de tarefas, a função useEffect vai ser executada automaticamente
        setTarefas( (prev) => prev.filter( (t) => t.id != id))
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                <MaterialCommunityIcons name="database-sync" size={32} color="#6366F1"/>
                <Text style={styles.titulo}> Tarefas persistentes </Text>
            </View>
            <View style={styles.entrada}>    
                <TextInput style={styles.caixaEntrada} placeholder="O que vamos guardar hoje?" value={tarefa} onChangeText={setTarefa}/>
                <TouchableOpacity style={styles.botao} onPress={adicionaTarefa}>
                    <MaterialCommunityIcons name="plus" size={28} color="#FFF"/>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={tarefas} 
                keyExtrator={(item) => item.id} 
                renderItem={renderItem}/>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#F8FAFC", padding: 20
    },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 20 
    },
    titulo: {
        fontSize: 22, fontWeight: "800", color: "#1E293B", marginLeft: 10
    },
    entrada: {
        flexDirection: 'row', marginBottom: 25
    },
    caixaEntrada: {
        flex: 1, height: 55, backgroundColor: "#FFF", borderRadius: 15, paddingHorizontal: 20,
        fontSize: 16, color: "#334155"
    },
    botao: {
        width: 55, height: 55, backgroundColor: "#6366F1", borderRadius: 15, marginLeft: 10, 
        justifyContent: "center", alignItems: "center"
    },
    itemLista: {
        flexDirection: "row", backgroundColor: "#FFF", padding: 15, borderRadius: 15, marginBottom: 12,
        alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#F1F5F9"
    },
    conteudoItem: {
        flexDirection: "row", alignItems: "center", flex: 1
    },
    textoItem: {
        fontSize: 16, color: "#475569", margin: 10
    },
    botaoRemover: {
        padding: 5,
    }
})