const mongoose = require('mongoose');
const Prompt = require('./models/Prompt');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const express = require('express');
const app = express();
const port = 3001; // Make sure this is different from your React app's port

app.use(express.json()); // This line allows express to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello from the OurMinds backend!');
});

app.get('/api/prompts', async (req, res) => {
  try {
    const prompts = await Prompt.find();
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/prompts', async (req, res) => {
  const prompt = new Prompt({
    text: req.body.text,
    category: req.body.category
  });

  try {
    const newPrompt = await prompt.save();
    res.status(201).json(newPrompt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single prompt by ID
app.get('/api/prompts/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json(prompt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a prompt
app.put('/api/prompts/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json(prompt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a prompt
app.delete('/api/prompts/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndDelete(req.params.id);
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json({ message: 'Prompt deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
