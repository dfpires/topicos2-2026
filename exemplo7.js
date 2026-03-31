import {View, Text} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
export default function App(){
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons 
                name="account-edit"
                size={80}
                color="#6366F1"
                style={styles.titulo}/>
            <Text> Cadastro Rápido </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F1F5F9", padding: 20 },
    titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: "#1E293B" },
}
)