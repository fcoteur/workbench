var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');


/* GET users list */
router.get('/', user_controller.user_list);

/* POST new user */
router.post('/create', user_controller.user_create);

module.exports = router;
