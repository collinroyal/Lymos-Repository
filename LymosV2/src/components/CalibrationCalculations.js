//import { Image } from "react-native";
/* import * as ImageManipulator from 'expo-image-manipulator';
import React from 'react';
import OpenCV  from "react-native-opencv";
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Canvas } from 'react-native-canvas'; */
//import {getColors} from 'react-native-image-colors';

import * as FileSystem from 'expo-file-system';
import { EncodingType } from 'expo-file-system';

const url = "http://192.168.86.23:3000"


export const serverTest = async (imageURI) => {
  //const base64 = await URItoBase64(imageURI);
  try{
    //console.log('Sending base64:', base64);
    console.log("sending URI: ", imageURI);
    const result = await fetch(url + "/process-image", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({imageURI }),
    });
    const data = await result.json();
    console.log("server returned:");
    console.log(data);
    return data;
  } catch (error) {
    console.error("error accessing server", error);
  }

};