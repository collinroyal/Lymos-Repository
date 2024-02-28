import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ConductCalibration({navigation, GlobalState}){
    const [text, onChangeSampleConc] = React.useState("Enter Sample Concentration...")
    return (
        <View style= {styles.screen}>
            <Header/>
            <View style= {styles.body}>
                <TextInput
                    style={styles.input}
                    onChangeText ={(text) => onChangeSampleConc(text)}
                    value = {text}
                />
                <Icon name = "camera" size = {100} style = {styles.icon}/>
                <Text> Repeat and store IMG and conc vals for each sample</Text>
            </View>
            <Footer navigation = {navigation}/>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        flex:1,
        width: "100%",
        backgroundColor: "white"
    },
    body: {
        flex:8,
        width: "100%",
        backgroundColor: "white",
        alignItems: "center"
    },
    input:{
        padding: 10,
        paddingBottom: 10,
        paddingTop: 10,
        width: "95%",
        margin: 10,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    button:{
        alignItems: "center",
        padding: 10,
        width: "95%",
        margin: 10,
        backgroundColor: "black",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        padding: 100
    }
})