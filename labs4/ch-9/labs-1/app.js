'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res) => {      


  if (!req.query.un) {
    var err = new Error('Bad Request')
    err.status = 400
   
    res.send(err)
  }

  setTimeout(() => {

  const { un } = req.query
  console.log(un)
  let input = '';
  if (Array.isArray(un)) {
    input = un[0]
  } else {
    input = un
  }
  console.log(input)
    res.send((input || '' ).toUpperCase())
  }, 1000)
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})