const { Router } = require('express');

const router = Router();

router.get('/', ( (req, response) => {
  response.send('hola máquinaaa');
}))

module.exports = router;