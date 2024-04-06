const jimp = require("jimp");
const fs = require('fs');
const path = require('path');

const URItoBase64 = async (uri) =>{
    const filePath = path.join(__dirname, uri);
    const fileBuffer = fs.readFileSync(filePath);
    const base64String = fileBuffer.toString('base64');
    return base64String;
}


const calcAVGRGB = async (URI) => {
    const base64ImageData = await URItoBase64(URI);
    try {
      if (!base64ImageData) {
        throw new Error('base64ImageData is required');
      }
  
      const imageBuffer = Buffer.from(base64ImageData, 'base64');
      const image = await jimp.read(imageBuffer);
  
      // Calculate the average RGB values
      const { r, g, b } = jimp.intSum(image) / (image.bitmap.width * image.bitmap.height);
  
      return { r, g, b };
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  };
  

module.exports = {
    calcAVGRGB,
};