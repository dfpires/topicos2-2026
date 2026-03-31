import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

function FormScreen({navigation}){
        const [nome, setNome] = useState("")
        const [email, setEmail] = useState("")
        const enviar = () => {
            const no = nome.trim();
            const em = email.trim();
            if (!no || !em) return; // sai da função
            // navegação para outra página
            navigation.navigate("Detalhes", {nome: no, email: em})
        }
        return (
            <View style={styles.container}>
                <MaterialCommunityIcons 
                    name="account-edit"
                    size={80}
                    color="#6366F1"
                    style={styles.iconHeader}
                    />
                <Text style={styles.titulo}> Cadastro Rápido </Text>
                <View style={styles.card}>
                    <Text style={styles.label}> Nome completo </Text>
                    <TextInput style={styles.input} value={nome} onChangeText={setNome}/>
                    <Text style={styles.label}> E-mail </Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
                    <TouchableOpacity style={styles.botao} onPress={enviar}>
                        <Text style={styles.textoBotao}> Avançar </Text>
                        <MaterialCommunityIcons name="arrow-right" size={20}
                            color="#FFF"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
}
function DetailScreen({route, navigation}){
    // recupera os dados passados pra ele
    const {nome, email} = route.params ?? {nome: "N/A", email: "N/A"}
    return (
        <View>
            <Text> Confirme seus dados </Text>
            <View>
                <Text> Nome: </Text> <Text> {nome} </Text>
                <Text> E-Mail: </Text> <Text> {email} </Text>
            </View>
        </View>
    )
}
export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Form">
                <Stack.Screen name="Form" component={FormScreen} options={{title:"Início"}}/>
                <Stack.Screen name="Detalhes" component={DetailScreen} options={{title:"Resumo"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
        
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F1F5F9", padding: 20 },
    iconHeader: { alignSelf: 'center', marginTop: 20 },
    titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: "#1E293B" },
    card: { backgroundColor: "#FFF", borderRadius: 20, padding: 20, elevation: 5, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10 },
    label: { fontSize: 12, fontWeight: "bold", color: "#6366F1", marginBottom: 5, textTransform: 'uppercase' },
    input: { backgroundColor: "#F8FAFC", borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: "#E2E8F0" },
    botao: { backgroundColor: "#6366F1", borderRadius: 12, padding: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 16, marginHorizontal: 10 },
}
)