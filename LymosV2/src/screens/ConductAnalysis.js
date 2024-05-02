import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../components/LymosClient';
import { estimateConc } from '../components/AnalysisCalculations';
import Footer from '../components/Footer';

export default function ConductAnalysis({navigation, GlobalState }){

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
 } = GlobalState; // Destructuring global state object

    const [text, onChangeSampleName] = React.useState(""); // may need to consider global state usage
    //const [number, onChangeNumSamples] = React.useState("Enter Num Samples");
    const [sampleData, setSampleData] = useState(null); // State to store sample data

    const ShowResults = () => {
        navigation.navigate("NewResults");
    }

    const handleSample = async () => {
        //console.log("calibration curve" , calibrationCurve);
        let result = await ImagePicker.launchImageLibraryAsync({ // calling choosing function
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

          
        if (!result.cancelled) { // if image is selected (not cancelled) process the image
            //console.log(result);
            //console.log(typeof result.assets[0].uri);

            const sample = await uploadImage(result.assets[0].uri);
            console.log("test data (sample):", sample);
            const concentration = await estimateConc(calibrationCurve,sample);
            setPastAnalysis(Analysis);
            const sampleInfo = { uri: result.assets[0].uri, name: text, concentration: concentration };
            setSampleData(sampleInfo);
            console.log("Sample data:", sampleInfo);
            setToAnalyze({ uri: result.assets[0].uri, concentration: concentration , rgb: sample.averageRGB, CIELAB: sample.averageCIELAB, name: text});
            console.log("navigate");
            navigation.navigate('New Results');
        }
        //console.log(Analysis);
    }
    console.log(sampleData)

    return(
        <View style= {styles.screen}>
            <View style={styles.body}>
                <TextInput
                    placeholder='Enter Sample Name ...'
                    style={styles.input}
                    onChangeText ={(text) => onChangeSampleName(text)}
                    value = {text}
                />
                <TouchableOpacity style= {styles.button} onPress= {() => handleSample()}>
                    <Text style= {styles.buttonText}> Upload Sample </Text>
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
        alignItems: "center"
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
        color: "white"
    }
})