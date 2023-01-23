var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'La página de arturo'} );
  //res.render('index', { title: 'my other page', layout: 'melayout' });
});

module.exports = router;
