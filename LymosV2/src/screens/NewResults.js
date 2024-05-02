import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

/**
 * NewResults component responsible for displaying new analysis results.
 * @param {object} props - The props passed to the component.
 * @param {object} props.GlobalState - Global state object containing various state variables.
 * @param {object} props.navigation - Navigation object for navigating between screens.
 * @returns {JSX.Element} Returns the JSX element for displaying new analysis results.
 */
export default function NewResults({GlobalState, navigation}){
    /**
     * Destructuring global state object to access state variables.
     */
    const {calibrationCurve,
    setCalibrationCurve,
    calibrationName, 
    setCalibrationName, 
    numSamples, 
    setNumSamples,
    Analysis,
    setToAnalyze,
    pastAnalysis,
    setPastAnalysis,
 } = GlobalState;

    /**
     * Destructuring Analysis object to access its properties.
     */
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