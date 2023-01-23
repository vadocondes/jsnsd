var express = require('express');
var router = express.Router();
var path = require('path')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var options = {
    root: path.dirname(__dirname)
};
  res.sendFile('public/arturo.html',  options);
});

module.exports = router;
