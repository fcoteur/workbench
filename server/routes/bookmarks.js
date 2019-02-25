var express = require('express');
var router = express.Router();

var bookmark_controller = require('../controllers/bookmarkController');


/* GET bookmark list */
router.get('/', bookmark_controller.bookmark_list);

/* POST new bookmark */
router.post('/create', bookmark_controller.bookmark_create);

/* DELETE bookmark */
router.post('/delete', bookmark_controller.bookmark_delete);

/* EDIT bookmark */
router.post('/update', bookmark_controller.bookmark_update);

module.exports = router;