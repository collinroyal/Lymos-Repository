import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from "./src/screens/Home";
import ConductAnalysis from "./src/screens/ConductAnalysis";
import CreateCalibration from "./src/screens/CreateCalibration";
import ConductCalibration from "./src/screens/ConductCalibration.js";
import NewResults from "./src/screens/NewResults";


const Stack = createNativeStackNavigator()

/**
 * App component for the application.
 * @returns {JSX.Element} Returns the JSX element for the entire application.
 */

export default function App() {

  /**
   * Global state management for the application.
   */

  const [calibrationCurve, setCalibrationCurve] = useState([]); // Holds calibration curve data
  const [calibrationName, setCalibrationName] = React.useState(""); // Holds calibration curve name
  const [numSamples, setNumSamples] = React.useState(""); // Holds number of samples for calibration curve
  const [Analysis, setToAnalyze] = React.useState({}); // Holds analysis data
  const [pastAnalysis, setPastAnalysis] = React.useState(); // Holds past analysis data
  
  
  // Global state object to be passed as props
  const GlobalState = {
    calibrationCurve, setCalibrationCurve,
    calibrationName, setCalibrationName,
    numSamples, setNumSamples,
    Analysis, setToAnalyze,
    pastAnalysis, setPastAnalysis
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Home screen */}
        <Stack.Screen name = "Home" options = {{headerShown: true}}>
          {props => <Home navigation ={props.navigation} GlobalState={GlobalState} />}
        </Stack.Screen>

        {/* Conduct Analysis screen */}
        <Stack.Screen name = "Conduct Analysis" options = {{headerShown: true}}>
          {props => <ConductAnalysis navigation ={props.navigation} GlobalState={GlobalState}/>}
        </Stack.Screen>

        {/* Conduct Calibration screen */}
        <Stack.Screen name = "Conduct Calibration" options = {{headerShown: true}}>
          {props => <ConductCalibration navigation ={props.navigation} GlobalState={GlobalState}/>}
        </Stack.Screen>

        {/* Create Calibration screen */}
        <Stack.Screen name = "Create Calibration" options = {{headerShown: true}}>
          {props => <CreateCalibration navigation ={props.navigation} GlobalState={GlobalState}/>}
        </Stack.Screen>

        {/* New Results screen */}
        <Stack.Screen name = "New Results" options = {{headerShown: true}}>
          {props => <NewResults navigation ={props.navigation} GlobalState={GlobalState}/>}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
