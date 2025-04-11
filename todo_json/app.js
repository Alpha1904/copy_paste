const express = require('express');
const bodyParser = require('body-parser');
const fsp = require('fs/promises');
const path = require('path');

const app = express();
const port = 3003;
const dataPath = path.join(__dirname, 'data.json');

console.log('dataPath:', dataPath);
app.use(bodyParser.json());

const getTodos = async () => {
    try{
        const data = await fsp.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    }catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
};

const saveTodos = async (todos) => {
    try{
        await fsp.writeFile(dataPath, JSON.stringify(todos, null, 2));
    }catch (error) {
        console.error('Error writing file:', error);
    }  
};

const getNextId = (todos) => {
    if (!todos || todos.length === 0) {
        return 0; 
    }
    const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), -1);
    const nextId = maxId + 1;

    if (nextId > 7) {
        throw new Error(`Cannot assign new ID. Maximum limit of ${9} reached.`);
    }
    return nextId;
};

app.get('/todos', async (req, res) => {
    try{
        const todos = await getTodos();
        res.json(todos);
    }catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/todos', async (req, res) => {
try{
    const {title, description} = req.body;
    if (!title || !description) {
         return res.status(400).json({ error: 'Title and description are required' });
    }
    const todos = await getTodos();
    const task = {
        id: getNextId(todos),
        title,
        description: description || '',
        createAt: new Date().toISOString()
    }
    todos.push(task);
    await saveTodos(todos);
    res.status(201).json(task);
}catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const todos = await getTodos();
        const todoIndex = todos.findIndex(t => t.id === id);
        todoIndex === -1 && res.status(404).json({ error: 'Todo not found' });
        const updateTodo = {
            ...todos[todoIndex], title, description
        }
        todos[todoIndex] = updateTodo;
        await saveTodos(todos);
        res.json(updateTodo);
    }catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const todos = await getTodos();
        const todoIndex = todos.findIndex(t => t.id === id);
        todoIndex === -1 && res.status(404).json({ error: 'Todo not found' });
        todos.splice(todoIndex, 1);
        await saveTodos(todos);
        res.json({ message: 'Todo deleted successfully' });
    }catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
    
