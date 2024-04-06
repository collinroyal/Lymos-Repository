import { StyleSheet, View, Text } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";

export default function Footer({navigation}) {
    return (
        <View style= {styles.footer}>
            <Icon name = "home" size={30} onPress={()=> navigation.navigate('Home')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        zIndex: 5
    },
    text: {
        fontSize: 18,
        fontWeight: '900',
    }
})