const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

// 1. REGISTER CLIENT OR ADMIN
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'admin' ? 'admin' : 'client';

    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, phone, role) 
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(name, email, hashedPassword, phone, userRole);

    res.status(201).json({ 
      message: 'User created successfully', 
      userId: result.lastInsertRowid 
    });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists or invalid data.' });
  }
});

// 2. LOGIN USER
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    }
  });
});

try {
    const app = require('./src/app');
    const PORT = process.env.PORT || 5000;
  
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup Error:", error);
  }