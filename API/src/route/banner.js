import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = fileURLToPath(import.meta.url);
const fileLocation = path.resolve(__dirname, '../../../public/uploads/');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, fileLocation);
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images or PDF's only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf|PDF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

const uploads = multer({ storage: storage, fileFilter: imageFilter }).array('announcement_files');

// Uploads a image file to the server's /public/uploads directory
router.post('/', (req, res) => {

    // Set up file upload 
    uploads(req, res, (err) => {
        if (req.fileValidationError) {
            return res.status(415).json(req.fileValidationError);
        }
        else if (!req.files) {
            return res.status(400).json('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.status(400).json(err);
        }
        else if (err) {
            return res.status(500).json(err);
        }

        res.sendStatus(201);
    });    
});

// Return an array of image filenames that are in the server's public/uploads directory
// (Does not do a recursive search)
router.get('/', (req, res) => {
    let filenames = [];

    filenames = fs.readdirSync(fileLocation).reduce((files, file) => {
        return [...files, file];
    }, []);

    if (Array.isArray(filenames)) {
        res.json(filenames);
    } else {
        res.sendStatus(500);
    }
});


export default router;