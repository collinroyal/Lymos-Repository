import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { uploadImage } from '../components/LymosClient';

/**
 * ConductCalibration component responsible for conducting calibration.
 * @param {object} props - The props passed to the component.
 * @param {object} props.navigation - Navigation object for navigating between screens.
 * @param {object} props.GlobalState - Global state object containing various state variables.
 * @returns {JSX.Element} Returns the JSX element for conducting calibration.
 */
export default function ConductCalibration({navigation, GlobalState}){

    /**
     * Destructuring global state object to access state variables.
     */
    const {calibrationCurve, 
        setCalibrationCurve, 
        calibrationName, 
        setCalibrationName, 
        numSamples,
        setNumSamples
     } = GlobalState;


     /**
     * Function to navigate to the Home screen.
     */
     const NavHome = () => {
        navigation.navigate("Home");
     }

     /**
      * Function to navigate to the Conduct Analysis screen.
      */
     const NavAnalysis = () => {
        navigation.navigate("Conduct Analysis");
     }
     
     /**
      * State variable to store sample concentration values.
      */
     const [concentration, setSampleConc] = React.useState("");

     /**
      * State variable to store image array.
      */
     const [images, setImages] = useState([]);
    
     /**
     * useEffect hook to request permission to access the camera roll.
     */
    useEffect(() => { 
        getPermissionAsync();
      }, []);

    /**
     * Function to request permission to access the camera roll.
     */
    const getPermissionAsync = async () => { 
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
          alert('Permission to access camera roll is required!');
        }
      };

    /**
      * Function to select an image and store its data in the state variable.
      */
    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

          
        if (!result.cancelled) {
            //console.log(result);
            //console.log(typeof result.assets[0].uri);

            const data = await uploadImage(result.assets[0].uri);
            //console.log("returned from test:", data);
            setCalibrationCurve([...calibrationCurve, { uri: result.assets[0].uri, concentration: concentration, rgb: data.averageRGB, CIELAB: data.averageCIELAB}]);
            setSampleConc('');
            
        }
        //console.log(calibrationCurve);
     };


    return (
        <View style= {styles.screen}>
            <Text style={styles.header}>Calibration Curve: {calibrationName} </Text>
            <ScrollView style= {styles.body}>
                {calibrationCurve.length < parseInt(numSamples, 10) && (
                    <>
                <TextInput
                    placeholder= {`Enter Sample ${calibrationCurve.length + 1} Concentration`}
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
            {calibrationCurve.map((calibrationCurve, index) => (
                <View key = {index} style= {styles.imageContainer}>
                    <Image source = {{uri: calibrationCurve.uri}} style={styles.image} />
                    <Text style = {styles.inputText}> Concentration: {calibrationCurve.concentration} </Text>
                </View>
            ))}
            
        </ScrollView>
        {calibrationCurve.length === parseInt(numSamples, 10) && (
            <View>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => NavAnalysis()}>
                    <Text style={styles.buttonText}>Conduct Sample Analysis</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button} 
                    onPress={() => NavHome()}>
                    <Text style={styles.buttonText}> Return to Home Screen</Text>
                </TouchableOpacity>
            </View>
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
});