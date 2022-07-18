'use-strict';

const express = require('express');
const router = express.Router();

// home
router.get('/', async (req, res) => {
  res.status(200).json('Phan Hai Dang');
});

// image
router.use(require('./imageRouter'));

module.exports = router;
