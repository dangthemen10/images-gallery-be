'use-strict';

const express = require('express');
require('dotenv').config();
const router = require('./src/routers');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  notFoundError,
  internalServerError,
} = require('./src/middleware/errorHandler');
const logger = require('./src/lib/logger');

const app = express();

process.on('uncaughtException', (err, origin) => {
  logger.error(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/v1', router);

//error handle
app.use(notFoundError);
app.use(internalServerError);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info(`Server is running at the port : ${port}`);
});
