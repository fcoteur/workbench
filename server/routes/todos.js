var express = require('express');
var router = express.Router();


var todo_controller = require('../controllers/todoController');


/* GET todo list */
router.get('/:email', todo_controller.todo_list);

/* POST new todo */
router.post('/create', todo_controller.todo_create);

/* DELETE todo */
router.post('/delete', todo_controller.todo_delete);

/* EDIT todo */
router.post('/update', todo_controller.todo_update);

module.exports = router;