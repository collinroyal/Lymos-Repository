/**
 * Module dependencies.
 */
const jimp = require("jimp");
const fs = require('fs');
const path = require('path');

/**
 * Converts a file URI to a base64 string.
 * @param {string} uri - The file URI.
 * @returns {Promise<string>} Returns a Promise that resolves to a base64 string.
 */
const URItoBase64 = async (uri) =>{
    const filePath = path.join(__dirname, uri);
    const fileBuffer = fs.readFileSync(filePath);
    const base64String = fileBuffer.toString('base64');
    return base64String;
}

/**
 * Calculates the average RGB values of an image.
 * @param {string} URI - The URI of the image file.
 * @returns {Promise<object>} Returns a Promise that resolves to an object containing the average RGB values.
 * @throws {Error} Throws an error if base64ImageData is not provided or if there is an error processing the image.
 */
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
