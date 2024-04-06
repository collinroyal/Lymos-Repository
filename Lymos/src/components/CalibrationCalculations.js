//import { Image } from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import React from 'react';
import OpenCV  from "react-native-opencv";
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Canvas } from 'react-native-canvas';
//import {getColors} from 'react-native-image-colors';

const url = "http://127.0.0.1:3000/"

export const serverTest = async (imageURI) => {
  const result = await fetch(url+"test", {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify({imageURI}),
  });
  const data = await Response.json();
  console.log(data);
  return 0;
}



/* export const extractRGBData = async (imageURI) => {
  const cachedJpegDecoder = Jimp.decoders['image/jpeg'];
  Jimp.decoders['image/jpeg'] = (data, options) => {
    const userOptions = { maxMemoryUsageInMB: 1024 }; // Increase this value as needed
    return cachedJpegDecoder(data, userOptions);
  };


  console.log(imageURI);


  try {
    console.log('Begin image processing');
    const image = await jimp.read(imageURI);
    console.log('Image uploaded');

    image.resize(1024, jimp.AUTO);
    console.log('Image resized');

    const { r, g, b } = jimp.intSum(image) / (image.bitmap.width * image.bitmap.height);
    console.log(`Average RGB: ${r}, ${g}, ${b}`);
    return { r, g, b };
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
};
 */





/* export const extractRGBData = async (imageURI) => {
  try {
    // Manipulate the image to crop it to the specified portion
    const { uri } = await ImageManipulator.manipulateAsync(
      imageURI,
      [
        { crop: { originX: startX, originY: startY, width, height } }
      ],
      { format: 'png' }
    );

    console.log("yurrr");

    // Load the image data
    const imageData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

     // Create a new canvas element
     const canvas = new Canvas(width, height);
     const ctx = canvas.getContext('2d');
     const img = new Image();

    // Draw the image on the canvas
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, width, height).data;

        
      // Initialize variables to store total RGB values
      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;

      // Loop through the pixel data and calculate total RGB values
      for (let i = 0; i < imageData.length; i += 4) {
        totalRed += imageData[i];
        totalGreen += imageData[i + 1];
        totalBlue += imageData[i + 2];
      }

      // Calculate average RGB values
      const totalPixels = width * height;
      const avgRed = Math.round(totalRed / totalPixels);
      const avgGreen = Math.round(totalGreen / totalPixels);
      const avgBlue = Math.round(totalBlue / totalPixels);

      // Output the average RGB values
      console.log("Average RGB:", avgRed, avgGreen, avgBlue);
    };

    // Set the source of the image to the manipulated URI
    img.src = `data:image/png;base64,${imageData}`;
  } catch (error) {
    console.error('Error:', error);
  }
}; */

// Usage example:

/* export const extractRGBData = async (imageURI) => {
  var colorGrabber = require('react-native').NativeModules.colorGrabber

  colorGrabber.getColors(imageURI,(err,res) => {
    console.log(res);
  });
  return 0;
}

 */
/* export const extractRGBData = async (imageURI) => {
  try {
    const colors = await getColors(imageUrl, {
      cache: true,
      key: imageUrl,
    });
    const { average } = colors;
    console.log(average);
    return average;
  } catch (error) {
    console.error('Error fetching image colors:', error);
  }
}; */

 


/* export const extractRGBData = async (imageURI) => {
  console.log("starting analysis");
  const {uri} = await ImageManipulator.manipulateAsync(imageURI, [] );
  console.log("done with manipulate")
  const asset = await Asset.fromURI(uri);
  const {width, height} = asset;
  console.log(width, height);
  
  return 0;


}; */

/*
export const extractRGBData = async (imageURI) => {
  try {
    // Load the image from the URI
    const imageSource = { uri: imageURI };
    console.log(imageSource.uri);

    if (!OpenCV) {
      throw new Error('OpenCV not initialized');
    }

    const mat = await OpenCV.matFromImageSource(imageSource);
    

    // Calculate the average RGB value
    const avg = await OpenCV.meanValue(mat);

    // Release the OpenCV matrix to free memory
    mat.release();

    // Return the average RGB data as an object
    return {
      r: avg[0],
      g: avg[1],
      b: avg[2],
    };
  } catch (error) {
    console.error('Error getting average RGB:', error);
    return null;
  }
};
*/


/*
export const extractRGBData = async (imageURI) => {
  const colors = await getColors(imageURI, { cache: true });
  const totalPixels = colors.reduce((sum, color) => sum + color.population, 0);
  const averageRGB = colors.reduce(
    (sum, color) => {
      const { red, green, blue, population } = color;
      sum.r += (red * population) / totalPixels;
      sum.g += (green * population) / totalPixels;
      sum.b += (blue * population) / totalPixels;
      return sum;
    },
    { r: 0, g: 0, b: 0 }
  );

  return averageRGB;
};
*/