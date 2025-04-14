const db = require('../config/db');

class TodoModel {
  static async getAll() {
    try {
        const [tasks] = await db.query('SELECT * FROM tasks');
        return tasks;  
    } catch (error) {
      throw new Error('Erreur lors de la récupération des tâches : ' + error.message);
    }
  }

  static async create(title, description) {
    try {
        const [result] = await db.query(
            'INSERT INTO tasks (title, description) VALUES (?, ?)',
            [title, description]
          );
          return { id: result.insertId, title, description };
    } catch (error) {
      throw new Error('Erreur lors de la création de la tâche : ' + error.message);
    }
  }

  static async update(id, title, description) {
    try {
        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
            [title, description, id]
          );
          return result.affectedRows;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la tâche : ' + error.message);
    }
  }

  static async delete(id) {
    try {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        throw new Error('Erreur lors de la suppression de la tâche : ' + error.message);
    }
  }
}

module.exports = TodoModel;