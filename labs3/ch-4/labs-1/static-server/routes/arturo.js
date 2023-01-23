var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('/Users/arturomiguel/Cursos/JSNSD/labs3/ch-4/labs-1/static-server/public/arturo.html');
});

module.exports = router;
