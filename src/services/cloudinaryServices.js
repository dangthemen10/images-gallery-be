'use-strict';

require('dotenv').config();
const cloudinary = require('cloudinary').v2;

//Setting cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUpload = async (file) => {
  return await cloudinary.uploader.upload(file, {
    upload_preset: process.env.UPLOAD_PRESET,
  });
};

//Get images from folder using cloudinary Search API
const getImagesFromCloudinary = async (next_cursor) => {
  return (resources = await cloudinary.search
    .expression(`folder:${process.env.UPLOAD_FOLDER}`)
    .max_results(2)
    .sort_by('uploaded_at', 'desc')
    .next_cursor(next_cursor)
    .execute());
};

module.exports = {
  cloudinaryUpload,
  getImagesFromCloudinary,
};
