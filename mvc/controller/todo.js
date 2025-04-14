const TodoModel = require('../model/todos');

class TodoController {
  static async getAllTodos(req, res) {
    try {
      const tasks = await TodoModel.getAll();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createTodo(req, res) {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Le titre est obligatoire' });
    }

    try {
      const newTask = await TodoModel.create(title, description);
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateTodo(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
      const affectedRows = await TodoModel.update(id, title, description);
      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Tâche introuvable' });
      }
      res.json({ id, title, description });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteTodo(req, res) {
    const { id } = req.params;

    try {
      const affectedRows = await TodoModel.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Tâche introuvable' });
      }
      res.json({ message: 'Tâche supprimée avec succès' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = TodoController;