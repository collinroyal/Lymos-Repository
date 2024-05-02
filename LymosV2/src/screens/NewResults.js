import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NewResults({GlobalState, navigation}){
    const {calibrationCurve,  // var for storing calibration curve info
    setCalibrationCurve, // setter function
    calibrationName,  // stores calibration curve name
    setCalibrationName, // setter function for calibration curve
    numSamples, // 
    setNumSamples,
    Analysis,
    setToAnalyze,
    pastAnalysis,
    setPastAnalysis,
 } = GlobalState;
    const { uri, name, concentration } = Analysis;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sample Name: {name}</Text>
            <Text style={styles.text}>Concentration: {concentration}</Text>
            <Image source={{ uri: uri }} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    }
})