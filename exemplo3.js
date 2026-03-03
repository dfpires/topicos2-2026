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
        <View> 
            <Text> {item.titulo} </Text>
            <TouchableOpacity 
                onPress={ () => removerTarefa(item.id)}>
                <Text> Apagar </Text>
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
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content"/>
            <Text> Minhas Tarefas </Text>
            <View>
                <TextInput 
                    value={tarefa} 
                    onChangeText={setTarefa} placeholder="O que precisa ser feito?"
                    />
                <TouchableOpacity onPress={adicionaTarefa}>
                    <Text> + </Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={tarefas}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View>
                        <Text> Sua lista está vazia </Text>
                        <Text> Adicione tarefas </Text>
                    </View>
                }/>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({

})