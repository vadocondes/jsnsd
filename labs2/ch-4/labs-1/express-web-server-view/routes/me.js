var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('me', { title: 'Página de Arturo' });
});

module.exports = router;
