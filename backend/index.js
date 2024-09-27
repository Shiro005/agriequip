require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({
  origin: 'https://agriequip-green.vercel.app/'
}));
app.use(bodyParser.json());

// PostgreSQL pool connection using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  idleTimeoutMillis: process.env.IDLE_TIMEOUT_MILLIS,
  connectionTimeoutMillis: process.env.CONNECTION_TIMEOUT_MILLIS,
  statementTimeout: process.env.STATEMENT_TIMEOUT,
});

// Handle database connection errors
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  process.exit(-1);
});

// Helper function to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token is missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Signup route
app.post('/api/users/signup', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email is already registered
  const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const newUser = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name',
    [name, email, hashedPassword]
  );

  const token = jwt.sign({ id: newUser.rows[0].id, name: newUser.rows[0].name }, JWT_SECRET);
  res.json({ token, name: newUser.rows[0].name });
}));

// Signin route
app.post('/api/users/signin', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Fetch the user from the database
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email.trim().toLowerCase()]);
  if (user.rows.length === 0) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Compare the provided password with the hashed password in the database
  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.rows[0].id, name: user.rows[0].name }, JWT_SECRET);
  res.json({ token, name: user.rows[0].name });
}));

// Add a product route
app.post('/api/products', authenticateToken, asyncHandler(async (req, res) => {
  const { name, image_url, rate, location, contact_details, category } = req.body;
  const owner = req.user.name; // Authenticated user's name

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const newProduct = await pool.query(
    `INSERT INTO products (name, image_url, rate, location, contact_details, category, owner) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [name, image_url, rate, location, contact_details, category, owner]
  );

  res.json(newProduct.rows[0]);
}));

app.delete('/api/products/:id', authenticateToken, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const owner = req.user.name; // Authenticated user's name

  // Check if product exists and is owned by the authenticated user
  const product = await pool.query(
    'SELECT * FROM products WHERE id = $1 AND owner = $2',
    [id, owner]
  );

  if (product.rows.length === 0) {
    return res.status(404).json({ error: 'Product not found or you are not authorized to delete this product' });
  }

  // Delete the product
  await pool.query('DELETE FROM products WHERE id = $1', [id]);

  res.json({ message: 'Product successfully deleted' });
}));


// Get products by location and/or category
app.get('/api/products', asyncHandler(async (req, res) => {
  const { location, category } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (location) {
    query += ' AND location = $1';
    params.push(location);
  }

  if (category) {
    query += ' AND category = $2';
    params.push(category);
  }

  const products = await pool.query(query, params);
  res.json(products.rows);
}));

// Protected dashboard route
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome to the dashboard, ${req.user.name}!` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
