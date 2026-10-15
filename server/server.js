const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (req,res)=>{
  const users = db.prepare('Select * from users').all();

  res.json(users);
})

app.post('/api/users', (req,res)=>{
  const {name, email} = req.body;

  if(!name || !email){
    return res.status(400).json({error: 'Name and email are required'});
  }

  try{
    const result = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(name, email);
    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(400).json({error: 'Email already exists'});
    }
    res.status(500).json({error: 'An error occurred while creating the user'});
  }

})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});