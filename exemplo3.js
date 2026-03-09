import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, View, TextInput, TouchableOpacity, StatusBar, FlatList, StyleSheet} from 'react-native'
import {useState} from 'react'
export default function App(){
    const [tarefa, setTarefa] = useState('') // string
    const [tarefas, setTarefas] = useState([]) // vetor
    const adicionaTarefa = () => {
        if (tarefa.trim().length == 0) return
        // cria nova tarefa
        const nova = {
            id: Date.now().toString(),
            titulo: tarefa
        }
        // adiciona a nova tarefa no vetor
        // ... significa o spread, espalha elementos do vetor
        setTarefas([...tarefas, nova])
        // limpa a string tarefa
        setTarefa('')
    }
    // desenha cada item
    const renderItem = ({item}) => (
        <View style={styles.item}> 
            <Text style={styles.textoItem}> {item.titulo} </Text>
            <TouchableOpacity 
                onPress={ () => removerTarefa(item.id)}
                style={styles.botaoRemover}>
                <Text style={styles.textoBotaoRemover}> Apagar </Text>
            </TouchableOpacity>
        </View>
    )
    // remove tarefa
    const removerTarefa = (id) => {
        // obtem apenas as tarefas com id diferente do procurado
        // define as novas tarefas com essa lista
        setTarefas(
            tarefas.filter( (item) => item.id != id)
        )
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <Text style={styles.titulo}> Minhas Tarefas </Text>
            <View style={styles.areaInput}>
                <TextInput 
                    style={styles.input}
                    value={tarefa} 
                    onChangeText={setTarefa} placeholder="O que precisa ser feito?"
                    />
                <TouchableOpacity style = {styles.botaoAdd} onPress={adicionaTarefa}>
                    <Text style={styles.textoBotaoAdd}> + </Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={tarefas}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.vazioContainer}>
                        <Text style={styles.vazioTexto}> Sua lista está vazia </Text>
                        <Text style={styles.vazioTexto}> Adicione tarefas </Text>
                    </View>
                }/>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 30, backgroundColor: "#F3F4F6",
    },
    titulo: {
        fontSize: 28, fontWeight: "bold", marginVertical: 20, color: "#1F2937", textAlign: "left", 
    },
    areaInput: {
        flexDirection: "row", alignItems: "center", marginBottom: 25
    },
    input: {
        flex: 1, height: 50, backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 15,
        fontSize: 16, borderWidth: 1, borderColor: "#E5E7EB"
    },
    botaoAdd: {
        width: 50, height: 50, marginLeft: 10, backgroundColor: "#4F46E5", borderRadius: 12,
        alignItems: "center", justifyContent: "center", elevation: 3
    },
    textoBotaoAdd: {
        color: "#fff", fontSize: 24, fontWeight: "bold"
    },
    vazioContainer: {
        marginTop: 50, alignItems: "center"
    },
    vazioTexto: {
        fontSize: 18, color: "#9CA3AF", fontWeight: "bold"
    },
    item: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        padding: 16, backgroundColor: "#fff", marginBottom: 10, borderRadius: 12, 
        borderLeftWidth: 5, borderLeftColor: "#4F46E5"
    },
    textoItem: {
        fontSize: 16, color: "#374151", flex: 1
    },
    botaoRemover: {
        paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#FEE2E2", borderRadius: 8
    },
    textoBotaoRemover: {
        color: "#DC2626", fontSize: 12, fontWeight: "bold"
    }
})