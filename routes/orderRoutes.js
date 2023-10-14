import express from "express"
import { addComprehensiveOrder, addGuestOrder, getAllGuestOrder, updateApprovalGuestOrder } from "../controllers/orderControllers.js"
import multer from "multer";
import path from 'path'
import { iamMiddleware } from "../iamMiddleware.js";
const router = express.Router()


// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Math.random().toString(36).slice(2, 8) + path.extname(file.originalname));
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


router.post('/', upload.array('licenseOrMulkiaPhotos', 12), addGuestOrder)
router.post('/comprehensiveOrder', upload.array('comprehensivePhotos', 12), addComprehensiveOrder)
router.get('/', getAllGuestOrder)
router.patch('/', updateApprovalGuestOrder)



export default router