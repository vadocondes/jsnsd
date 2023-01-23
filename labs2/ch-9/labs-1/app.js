'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env


function paramToUpperCase(un) {
  if (Array.isArray(un)) {
    return un.map(element => element.toUpperCase())
  } else {
    return un?.toUpperCase();
  }
}

router.get('/', (req, res) => {
  const { un } = req.query;
 
  setTimeout(() => {
    res.send(paramToUpperCase(un))
  }, 1000)
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})