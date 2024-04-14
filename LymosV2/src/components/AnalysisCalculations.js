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

const calcDist = (sample, point) => {
  console.log("performing dist calc");
  console.log(point);
  console.log(sample);

  const L_dist = sample.L - point.L;


  const L_dist_sqrd = L_dist * L_dist;

  const a_dist = sample.a - point.a;
  const a_dist_sqrd = a_dist * a_dist;


  const b_dist = sample.b - point.b;
  const b_dist_sqrd = b_dist * b_dist;


  const sum = L_dist_sqrd + a_dist_sqrd + b_dist_sqrd;
  const dist = Math.sqrt(sum);
  return dist;
}

const calcBigD = (sample, pn, adjPoint) => {
  const dxy = calcDist(pn, adjPoint);
  const dxy_2 = dxy * dxy;

  const dxz = calcDist(pn,sample);
  const dxz_2 = dxz * dxz;

  const dyz = calcDist(adjPoint, sample);
  const dyz_2 = dyz * dyz;

  const num = dxy_2 + dxz_2 - dyz_2;
  const denom = 2* dxy;

  const D = num/denom;

  return D;

}

export const estimateConc = (calibrationCurve,sample ) => {
  console.log("calibration curve: ", calibrationCurve);
  console.log("sample: ", sample);
  console.log("analyzing ...");
  let closestPoint = null;
  let closestAdjPoint = null;
  let minDistance = Number.POSITIVE_INFINITY;
  let minAdjDistance = Number.POSITIVE_INFINITY;
  let index= 0;

  for (let i =0; i< calibrationCurve.length; i++){
    const point = calibrationCurve[i];

    console.log(point);
    const distance = calcDist(sample.averageCIELAB, point.CIELAB);
    console.log("current point: ", point);

    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = point;
      index = i;
    }
  
  }
  console.log("closest point: ", closestPoint);
  console.log(index);

  for (let i = 0; i< calibrationCurve.length; i++){ // determine the closest point to test point that is adjacent to Pn (point closest to test point)
    if (i != index){
      const adjPoint = calibrationCurve[i];
      console.log("Check 1");
      const adjDistance = calcDist(sample.averageCIELAB, adjPoint.CIELAB);
      console.log(adjDistance);
  
      if (adjDistance !== 0 && adjDistance < minAdjDistance){
        minAdjDistance = adjDistance;
        closestAdjPoint = adjPoint; 
        console.log("adjc: ", closestAdjPoint);
    }
    }

}
  console.log("closest adj: ", closestAdjPoint);

  const D = calcBigD(sample.averageCIELAB, closestPoint.CIELAB, closestAdjPoint.CIELAB);
  console.log("big D: ", D);

  const C_adj = closestAdjPoint.concentration;
  const C_pn = closestPoint.concentration;
  const dxy = calcDist(closestPoint.CIELAB, closestAdjPoint.CIELAB);





  const C_num = (C_adj - C_pn) * D;
  console.log("C_num" , C_num);

  console.log(typeof C_pn);

  const C_sample = parseInt(C_pn) + (C_num/dxy);

  console.log(C_num/dxy);

  console.log(C_sample);


  console.log("concentration of sample: ", C_sample);

  return C_sample
}

/* export const serverTest = async (imageURI) => {
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

}; */