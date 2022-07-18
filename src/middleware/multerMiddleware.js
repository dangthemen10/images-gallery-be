'use-strict';

const multer = require('multer');
const { ALLOWED_FORMATS } = require('../lib/constants');
const { UnprocessableEntityException } = require('../lib/exception');
const logger = require('../lib/logger');

//Multer settings memory
// const storage = multer.memoryStorage();

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `/image-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Not supported file type'), false);
    }
  },
});

const singleUpload = upload.single('file');

const singleUploadMiddleware = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      logger.warn(
        `middleware:multerMiddleware:singleUploadMiddleware error ${error.stack}`
      );
      throw UnprocessableEntityException({
        status: 'UNPROCESSABLE_ENTITY',
        message: 'Image upload failed',
      });
    }
    next();
  });
};

module.exports = {
  singleUploadMiddleware,
};
