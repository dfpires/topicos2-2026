import AsyncStorage from "@react-native-async-storage/async-storage"
import {Text, View, StatusBar, TouchableOpacity} from "react-native"
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
            }
            catch (e){
                alert.alert("Erro", "Não foi possível carregas os dados")
            }
        })()
    }, [])

    const adicionaTarefa = () => {
        const nome = tarefa
        const nova = {
            id: Date.now().toString(),
            nome: nome
        }
        setTarefas([...tarefas], nova)
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
                        tarefas.map ( (t, index) => `${t}`) :
                        "Nenhuma tarefa salva"
                    } 
                </Text>
            </View>
        </SafeAreaProvider>
    )
}