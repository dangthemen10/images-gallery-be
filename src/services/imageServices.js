'use-strict';

const {
  cloudinaryUpload,
  getImagesFromCloudinary,
} = require('./cloudinaryServices');
const { formatBuffer } = require('./dataUriService');
const {
  exception,
  badRequestException,
  UnprocessableEntityException,
} = require('../lib/exception');
const logger = require('../lib/logger');

/**
 * Get images list
 * @param {*} next_cursor
 * @returns
 */
const getImages = async (next_cursor) => {
  try {
    const results = {
      total: 0,
      images: [],
      next_cursor: null,
    };

    const response = await getImagesFromCloudinary(next_cursor || '');

    if (response || response.resources) {
      results.total = response.resources.length;
      response.resources.forEach((item) => {
        results.images.push({
          public_id: item.public_id,
          created_at: item.created_at,
          secure_url: item.secure_url,
        });
      });
    }

    //next_cursor use pagination
    if (response.next_cursor) {
      results.next_cursor = response.next_cursor;
    }

    return results;
  } catch (error) {
    logger.warn(`Service:imageServices:getImages error ${error.stack}`);
    throw exception({
      status: 'API_RESPONSE_ERROR',
      message: 'Get images from cloudinary error',
    });
  }
};

/**
 * Upload image
 * @param {*} uploadFile
 * @returns
 */
const uploadImages = async (uploadFile) => {
  if (!uploadFile) {
    throw badRequestException({
      status: 'BAD_REQUEST',
      message: 'File upload is not exist!',
    });
  }
  try {
    if (uploadFile.path) {
      const file64 = formatBuffer(uploadFile);
      uploadFile = file64.content;
    }

    const {
      asset_id,
      version,
      version_id,
      signature,
      secure_url,
      api_key,
      ...uploadResult
    } = await cloudinaryUpload(uploadFile);

    return {
      message: 'Successfully!',
      data: uploadResult,
    };
  } catch (error) {
    logger.warn(`Service:imageServices:uploadImages error ${error.stack}`);
    throw UnprocessableEntityException({
      status: 'UNPROCESSABLE_ENTITY',
      message: 'Uploads images to cloudinary failed!',
    });
  }
};

module.exports = {
  getImages,
  uploadImages,
};
