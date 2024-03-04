import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator"

import Header from '../components/Header';
import Footer from '../components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConductCalibration({navigation, GlobalState}){
    const {calibrationCurve, 
        setCalibrationCurve, 
        calibrationName, 
        setCalibrationName,
        numSamples,
        setNumSamples
     } = GlobalState;
    
     const [concentration, setSampleConc] = React.useState("");
     const [images, setImages] = useState([]);

    useEffect(() => {
        getPermissionAsync();
      }, []);

    const getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
          alert('Permission to access camera roll is required!');
        }
      };

     const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

          
          if (!result.cancelled) {
              const processedImage = await ImageManipulator.manipulateAsync(
                result.uri,
                [],
                {format: 'png', compress: 1}
              );

              const {uri, width, height } = processedImage;
              const rgbVals = await calculateRGB(processedImage);


              setImages([...images, { uri: result.assets[0].uri, concentration: concentration, rgb: rgbVals}]);
              setSampleConc(''); // Reset input for next entry
              
            }
            console.log(images)
     };


    return (
        <View style= {styles.screen}>
            <Text style={styles.header}>Calibration Curve: {calibrationName} </Text>
            <ScrollView style= {styles.body}>
                {images.length < parseInt(numSamples, 10) && (
                    <>
                <TextInput
                    placeholder= {`Enter Sample ${images.length + 1} Concentration`}
                    onChangeText={setSampleConc}
                    value={concentration}
                    keyboardType="numeric"
                    style= {styles.input}
                />
                <TouchableOpacity style= {styles.button} onPress={pickImage}> 
                        <Text style={styles.buttonText}> Pick an Image </Text>
                </TouchableOpacity>        
                </>
            )}
            {images.map((image, index) => (
                <View key = {index} style= {styles.imageContainer}>
                    <Image source = {{uri: image.uri}} style={styles.image} />
                    <Text style = {styles.inputText}> Concentration: {image.concentration} </Text>
                </View>
            ))}
            
        </ScrollView>
        {images.length === parseInt(numSamples, 10) && (
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => console.log("move to computations")}>
                    <Text style={styles.buttonText}>Proceed to Next Screen</Text>
                </TouchableOpacity>
            )}
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
        color: "Black",
        width: "100%",
        fontSize: "20",
        fontWeight: "900",
        textAlign: "center",
        padding: 10
    },
    body: {
        flex:9,
        width: "100%",
        backgroundColor: "white",
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
    inputText:{
        color: "black",
        fontWeight: "900",
        paddingLeft: 10,
        paddingTop: 20,

    },
    button:{
        alignItems: "center",
        padding: 10,
        width: "95%",
        marginTop: 20,
        marginBottom: 40,
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
    buttonText:{
        color: "white",
        fontWeight: "900",
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 150
    },
    imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 20,
      },
      image: {
        width: 200, // Set your desired width
        height: 200, // Set your desired height
        resizeMode: 'contain', // or 'cover', depending on your needs
      },
})