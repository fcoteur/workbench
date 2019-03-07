var express = require('express');
var router = express.Router();
const withAuth = require('./middleware');

var user_controller = require('../controllers/userController');


/* GET user details */
router.get('/', user_controller.user_details);

/* POST authenticate new user */
router.post('/authenticate', user_controller.user_authenticate);

/* POST register new user */
router.post('/register', user_controller.user_register);

module.exports = router;
