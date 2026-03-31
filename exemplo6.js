
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, ActivityIndicator, View, FlatList, StyleSheet} from 'react-native'
import {useState, useEffect} from 'react'

export default function App(){
    // status de devolução da API
    const [carregando, setCarregando] = useState(true)
    // vetor de usuários
    const [usuarios, setUsuarios] = useState([])
    
    // vai ser chamada quando carregar a aplicação
    useEffect( () => {
        carregarUsuarios()
    }, [])
    // função que consome a api https://jsonplaceholder.typicode.com/users
    const carregarUsuarios = async () => {
        try {
            // 1. faz a requisição
            const resposta = await fetch('https://jsonplaceholder.typicode.com/users')
            // 2. converte a resposta para JSON
            const dados = await resposta.json()
            // 3. salva na variável de estado
            setUsuarios(dados)
        }
        catch(erro){
            console.error("Erro ao carregar", erro)
            alert("Não foi possível carregar os dados")
        }
        finally {
            // 4. desativa o ícone de carregamento
            setCarregando(false)
        }
    }
    const renderItem = ({item}) => (
        <View style={styles.card}>
            <Text> {item.name} </Text>
            <Text> {item.email} </Text>
            <Text> 📌{item.address.city} </Text>
        </View>
    )
    return (
        <SafeAreaProvider>
            <Text> Lista de Usuários da API </Text>
            { /* Exibe o ícone de carregamento enquanto busca os dados */
                carregando ? (
                    <View>
                        <ActivityIndicator size="large" color="#6366F1"/>
                        <Text> Buscando dados ... </Text>
                    </View>
                ) : (
                    <FlatList 
                        data={usuarios} 
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}/> 
                )
            }
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF', padding: 15, borderRadius: 12,
        marginBottom: 10, elevation: 2, shadowColor: '#000'
    }
})