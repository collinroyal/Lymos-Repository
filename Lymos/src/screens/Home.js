import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home({navigation,GlobalState}) {
    const {CalibrationCurve, setCalibrationCurve} = GlobalState;
    

    
    const NavCalibration = () => {
        navigation.navigate("Create Calibration");
    }

    const NavAnalysis = () => {
        navigation.navigate("Conduct Analysis");
    }

    const NavHistory = () => {
        navigation.navigate("View History");
    }



    return (
        <View style= {styles.screen}>
            <View style= {styles.body}>
                <TouchableOpacity style= {styles.button} onPress = {() => NavCalibration()}>
                    <Text style ={styles.buttonText}>
                        Create Calibration Curve
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style= {styles.button} onPress = {() => NavAnalysis()}>
                    <Text style ={styles.buttonText}>
                        Perform Analysis
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style= {styles.button} onPress = {() => NavHistory()}>
                    <Text style ={styles.buttonText}>
                        Review Past Samples
                    </Text>
                </TouchableOpacity>
            </View>
            <Footer navigation = {navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 10,
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
    
    input:{
        padding: 20,
        paddingBottom: 10,
        paddingTop: 10,
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
    buttonText:{
        color: "white",
        fontWeight: "900",
    },
    button:{
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
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