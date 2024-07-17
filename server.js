const express = require('express');
const app = express();
const port = 3001; // Make sure this is different from your React app's port

app.get('/', (req, res) => {
  res.send('Hello from the OurMinds backend!');
});

app.get('/api/prompts', (req, res) => {
  const prompts = [
    { id: 1, text: "How are you feeling today?" },
    { id: 2, text: "What's one thing you're grateful for?" },
    { id: 3, text: "Describe your ideal day." }
  ];
  res.json(prompts);
});

app.use(express.json()); // This line allows express to parse JSON bodies

app.post('/api/prompts', (req, res) => {
  const newPrompt = req.body;
  // In a real app, you'd save this to a database
  console.log('New prompt received:', newPrompt);
  res.status(201).json({ message: 'Prompt received', prompt: newPrompt });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});