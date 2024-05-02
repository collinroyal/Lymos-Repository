/**
 * Module dependencies.
 */
const express = require('express');
const cors = require('cors');
const { calcAVGRGB } =  require('./imageProcessing');
const multer = require('multer'); // Import multer correctly
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const sharp = require('sharp');
const convert = require("color-convert");

/**
 * Constants
 */
const MAX_REQUEST_SIZE = '100mb';
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 10MB (adjust as needed)
const uploadDir = path.join(__dirname, 'uploads');

/**
 * Create the uploads directory if it doesn't exist
 */
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/**
 * Create express app
 */
const app = express();

/**
 * Middleware
 */
app.use(cors());

/**
 * Routes
 */

/**
 * Default route to test server connection
 */
app.get('/', (req, res)=> {
    res.send("Hello, Collin");
});

/**
 * Route to handle test POST request
 */
app.post('/test', async (req, res)=> {
    console.log('Request body:', req.body);
    const {uri} = req.body;
    console.log('Received imageURI:', req.body);
    res.json(req.body);
});

/**
 * Route to handle image upload
 */
app.post('/upload-image', (req, res) => {
    const form = new formidable.IncomingForm({
        maxFieldsSize: 100 * 1024 * 1024
    });

    console.log("Starting route");
   
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).json({ error: 'Error parsing form' });
        }

        const imageFile = files.image;
  
        if (!imageFile) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        console.log("Image file found");
  
        try {
            // Read the image using sharp
            const image = sharp(imageFile[0].filepath);

            // Get the image metadata
            const metadata = await image.metadata();

            // Calculate the average RGB values
            const { data } = await image.raw().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
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

            const lab = convert.rgb.lab([avgR, avgG, avgB]);

            // Send the response with the average RGB values
            res.json({
                message: 'Image uploaded successfully',
                averageRGB: { r: avgR, g: avgG, b: avgB },
                averageCIELAB: { L: lab[0], a: lab[1], b: lab[2] }
            });
        } catch (error) {
            console.error('Error processing image:', error);
            return res.status(500).json({ error: 'Error processing image' });
        }
    });
});

/**
 * Start the server
 */
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
