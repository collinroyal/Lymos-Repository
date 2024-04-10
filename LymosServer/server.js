const express = require('express');
const cors = require('cors');
const { calcAVGRGB } =  require('./imageProcessing');
//const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer correctly
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');



const MAX_REQUEST_SIZE = '100mb';
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 10MB (adjust as needed)
const uploadDir = path.join(__dirname, 'uploads');


// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* const upload = multer({ 
    dest: path.join(__dirname, 'uploads'),
    limits: {
        fieldSize: MAX_FILE_SIZE,
    },
}); // Specify the upload directory
 */
const app = express();

// Middleware for parsing request bodies
//app.use(express.json());
app.use(cors());
//app.use(bodyParser.json({ limit: MAX_REQUEST_SIZE }));


//console.log(upload);


app.get('/', (req, res)=> {
    res.send("Hello,Collin");
});

app.post('/test', async (req, res)=> {
    console.log('Request body:', req.body);
    const {uri} = req.body;
    console.log('Received imageURI:', req.body);
    res.json(req.body);
});

app.post('/process-image', async (req, res) => {

    try {
        console.log(req.body);
        const {imageURI} = req.body;
        console.log("server received:" , imageURI);
        const RBGdata = calcAVGRGB(imageURI);
        res.json({RBGdata});

    } catch (error) {
        console.error("error processing image:", error);
        res.status(500).json({error: "faild :("});
    }
});


app.post('/upload-image', (req, res) => {
    const form = new formidable.IncomingForm({
        maxFieldsSize: 100 *1024*1024
    });
    //console.log(form);

    console.log("starting route");
    //console.log(req.headers);
   
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error parsing form' });
      }
      //console.log('Form Fields:', fields);
      console.log(fields);
      console.log(files);

  
      const imageFile = files.image;
      //console.log(imageFile);
  
      if (!imageFile) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      console.log("image file found");
  
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      console.log("check 4");

      console.log(imageFile[0].originalFilename);
  
      const fileExtension = path.extname(imageFile[0].originalFilename);
      const newFilename = `${Date.now()}${fileExtension}`;
      const filePath = path.join(uploadDir, newFilename);
  
      fs.copyFile(imageFile[0].filepath, filePath, (err) => {
        if (err) {
          console.error('Error copying file:', err);
          return res.status(500).json({ error: 'Error uploading file' });
        }
        console.log("file copied");
  
        res.json({ message: 'Image uploaded successfully', fileName: newFilename });
      });
    });
  });





/* app.post('/upload-image', upload.single('image'), (req, res) => {
    console.log(!req.body);
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }
    const { originalname, mimetype, size } = req.file;

    const tempPath = req.file.path;
    const fileExtension = path.extname(req.file.originalname);

    // Define the permanent file path
    const permanentFilePath = path.join(__dirname, 'permanent_uploads', `${Date.now()}${fileExtension}`);

    // Create the 'permanent_uploads' directory if it doesn't exist
    const permanentDir = path.join(__dirname, 'permanent_uploads');
    if (!fs.existsSync(permanentDir)) {
        fs.mkdirSync(permanentDir);
    }

    // Move the file to the permanent location
    fs.renameSync(tempPath, permanentFilePath);

    console.log(`File moved to: ${permanentFilePath}`);

    res.json({message: "image uploaded successfully"});

}); */
/* app.post('/upload-image', upload.single('image'), (req, res) => {
    //console.log(req.body );
    if (!req.file) {
        console.error("no file???: ", req.file, req.headers);
      return res.status(400).send('No image file provided');
    }
    console.log(typeof req.body);
  
    const { name, type } = req.file;
    const extension = path.extname(name);
    const newFileName = `${Date.now()}${extension}`;
    const newFilePath = path.join(__dirname, 'uploads', newFileName);
  
    fs.renameSync(req.file.path, newFilePath);
  
    res.json({ message: 'Image uploaded successfully', fileName: newFileName });
  });
   */

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });