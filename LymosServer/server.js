const express = require('express');
const cors = require('cors');
const { calcAVGRGB } =  require('./imageProcessing');
//const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer correctly
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const sharp = require('sharp');


const MAX_REQUEST_SIZE = '100mb';
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 10MB (adjust as needed)
const uploadDir = path.join(__dirname, 'uploads');


// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const app = express();


app.use(cors());




app.get('/', (req, res)=> {
    res.send("Hello,Collin");
});

app.post('/test', async (req, res)=> {
    console.log('Request body:', req.body);
    const {uri} = req.body;
    console.log('Received imageURI:', req.body);
    res.json(req.body);
});



app.post('/upload-image', (req, res) => {
    const form = new formidable.IncomingForm({
        maxFieldsSize: 100 *1024*1024
    });

    console.log("starting route");
   
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error parsing form' });
      }
      //console.log('Form Fields:', fields);
      //console.log(fields);
      //console.log(files);

  
      const imageFile = files.image;
      //console.log(imageFile);
  
      if (!imageFile) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      console.log("image file found");
  
      //const uploadDir = path.join(__dirname, 'uploads');
      /* if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
       */
      console.log(imageFile[0].originalFilename);
  
      //const fileExtension = path.extname(imageFile[0].originalFilename);
      //const newFilename = `${Date.now()}${fileExtension}`;
      //const filePath = path.join(uploadDir, newFilename);
     
      //console.log(imageFile[0].filepath);
      //console.log(filePath);
      try {
        // Copy the uploaded image file to the server
       /*  await fs.promises.copyFile(imageFile[0].filepath, filePath);
        console.log("fp:",filePath);
 */
        // Read the image using sharp
        const image = sharp(imageFile[0].filepath);
        console.log("check 1");

        // Get the image metadata
        const metadata = await image.metadata();
        console.log("check 2");

        // Calculate the average RGB values
        const {data} = await image.raw().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        console.log("check 3");
        console.log(data);
        console.log("metadata: ", metadata)
        const { width, height } = metadata;
        let sumR = 0, sumG = 0, sumB = 0;
        for (let i = 0; i < width * height * 4; i += 4) {
            sumR += data[i];
            sumG += data[i + 1];
            sumB += data[i + 2];
        }
        const avgR = sumR / (width * height);
        const avgG = sumG / (width * height);
        const avgB = sumB / (width * height);
        console.log(avgR);

        // Send the response with the average RGB values
        res.json({
            message: 'Image uploaded successfully',
            averageRGB: { r: avgR, g: avgG, b: avgB }
        });
    } catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ error: 'Error processing image' });
    }
});

     
    });
  


app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });