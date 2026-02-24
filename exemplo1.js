import {SafeAreaProvider} from 'react-native-safe-area-context'
export default function App(){
    return (
        <SafeAreaProvider>
            <Text> Boas-Vindas </Text>
            <Text> Digite seu nome e clique em "Saudar" </Text>
            <View>
                <Text> Seu nome </Text>
                <TextInput placeholder="Ex: Maria"/>
                <TouchableOpacity>
                    <Text> Saudar </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider>
    )
}