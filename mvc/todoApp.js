const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());

// Register routes
app.use('/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});