'use-strict';

const DataURIParser = require('datauri/parser');
const path = require('path');
const parser = new DataURIParser();

/**
 * Format file Buffer
 * @param {*} file
 * @returns
 */
const formatBuffer = (file) => {
  return parser.format(
    path.extname(file.originalname).toString().toLowerCase(),
    file.buffer
  );
};

module.exports = {
  formatBuffer,
};
