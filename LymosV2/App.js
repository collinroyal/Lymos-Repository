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
import ViewHistory from "./src/screens/ViewHistory";

const Stack = createNativeStackNavigator()
export default function App() {

  //global state management

  const [calibrationCurve, setCalibrationCurve] = useState(null); // global state var to hold calibration curve data
  const [calibrationName, setCalibrationName] = React.useState(""); // Global state var to hold calibration curve name
  const [numSamples, setNumSamples] = React.useState(""); // global state var to hold num samples for calibration curve

  const GlobalState = {
    calibrationCurve, setCalibrationCurve,
    calibrationName, setCalibrationName,
    numSamples, setNumSamples,
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name = "Home" options = {{headerShown: true}}>
          {props => <Home navigation ={props.navigation} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name = "Conduct Analysis" options = {{headerShown: true}}>
          {props => <ConductAnalysis navigation ={props.navigation} GlobalState={GlobalState}/>}
        </Stack.Screen>

        <Stack.Screen name = "Conduct Calibration" options = {{headerShown: true}}>
          {props => <ConductCalibration navigation ={props.navigation} GlobalState={GlobalState}/>}
        </Stack.Screen>

        <Stack.Screen name = "Create Calibration" options = {{headerShown: true}}>
          {props => <CreateCalibration navigation ={props.navigation} GlobalState={GlobalState}/>}
        </Stack.Screen>

        <Stack.Screen name = "New Results" options = {{headerShown: true}}>
          {props => <NewResults navigation ={props.navigation} GlobalState={GlobalState}/>}
        </Stack.Screen>

        <Stack.Screen name = "View History" options = {{headerShown: true}}>
          {props => <ViewHistory navigation ={props.navigation} GlobalState={GlobalState}/>}
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
