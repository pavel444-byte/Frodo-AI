const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        fs.mkdir(uploadPath, { recursive: true })
            .then(() => cb(null, uploadPath))
            .catch(err => {
                console.error('Error creating uploads directory:', err);
                cb(err); // Pass the error to multer
            });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    },
});

const upload = multer({ storage: storage });

async function processFileUpload(req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const filePath = path.join(__dirname, 'uploads', req.file.originalname);
        const fileContent = await fs.readFile(filePath, 'utf8');
        return { content: fileContent };
    } catch (error) {
        console.error('Error reading file:', error);
        throw new Error('Error reading the uploaded file.');
    }
}

module.exports = {
    upload,
    processFileUpload
};
