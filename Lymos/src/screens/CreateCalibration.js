import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CreateCalibration({navigation, GlobalState}){
    const {calibrationCurve, 
           setCalibrationCurve, 
           calibrationName, 
           setCalibrationName,
           numSamples,
           setNumSamples
        } = GlobalState

    const StartCalibration = () => {
        console.log(calibrationName)
        console.log(numSamples);
        navigation.navigate("Conduct Calibration");
    }

    return(
        <View style= {styles.screen}>
            <View style={styles.body}>
                <Text style= {styles.inputText}>Enter Calibration Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText ={(calibrationName) => setCalibrationName(calibrationName)}
                    value = {calibrationName}
                />
                <Text style= {styles.inputText}>Enter Number of Calibration Samples</Text>
                <TextInput
                    style={styles.input}
                    onChangeText ={setNumSamples}
                    value = {numSamples}
                    keyboardType='numeric'
                />
                <TouchableOpacity style= {styles.button} onPress= {() => StartCalibration()}>
                    <Text style= {styles.buttonText}> Select Sample Images </Text>
                </TouchableOpacity>
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
        justifyContent: "center",
    },
    task:{
        padding: 10,
        width: "95%",
        margin: 10,
        backgroundColor: "dodgerblue",
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

    input:{
        padding: 20,
        paddingBottom: 10,
        paddingTop: 5,
        width: "95%",
        margin: 10,
        marginTop: 30,
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
    inputText : {
        color: "black",
        fontWeight: "900",
        paddingLeft: 20,
        paddingTop: 20
    },
    buttonText:{
        color: "white",
        fontWeight: "900",
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
    }
})