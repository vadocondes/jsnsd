'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res) => {
  
  const queryParam = req.query.un || '';
  const paramValue = Array.isArray(queryParam) ? queryParam[0] : queryParam;


  setTimeout(() => {
    res.send((paramValue).toUpperCase())
  }, 1000)
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})