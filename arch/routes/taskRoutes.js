const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const validation = require('../validation/index');

router.get('/', taskController.getAllTasks);
router.post('/', validation, taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;