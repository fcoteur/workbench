var express = require('express');
var router = express.Router();

var weather_controller = require('../controllers/weatherController');

/* GET list of all cities */
router.get('/city/:countryaplha', weather_controller.city_list);

router.get('/country/', weather_controller.country_list);

module.exports = router;