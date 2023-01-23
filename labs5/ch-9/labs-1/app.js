'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const  createError  = require('http-errors')
const { PORT = 3000 } = process.env

router.get('/', (req, res) => {

  let input  = req?.query?.un

  if (!input) {
    res.send(createError(400));
  } else {
  setTimeout(() => {
    if (Array.isArray(input)) {
      input = input.join('=')
    }
    res.send(input.toUpperCase())
  }, 1000)
}
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})