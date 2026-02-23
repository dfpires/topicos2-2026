import {Text, StyleSheet, View, Button} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default function App(){
    return (
        <SafeAreaProvider style={styles.container}>
              <Text> Olá, React Native </Text> 
              <View style={styles.containerBotao}>
                <Button title="Clique aqui"/>
              </View>          
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    containerBotao: {
        width: 200,
        marginTop: 30,
    }
})