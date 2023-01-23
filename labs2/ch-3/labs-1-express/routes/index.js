'use strict'

const { Router } = require('express');
const router = Router();
const data = require('./../data')

router.get('/', async (req, res) => {
  const message = await data();
  res.send(message);
})

module.exports = router;