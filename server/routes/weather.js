var express = require('express');
var router = express.Router();

var weather_controller = require('../controllers/weatherController');


/* GET list of all cities */
router.get('/city/:start', weather_controller.city_list);

module.exports = router;