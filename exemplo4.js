import AsyncStorage from "react-native-async-storage/async-storage"

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
    })([])

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content"/>
            <View>
                <Text> {tarefas} </Text>
            </View>
        </SafeAreaProvider>
    )
}