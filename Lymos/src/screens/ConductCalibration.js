import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator"
import { extractRGBData } from '../components/CalibrationCalculations';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConductCalibration({navigation, GlobalState}){ // Calibration page/ function call
    const {calibrationCurve,  // var for storing calibration curve info
        setCalibrationCurve, // setter function
        calibrationName,  // stores calibration curve name
        setCalibrationName, // setter function for calibration curve
        numSamples, // 
        setNumSamples
     } = GlobalState; // Destructuring global state object
    
     const [concentration, setSampleConc] = React.useState(""); // creating state function for sample concentration vals
     const [images, setImages] = useState([]); // state function for image array

    useEffect(() => { // calling get permissions function to request access to user camera roll
        getPermissionAsync();
      }, []);

    const getPermissionAsync = async () => { // getting access to camera roll
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
          alert('Permission to access camera roll is required!');
        }
      };


     const pickImage = async () => { // function for selecting image, and storing image data in state variable
        
        let result = await ImagePicker.launchImageLibraryAsync({ // calling choosing function
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

          
        if (!result.cancelled) { // if image is selected (not cancelled) process the image
            const RGBavg = await extractRGBData(result.assets[0].uri);
            setImages([...images, { uri: result.assets[0].uri, concentration: concentration, rgb: RGBavg}]);
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
        color: "black",
        width: "100%",
        fontSize: 20,
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