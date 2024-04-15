import * as FileSystem from 'expo-file-system';
import axios from 'axios';

//const url = "http://10.197.32.169:3000";
const url = "http://192.168.86.23:3000";




export const uploadImage = async (imageUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(imageUri, { size: true });
    const filename = imageUri.split("/").pop();
    const fileData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = new FormData();
    //console.log("info:" , fileInfo);
    formData.append('image', {
        uri: imageUri,
        name: filename,
        type : "image/jpg"
  });
    //console.log("formData: ", filename)
    //console.log(formData);

    const response = await axios.post(url + '/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      //console.log("response: ", response.data.averageRGB);
    if (response.request.status === 200) {
      console.log('Image uploaded successfully');
      return response.data;
    } else {
      console.error('Error uploading image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};







