const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());



app.get('/todos', async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Le titre est obligatoire' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.status(201).json({ 
      id: result.insertId, 
      title, 
      description 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tâche introuvable' });
    }

    res.json({ id, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tâche introuvable' });
    }

    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

676388903