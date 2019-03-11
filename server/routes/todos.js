var express = require('express');
const auth = require('./auth');

var router = express.Router();


var todo_controller = require('../controllers/todoController');


/* GET todo list */
router.get('/:userId',auth, todo_controller.todo_list);

/* POST new todo */
router.post('/create',auth, todo_controller.todo_create);

/* DELETE todo */
router.post('/delete',auth, todo_controller.todo_delete);

/* EDIT todo */
router.post('/update',auth, todo_controller.todo_update);

module.exports = router;