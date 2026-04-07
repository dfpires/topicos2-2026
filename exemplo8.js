import {NavigationContainer} from "@react-navigation/native"
import {createDrawerNavigator} from "@react-navigation/drawer"
import {View, Text, StyleSheet} from "react-native"
function HomeScreen(){
    return (
        <View style={styles.container}>
            <Text> 🏠 Tela de Home </Text>
        </View>
    )
}
function ProfileScreen(){
    return (
        <View style={styles.container}>
            <Text> 🥸 Tela de Perfil </Text>
        </View>
    )
}
function SettingScreen(){
    return (
        <View style={styles.container}>
            <Text> ⚙️ Tela de configuração </Text>
        </View>
    )
}
// ------------------------------ Drawer --------------------------------//
const Drawer = createDrawerNavigator();
export default function App(){
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Inicio">
                <Drawer.Screen name="Inicio" component={HomeScreen} />
                <Drawer.Screen name="Perfil" component={ProfileScreen} />
                <Drawer.Screen name="Configurações" component={SettingScreen} />
            </Drawer.Navigator>
        </NavigationContainer>       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", /* vertical */
        alignItems: "center", /* horizontal */
        
    }
})