var express = require('express');
const auth = require('./auth');

var router = express.Router();

var bookmark_controller = require('../controllers/bookmarkController');


/* GET bookmark list */
router.get('/:userId',auth, bookmark_controller.bookmark_list);

/* POST new bookmark */
router.post('/create',auth, bookmark_controller.bookmark_create);

/* DELETE bookmark */
router.post('/delete',auth, bookmark_controller.bookmark_delete);

/* EDIT bookmark */
router.post('/update',auth, bookmark_controller.bookmark_update);

module.exports = router;