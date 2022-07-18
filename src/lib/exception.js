'use-strict';

const { STATUS_CODE } = require('./constants');

const exception = (status, message) => {
  const error = {};
  error.status = status;
  error.message = message;
  return error;
};

const notFoundException = (message) =>
  exception(STATUS_CODE.NOT_FOUND, message);

const badRequestException = (message) =>
  exception(STATUS_CODE.BAD_REQUEST, message);

const unauthorizedException = (message) =>
  exception(STATUS_CODE.UNAUTHORIZED, message);

const forbiddenException = (message) =>
  exception(STATUS_CODE.FORBIDDEN, message);

const UnprocessableEntityException = (message) =>
  exception(STATUS_CODE.UNPROCESSABLE_ENTITY, message);

module.exports = {
  exception,
  notFoundException,
  badRequestException,
  unauthorizedException,
  forbiddenException,
  UnprocessableEntityException,
};
