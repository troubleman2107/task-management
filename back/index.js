// Basic Express server setup for task management backend
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Task Management API is running');
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Get a single task by ID
app.get('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const task = await prisma.task.findUnique({ where: { id } });
  if (task) res.json(task);
  else res.status(404).json({ error: 'Task not found' });
});

// Create a new task
app.post('/tasks', async (req, res) => {
  const { title, status, priority, dueDate, isCompleted } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      isCompleted: typeof isCompleted === 'boolean' ? isCompleted : false,
    },
  });
  res.status(201).json(task);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, status, priority, dueDate, isCompleted } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        isCompleted,
      },
    });
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(404).json({ error: 'Task not found' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
