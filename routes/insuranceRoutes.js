import express from "express"
import path from 'path'
import { addInsurance, deleteSelectedInsurances, editInsurance, getAllInsurance } from "../controllers/insuranceController.js"
import multer from "multer";
const router = express.Router()


// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/insurance',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('image only!');
    }
}





router.post('/', upload.single('insuranceImage'), addInsurance)
router.post('/delete', deleteSelectedInsurances)
router.patch('/:id', upload.single("insuranceImage"), editInsurance)
router.get('/', getAllInsurance)


export default router