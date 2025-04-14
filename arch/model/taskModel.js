const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist'
});

const getAllTasks = async () => {
  const [tasks] = await db.query('SELECT * FROM tasks');
  return tasks;
};

const createTask = async (title, description) => {
  const [result] = await db.query(
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description]
  );
  return {
    id: result.insertId,
    title,
    description
  };
};

const updateTask = async (id, title, description) => {
  const [result] = await db.query(
    'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
    [title, description, id]
  );
  return result;
};

const deleteTask = async (id) => {
  const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};