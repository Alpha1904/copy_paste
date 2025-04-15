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

const createTask = async (title, description, dueDate, completed) => {

  const [result] = await db.query(
    'INSERT INTO tasks (title, description, dueDate, completed) VALUES (?, ?, ?, ?)',
    [title, description, dueDate, completed]
  );
  return {
    id: result.insertId,
    title,
    description,
    dueDate,
    completed: completed || false, 
  };
};

const updateTask = async (id, title, description, dueDate, completed) => {
  const [result] = await db.query(
    'UPDATE tasks SET title = ?, description = ?, dueDate = ?, completed = ? WHERE id = ?',
    [title, description, dueDate, completed, id]
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