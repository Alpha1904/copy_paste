const taskModel = require('../model/taskModel');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Le titre est obligatoire' });
  }

  try {
    const task = await taskModel.createTask(title, description);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const result = await taskModel.updateTask(id, title, description);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tâche introuvable' });
    }

    res.json({ id, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await taskModel.deleteTask(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tâche introuvable' });
    }

    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};