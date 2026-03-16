import AsyncStorage from "@react-native-async-storage/async-storage"
import {Text, View, StatusBar, TouchableOpacity, TextInput} from "react-native"
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useState, useEffect} from "react"
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
        })
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
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content"/>
            <View>
                <TextInput value={tarefa} onChangeText={setTarefa}/>
                <TouchableOpacity onPress={adicionaTarefa}>
                    <Text> Adiciona </Text>
                </TouchableOpacity>

                <Text> 
                    Lista de tarefas 
                    {
                        tarefas.length > 0 ?
                        tarefas.map ( (t, index) => `${t.nome}`) :
                        "Nenhuma tarefa salva"
                    } 
                </Text>
            </View>
        </SafeAreaProvider>
    )
}