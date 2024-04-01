import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image } from 'react-konva';

import { ImageManipulator } from 'expo-image-manipulator';

const extractRGBData = (imageURI) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ImageManipulator.manipulateAsync(imageURI, [], { format: 'png' });
      const { uri } = result;
      const { width, height } = result;

      const response = await fetch(uri);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          context.drawImage(img, 0, 0, width, height);
          const imageData = context.getImageData(0, 0, width, height);
          const pixels = imageData.data;

          let totalR = 0, totalG = 0, totalB = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            totalR += pixels[i];
            totalG += pixels[i + 1];
            totalB += pixels[i + 2];
          }
          const avgR = totalR / (width * height);
          const avgG = totalG / (width * height);
          const avgB = totalB / (width * height);

          resolve({ avgR, avgG, avgB });
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      reject(error);
    }
  });
};
