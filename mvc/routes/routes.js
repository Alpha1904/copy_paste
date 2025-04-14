const express = require('express');
const router = express.Router();
const TodoController = require('../controller/todo');

router.get('/todo', TodoController.getAllTodos);
router.post('/todo', TodoController.createTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;