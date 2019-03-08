var express = require('express');
var router = express.Router();
const auth = require('./auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Check token */
router.get('/checktoken', auth, function(req, res) {
  res.sendStatus(200);
});

module.exports = router;
