'use-strict';

const imageServices = require('../services/imageServices');

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const getImages = async (req, res, next) => {
  try {
    const result = await imageServices.getImages(req.query.next_cursor);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const uploadImage = async (req, res, next) => {
  try {
    const uploadFile = req.body.file || req.file;
    const result = await imageServices.uploadImages(uploadFile);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getImages,
  uploadImage,
};
