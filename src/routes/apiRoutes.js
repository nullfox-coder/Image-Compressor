const express = require('express');
const multer = require('multer');
const { uploadCSV, checkStatus } = require('../controllers/imageController');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.post('/upload', upload.single('csv'), uploadCSV);
router.get('/status/:requestId', checkStatus);


module.exports = router;
