const multer = require('multer');
const path = require('path');
const express = require('express');
const app = express();

// storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(_dirname, '../../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter for image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

module.exports = upload;
