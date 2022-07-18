'use-strict';

const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];
const STATUS_CODE = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
};

module.exports = {
  ALLOWED_FORMATS,
  STATUS_CODE,
};
