var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/check', function (req, res, next) {
  console.log(req.query.echostr)
  res.send(req.query.echostr)
});

router.get('/test', function (req, res, next) {
  res.render('test');
});

module.exports = router;