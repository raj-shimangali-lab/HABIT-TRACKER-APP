// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let habits = []; // Temporary in-memory storage

// GET all habits
app.get('/habits', (req, res) => {
  res.json(habits);
});

// POST a new habit
app.post('/habits', (req, res) => {
  const habit = { id: Date.now(), name: req.body.name, doneToday: false };
  habits.push(habit);
  res.json(habit);
});
// PUT (update) a habit
app.put('/habits/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, doneToday } = req.body;
  
  const habit = habits.find(h => h.id === id);
  
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  habit.name = name || habit.name;
  habit.doneToday = doneToday !== undefined ? doneToday : habit.doneToday;
  
  res.json(habit);
});
//update by day
app.put('/habits/:id/progress', (req, res) => {
  const id = parseInt(req.params.id);
  const habit = habits.find(h => h.id === id);

  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  // Only allow progress up to 4
  if (habit.doneToday < 4) {
    habit.doneToday += 1;
  }

  res.json(habit); // Return the updated habit with the incremented progress
});

// DELETE a habit
app.delete('/habits/:id', (req, res) => {
  const id = parseInt(req.params.id);
  habits = habits.filter(h => h.id !== id);
  res.json({ message: 'Habit deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
