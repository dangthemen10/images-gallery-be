'use-strict';

const { check } = require('express-validator');

const validationUploadImage = () => {
  return [check('file').not().isEmpty().withMessage('File is invalid')];
};

module.exports = {
  validationUploadImage,
};
