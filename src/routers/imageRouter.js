'use-strict';

const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imageController');
const { validateHandle } = require('../middleware/errorHandler');
const { singleUploadMiddleware } = require('../middleware/multerMiddleware');

/**
 * get images
 */
router.get('/images', validateHandle, imagesController.getImages);

/**
 * upoad new image
 */
router.post(
  '/image',
  validateHandle,
  singleUploadMiddleware,
  imagesController.uploadImage
);

module.exports = router;
