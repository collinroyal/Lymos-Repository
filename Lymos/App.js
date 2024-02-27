import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from "./src/screens/Home";
import ConductAnalysis from "./src/screens/ConductAnalysis";
import CreateCalibration from "./src/screens/CreateCalibration";
import ConductCalibration from "./src/screens/ConductCalibration";
import NewResults from "./src/screens/NewResults";
import ViewHistory from "./src/screens/ViewHistory";

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name = "Home" options = {{headerShown: false}}>
          {props => <Home navigation ={{...props}} />}
        </Stack.Screen>

        <Stack.Screen name = "ConductAnalysis" options = {{headerShown: false}}>
          {props => <ConductAnalysis navigation ={{...props}}/>}
        </Stack.Screen>

        <Stack.Screen name = "ConductCalibration" options = {{headerShown: false}}>
          {props => <ConductCalibration navigation ={{...props}}/>}
        </Stack.Screen>

        <Stack.Screen name = "CreateCalibration" options = {{headerShown: false}}>
          {props => <CreateCalibration navigation ={{...props}}/>}
        </Stack.Screen>

        <Stack.Screen name = "NewResults" options = {{headerShown: false}}>
          {props => <NewResults navigation ={{...props}}/>}
        </Stack.Screen>

        <Stack.Screen name = "ViewHistory" options = {{headerShown: true}}>
          {props => <ViewHistory navigation = {{...props}}/>}
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
