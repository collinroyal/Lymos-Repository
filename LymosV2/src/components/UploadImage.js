import * as FileSystem from 'expo-file-system';
import axios from 'axios';
const url = "http://192.168.86.23:3000";




export const uploadImage = async (imageUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(imageUri, { size: true });
    const filename = imageUri.split("/").pop();
    const fileData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = new FormData();
    console.log("info:" , fileInfo);
    formData.append('image', {
        uri: imageUri,
        name: filename,
        type : "image/jpg"
  });
    console.log("formData: ", filename)
    //console.log(formData);

    const response = await axios.post(url + '/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
    if (response.ok) {
      console.log('Image uploaded successfully');
    } else {
      console.error('Error uploading image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};






/* export const uploadImage = async (imageUri) => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        const fileData = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
    
        const formData = new FormData();
        formData.append('image', fileData);
        formData.append('name', fileInfo.name);
        formData.append('type', fileInfo.type || 'image/jpeg');
    
        const response = await axios.post('http://192.168.86.23:3000/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }    
};
 */
/* export const uploadImage = async (imageUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    const fileData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(typeof fileData);

    const formData = new FormData();
    formData.append('image', fileData);
    formData.append('name', fileInfo.name);
    formData.append('type', fileInfo.type || 'image/jpeg');
    //console.log(formData);

    const result = await fetch(url + "/upload-image", {
      method: 'POST',
      body: formData,
    });
    console.log(result);

    if (result.ok) {
      console.log('Image uploaded successfully');
      return result.json();
    } else {
      console.error('Error uploading image: result not ok');
      throw new Error('Error uploading image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}; */