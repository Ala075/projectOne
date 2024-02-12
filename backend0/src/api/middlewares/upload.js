import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination folder where the image will be saved
        const destinationPath = path.join(__dirname, '../../../public/images');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the image
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Create the multer middleware with the storage engine
const uploader = multer({ storage: storage });

// Middleware function to handle the image upload
const uploadOne = (req, res, next) => {
    uploader.single('image')(req, res, (err) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            console.log(req.body)
            next();
        }
    });
};

// Middleware function to handle the images upload
const uploadArray = (req, res, next) => {
    uploader.array('images', 4)(req, res, (err) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            next();
        }
    });
};

export { uploadOne, uploadArray};

